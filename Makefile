install:
	@ echo "\n> Install bower dependencies"
	@ bower install --quiet
	@ echo "> Install npm dependencies"
	@ npm install --quiet
	mkdir build
	@ echo "> You can."
