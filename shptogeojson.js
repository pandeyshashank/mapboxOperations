/*
 Author: Shashank Pandey
 github: https://github.com/pandeyshashank
 */


/**
 * Script to Convert Shape File to GeoJSON.
 *
 * */


var shapefile = require("shapefile");
var fs = require('fs');
const json = require('big-json');


var arr=['Wheat','Maize','Paddy'];

shapefile.read("Ganganagar_Shapefile/Ganganagar_shapefile_clip2.shp", "Ganganagar_Shapefile/Ganganagar_shapefile_clip2.dbf")
    .then(function(source){
        console.log("SOurce", source.features.length);
        // source.read();
        let geojson = {
            type: 'FeatureCollection',
            features: []
        };
        for(let i= 0; i< source.features.length;i++) {
            //Do required processing with the features before writing in GeoJSON.
            let farmid = source.features[i].properties.farmid;
            source.features[i].properties = {};
            source.features[i].properties.crop=arr[Math.floor(Math.random() * arr.length)];
            source.features[i].properties.farmid=farmid;
            source.features[i].id=i+1;
            geojson.features.push(source.features[i]);
            // console.log("Featue ID ",i+1);
        }
        // console.log("SOurce>>>>>>> ");
        // fs.writeFileSync('ganganagarsegments.geojson',JSON.stringify(geojson));
        // let string = JSON.stringify(geojson);

        const stringifyStream = json.createStringifyStream({
            body: geojson
        });

        stringifyStream.on('data', function(strChunk) {
            // => BIG_POJO will be sent out in JSON chunks as the object is traversed
            console.log("Stringyfy Stream");
            fs.appendFileSync('ganganagarsegments.geojson', strChunk, 'utf8');
        });

        // console.log("String ",string.substring(0,10));
        // const file = fs.createWriteStream("ganganagarsegments.geojson");
        // let subString = string.substring(0,1000);
        // console.log("Substring ",subString)
        // for(var i = 0; i < 100000; i++){
        // file.write(string[i]);//ten a's
        // fs.appendFileSync('ganganagarsegments.geojson', subString, 'utf8');
        // }
    })
    .catch(function(error){ console.error(error.stack)});