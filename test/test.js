
/**
 * Module dependencies
 */

var instagram = require('../')
  , assert = require('assert')
  , qs = require('querystring')
  , isArray = Array.isArray


var clientid = '84b8379131024d66b371893f37fa4164'
  , clientsecret = '679d714cc9f14227a0660106432d8707'
  , token = '225592026.84b8379.8ff8dc7bc1d64a6089472fd34cfe32b9'
  , id = 225592026
  , fid = 13582298
  , mid = '483178086954225017_235142610'
  , lat = 40.741007499999995
  , lng = 73.9912112
  , data = {}

describe('instagram', function () {
	this.timeout(Infinity);

	assert(token);
	instagram
		.set('token', token)
		.set('client id', clientid)
		.set('client secrect', clientsecret)

	describe('User(opts)', function () {
		assert.ok(instagram.get('token'));
		var user = instagram.User({
			id: id
		});

		describe('.feed(opts, fn)', function () {
			it('should retrieve information from the authenticated users feed', function (done) {
					
					instagram.User.feed()
						.on('error', done)
						.on('end', function (data) {
							assert(data);
							assert(isArray(data));
							done();
						});

			});
		});


		describe('.likedMedia(opts, fn)', function () {
			it('should retrieve information from the authenticated users liked media', function (done) {
					
					instagram.User.likedMedia()
						.on('error', done)
						.on('end', function (data) {
							assert(data);
							assert(isArray(data));
							done();
						});

			});
		});


		describe('.search(opts, fn)', function () {
			it('should search for a user by name', function (done) {
					
					instagram.User.search('w3rle')
						.on('error', done)
						.on('end', function (data) {
							assert(data);
							assert(isArray(data));
							assert('w3rle' === data[0].username); // first match
							done();
						});

			});
		});


		describe('.requestedBy(opts, fn)', function () {
			it('should get the users who have requested this users permission to follow', function (done) {
					
					instagram.User.requestedBy()
						.on('error', done)
						.on('end', function (data) {
							assert(data);
							assert(isArray(data));
							done();
						});

			});
		});

		describe('.relationship(opts, fn)', function () {
			it('should get information about a relationship to another user', function (done) {
					
					instagram.User.relationship({id: fid})
						.on('error', done)
						.on('end', function (data) {
							assert(data);
							assert(undefined !== data.outgoing_status);
							assert(undefined !== data.target_user_is_private);
							assert(undefined !== data.incoming_status);
							done();
						});

			});
		});

		describe('.follow(opts, fn)', function () {
			it('should follow a given user', function (done) {
					
					instagram.User.follow({id: fid})
						.on('error', done)
						.on('end', function (data) {
							assert(data);
							assert('follows' === data.outgoing_status || 'requested' === data.outgoing_status);
							assert(undefined !== data.target_user_is_private);
							done();
						});

			});
		});


		describe('.unfollow(opts, fn)', function () {
			it('should unfollow a given user', function (done) {
					
					instagram.User.unfollow({id: fid})
						.on('error', done)
						.on('end', function (data) {
							assert(data);
							assert('none' === data.outgoing_status);
							assert(undefined !== data.target_user_is_private);
							done();
						});

			});
		});


		describe('.approve(opts, fn)', function () {
			it('should approve a given user', function (done) {
					
					instagram.User.approve({id: fid})
						.on('error', done)
						.on('end', function (data) {
							done();
						});

			});
		});

		describe('.deny(opts, fn)', function () {
			it('should deny a given user', function (done) {
					
					instagram.User.deny({id: fid})
						.on('error', done)
						.on('end', function (data) {
							done();
						});

			});
		});

		describe('.block(opts, fn)', function () {
			it('should block a given user', function (done) {
					
					instagram.User.block({id: fid})
						.on('error', done)
						.on('end', function (data) {
							assert(data);
							assert('blocked_by_you' === data.incoming_status);
							assert('none' === data.outgoing_status);
							done();
						});

			});
		});

		describe('.unblock(opts, fn)', function () {
			it('should unblock a given user', function (done) {
					
					instagram.User.unblock({id: fid})
						.on('error', done)
						.on('end', function (data) {
							assert(data);
							assert('none' === data.incoming_status);
							done();
						});

			});
		});


		describe('#info(fn)', function () {
			it('should retrieve user data from the api', function (done) {

				user.info()
					.on('error', done)
					.on('end', function (data) {
						assert(data);
						assert(data.username);
						assert(id === Number(data.id));
						done();
					});

			});
		});

		describe('#follows(fn)', function () {
			it('should get the list of users this user follows', function (done) {

				user.follows()
					.on('error', done)
					.on('end', function (data) {
						assert(data);
						assert(isArray(data));
						assert(data.length);
						done();
					});

			});
		});


		describe('#follwedBy(fn)', function () {
			it('should get the list of users this user is followed by', function (done) {

				user.follows()
					.on('error', done)
					.on('end', function (data) {
						assert(data);
						assert(isArray(data));
						assert(data.length);
						done();
					});

			});
		});


		describe('.media', function () {
			describe('#recent(opts, fn)', function () {
				it('should retrieve recent media', function (done) {
					
					user.media.recent()
						.on('error', done)
						.on('end', function (data) {
							assert(data);
							assert(isArray(data));
							assert(data.length);
							done();
						});

				});
			});
		});

	}); // end `User` test
	

	
	describe('Media(opts)', function () {
		assert.ok(instagram.get('token'));
		var media = instagram.Media({
			id: mid
		});

		describe('.search(opts, fn)', function () {
			it('should return media based on a query', function (done) {
				instagram.Media.search({lat: lat, lng: lng, distance: 500})
					.on('error', done)
					.on('end', function (data) {
						assert(data);
						assert(isArray(data));
						assert(data.length);
						done();
					});
			});	
		});


		describe('.popular(fn)', function () {
			it('should return popoular media', function (done) {
				instagram.Media.popular()
					.on('error', done)
					.on('end', function (data) {
						assert(data);
						assert(isArray(data));
						assert(data.length);
						done();
					});
			});	
		});


		describe('#info(fn)', function () {
			it('should retrieve data about the current media instance', function (done) {

				media.info()
					.on('error', done)
					.on('end', function (data) {
						assert(data);
						assert(media.id === data.id);
						done();
					});

			});
		});


		describe('#comments(fn)', function () {
			it('should retrieve comments on the current media instance', function (done) {

				media.comments()
					.on('error', done)
					.on('end', function (data) {
						assert(data);
						assert(isArray(data));
						done();
					});

			});
		});

		describe('#comment(fn)', function () {
			it('should comment on a media', function (done) {

				// TBD - need auth for comments on instagram
				
				done();

			});
		});
	}); // end `Media(opts)`
	
	describe('Tag(opts)', function () {
		assert.ok(instagram.get('token'));
		var tag = instagram.Tag({name: 'brooklyn'});

		describe('.search(opts, fn)', function () {
			it('should return tags based on a query', function (done) {
				instagram.Tag.search({q: 'nyc'})
					.on('error', done)
					.on('end', function (data) {
						assert(data);
						assert(isArray(data));
						assert(data.length);
						done();
					});
			});	
		});

		describe('#info(fn)', function () {
			it('should retrieve data the current tag instance', function (done) {

				tag.info()
					.on('error', done)
					.on('end', function (data) {
						assert(data);
						assert(tag.id === data.id);
						done();
					});

			});
		});

		describe('#recent(opts, fn)', function () {
				it('should retrieve recent media', function (done) {
					
					tag.recent()
						.on('error', done)
						.on('end', function (data) {
							assert(data);
							assert(isArray(data));
							assert(data.length);
							done();
						});

				});
			});

	}); // end `Tag(opts)`
	

	describe('Location(opts)', function () {
		assert.ok(instagram.get('token'));
		
		describe('.search(opts, fn)', function () {
			
			it('should return locations based on a query', function (done) {
				
				instagram.Location.search({lat: lat, lng: lng})
				.on('error', done)
				.on('end', function (data) {
					assert(data);
					assert(data.length);
					done();
				});

			});
		});
	});



});