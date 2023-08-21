rm -R dist
mkdir dist
mkdir dist/js
npx uglifyjs --compress --mangle --mangle-props -- app/js/game.js > dist/js/game.js
npx uglifyjs --compress --mangle --mangle-props -- app/js/sound-player.js > dist/js/sound-player.js
cp app/index.html dist/
zip -r game.zip dist 
