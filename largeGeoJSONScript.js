/*
 Author: Shashank Pandey
 github: https://github.com/pandeyshashank
 */

/**
 * Script to Process a Large GeoJSON
 *
 * */

const fs=require('fs');
const JSONStream = require('JSONStream');
const es = require('event-stream');

let geojson={
    "type": "FeatureCollection",
    "features":[]
};
var arr=['Wheat','Maize','Paddy'];
let count=1;
var getStream = function () {
    var jsonData = 'gnagar_segments.geojson',
        stream = fs.createReadStream(jsonData, {encoding: 'utf8'}),
        parser = JSONStream.parse('features.*');
    return stream.pipe(parser);
};
getStream()
    .pipe(es.mapSync(function (data) {
        // data.properties={}
        //Process according to your requirement.
        // Process like adding id, creating bbox or any addition or removal in feature properties
        let obj = {
            type: 'Feature',
            id: count,
            properties: {
                farmid:data.properties.farmid,
                farm_centr:data.properties.farm_centr,
                farm_area:data.properties.farm_area,
                crop: arr[Math.floor(Math.random() * arr.length)]
            },
            geometry:data.geometry
        };
        count = count +1;
        geojson.features.push(obj)
        // console.log("Count ",count);
        fs.writeFileSync('gnagarsegments2.geojson',JSON.stringify(geojson))

    }));

//console.log(geojson);