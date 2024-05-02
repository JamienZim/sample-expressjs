const { MongoClient } = require("mongodb");
require('dotenv').config()
const dbconfig = require('../configs/rnsw.db.config');

const uri = process.env.RNSWMONGOURL;
const client = new MongoClient(uri);

async function insertOne(collection, doc) {
    try{
        await client.connect();
        const database = client.db(dbconfig.db.RNSWDB);
        const col = database.collection(collection);
        const response = await col.insertOne(doc);
        console.log(response);
        return response;
    }finally{
        await client.close();
    }
}

async function queryFind(collection, query, projection={}, options) {
    try{
        await client.connect();
        const database = client.db(dbconfig.db.RNSWDB);
        const col = database.collection(collection);
        console.log(`projection: ${JSON.stringify(projection)} `);
        const response = await col.find(query).project(projection).toArray(function(err, result) {
            if (err) throw err;
            // console.log(result);
            db.close();
          });
        console.log(response);
        return response;
    }finally{
        await client.close();
    }
}


async function loadAcceptances(acceptances){
    try {
        const response = await insertOne('acceptances', acceptances);
        return response;
    } catch (error) {
        console.log(error);
    }
}

async function getAcceptance(meetcode){
    try {
        const response = await queryFind('acceptances', 
        {'Meeting.@MeetCode': meetcode}, 
{"Meeting.!": 0, "Meeting.@InputFilename": 0, 
"Meeting.Races.Race.TrackRecords" : 0, 
"Meeting.Races.Race.RaceEntries.RaceEntry.Form.FormSummary" : 0, 
"Meeting.Races.Race.RaceEntries.RaceEntry.Form.ResultsSummaries" : 0, 
"Meeting.Races.Race.RaceEntries.RaceEntry.Form.LastStarts" : 0,
"Meeting.Races.Race.RaceEntries.RaceEntry.HorseOwnership": 0,
"Meeting.Races.Race.RaceEntries.RaceEntry.Breeding": 0}, 
        {});
        return response;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    loadAcceptances,
    getAcceptance
}