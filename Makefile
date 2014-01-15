prepare:
	@ echo "\n> Install Bower"
	@ sudo npm install -g bower
	@ echo "> Install Gulp"
	@ sudo npm install -g gulp
	@ echo "> You can use make install now"

install:
	@ echo "\n> Install bower dependencies"
	@ bower install --quiet
	@ echo "> Install npm dependencies"
	@ npm install --quiet
	@ mkdir build
	@ cp -r app/components/ build/
	@ echo "> You can."
