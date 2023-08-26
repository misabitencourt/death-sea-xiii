(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("cannon-ball",
{ "compressionlevel":-1,
 "height":16,
 "infinite":false,
 "layers":[
        {
         "data":[1, 2684354563, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2684354563, 2684354563, 1, 2684354563, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2684354563, 1, 1, 2684354563, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2684354563, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2684354563, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2684354563, 1, 2684354563, 1, 2684354563, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 2684354563, 1, 2684354563, 1, 2684354563, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2684354563, 2684354563],
         "height":16,
         "id":1,
         "name":"Camada de Tiles 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":16,
         "x":0,
         "y":0
        }],
 "nextlayerid":2,
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.8.2",
 "tileheight":1,
 "tilesets":[
        {
         "firstgid":1,
         "source":"..\/..\/..\/Documentos\/Monochrome.tsx"
        }],
 "tilewidth":1,
 "type":"map",
 "version":"1.8",
 "width":16
});