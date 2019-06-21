# Mapbox Operations & GeoJSON Processing in Node
Mapbox Upload API , GeoJSON & MBTiles Files Processing

1. To Upload a File to Mapbox Tileset, Select the file and upload
   to mapbox using upload.js script.
   
2. If Uploading a GeoJSON, make sure you are keep the unique **_feature id's sync with db_**.
    **It should be sent with levels API response**.
     For example : Let Suppose you have  GeoJSON for a state say Rajasthan
    feature id must be a non negative integer value. If GeoJSON misses feature id then
    it will create issues in handling events while using the layer on map.
    Please read **[https://github.com/mapbox/mapbox-gl-js/issues/7758]** which states that feature id must be a non negative integer.
    If not,then it will generate this issue.
    

    {
      type: 'FeatureCollection',
      features: [
            {
                type: 'Feature'
                id: 1,
                properties: { stateName: 'Rajasthan', country: 'India' },
                geometry: {type: 'Polygon' : coordinates: []}
            }
      ]
    }
    
    
    
   Then in Levels API Response you should send feature id i.e 1 with Rajasthan's data.

3. If the GeoJSON file is too large to upload, kindly use Mapbox's library **_TippeCanoe_** to convert large GeoJSON to MBTiles file which can be uploaded to Mapbox TileSet.
   Kindly Check *https://docs.mapbox.com/help/troubleshooting/uploads/* to check Upload limits and issues. 
   Check *https://github.com/mapbox/tippecanoe* for *TippeCanoe Library*.

4. It will be good if you can pre calculate bounding box of each shape. So it will be easier at the frontend to fitBounds on map
   For this, *@turf/bbox* npm library can be used and saved in the db for each shape.
   
5. To Update data in any tileset, use the same script to update the data. Just use the same tileset name and it will
   replace the old data with the new one.
   
6. For more information on Mapbox Upload API, please visit *https://docs.mapbox.com/api/*.

7. To convert a ShapeFile to GeoJSON, use shptogeojson script in this code.

8. To process a large GeoJSON File use largeGeoJSONScript file in the code.

9. Please correct it at your end if some bugs are there in any script.

THANK YOU   
   
   
   
   
   

