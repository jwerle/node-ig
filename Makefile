
all: clean install test
	@:
	
install: clean
	@npm install

clean:
	@rm -rf node_modules/

test:
	@mocha test/test.js -R spec

.PHONY: test