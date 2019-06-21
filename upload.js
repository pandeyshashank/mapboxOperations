/*
 Author: Shashank Pandey
 github: https://github.com/pandeyshashank
 */

var MapboxClient = require('mapbox');

var userName = "Put_Mapbox_UserName_Here";
// This is a private, secret access token - this one has been deleted, but gives you an idea to how it looks
var accessToken = "Put_Secret_Access_Token_Here";
const fs = require('fs');

var client = new MapboxClient(accessToken);
/**
 * Add File Name with Path Here
 * File Supported :  MBTiles, KML, GPX, GeoJSON, Shapefile (zipped), or CSV file here.
 * */

var fileName = './test.geojson';

var tilesetName = 'testtile';

/**
  TileSet Name to be given here.
 To be used in Code while adding layer on frontend.
 Kindly follow a proper convention to give the tileset name
 */

// The first step is to connect to MapBox to provision some temporary access credentials to Amazon's S3
client.createUploadCredentials(function(err, credentials) {
    // console.log("Credentials ",credentials);

    // Use aws-sdk to stage the file on Amazon S3
    var AWS = require('aws-sdk');
    var s3 = new AWS.S3({
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        sessionToken: credentials.sessionToken,
        region: 'us-east-1'
    });

    function uploadComplete(err, upload) {
        if(err) {
            console.log("An error occured creating upload: " + err);
        }

        console.log(upload);
    }

    function putComplete(err, resp) {
        if(err) {
            return console.log("Error uploading file");
        }

        console.log("Instructing MapBox to create TilSet...");

        // Create Vector TileSet
        client.createUpload({
            tileset: [userName, tilesetName].join('.'),
            url: credentials.url
        }, uploadComplete);
    }

    // Upload data to S3
    s3.putObject({
        Bucket: credentials.bucket,
        Key: credentials.key,
        Body: fs.createReadStream(fileName)
    }, putComplete);
});