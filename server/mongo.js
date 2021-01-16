const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
const client = new MongoClient(uri);

async function mongoConnect(){

    try {
        await client.connect();
        await listDatabases(client);
        // Exports client to other files to be used.
        exports.client = client;
    }
    catch (e) {
        console.error(e);
    }
}

async function listDatabases(client){

    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");

    databasesList.databases.forEach(db => console.log(` - ${db.name}`));

};

exports.setCollection = function (database, collection) {
    console.log("Setting to " + database + " & " + collection)
    if(typeof(database) === "string" && typeof(collection) === "string")
        return client.db(database).collection(collection);
}

mongoConnect();