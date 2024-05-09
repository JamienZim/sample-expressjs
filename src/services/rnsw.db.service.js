const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config()
const dbconfig = require('../configs/rnsw.db.config');

const uri = process.env.RNSWMONGOURL;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function insertOne(collection, doc) {
    try {
        await client.connect();
        const database = client.db(dbconfig.db.RNSWDB);
        const col = database.collection(collection);
        const response = await col.insertOne(doc);
        console.log(response);
        return response;
    } finally {
        await client.close();
    }
}

async function findOneDoc(collection, query, options) {
    try {
        await client.connect();
        const database = client.db(dbconfig.db.RNSWDB);
        const col = database.collection(collection);
        const response = await col.findOne(query, options);
        console.log(response);
        return response;
    } finally {
        await client.close();
    }
}


async function queryFind(collection, query, projection = {}, options) {
    try {
        await client.connect();
        const database = client.db(dbconfig.db.RNSWDB);
        const col = database.collection(collection);
        console.log(`projection: ${JSON.stringify(projection)} `);
        const response = await col.find(query).project(projection).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);
            client.close();
        });
        console.log(response);
        return response;
    } finally {
        await client.close();
    }
}


async function loadAcceptances(acceptances) {
    try {
        const response = await insertOne('acceptances', acceptances);
        return response;
    } catch (error) {
        console.log(error);
    }
}

async function getAcceptance(meetcode) {
    try {
        const response = await findOneDoc('acceptances',
            { 'Meeting.@MeetCode': meetcode },
            {
                "projection": {
                    "Meeting.!": 0, "Meeting.@InputFilename": 0,
                    "Meeting.Races.Race.TrackRecords": 0,
                    "Meeting.Races.Race.RaceEntries.RaceEntry.Form.FormSummary": 0,
                    "Meeting.Races.Race.RaceEntries.RaceEntry.Form.ResultsSummaries": 0,
                    "Meeting.Races.Race.RaceEntries.RaceEntry.Form.LastStarts": 0,
                    "Meeting.Races.Race.RaceEntries.RaceEntry.HorseOwnership": 0,
                    "Meeting.Races.Race.RaceEntries.RaceEntry.Breeding": 0
                }
            });
        return response;
    } catch (error) {
        console.log(error);
    }
}


async function updateTips(collection, tips) {
    try {
        await client.connect();
        const database = client.db(dbconfig.db.RNSWDB);
        const col = database.collection(collection);
        const query = { 'meeting_code': tips['meeting_code'] };
        const options = { upsert: true };
        const update = { $set: tips };
        const response = await col.updateOne(query, update, options);
        console.log(response);
        return response;
    } finally {
        await client.close();
    }
}


async function loadAcceptanceTips(tips) {
    try {
        const response = await updateTips('acceptance_tips', tips);
        return response;
    } catch (error) {
        console.log(error);
    }
}

async function getAcceptanceTips(meetcode) {
    try {
        const response = await queryFind('acceptance_tips',
            { 'meeting_code': meetcode },
            {},
            {});
        return response;
    } catch (error) {
        console.log(error);
    }

}

async function deleteAcceptanceTips(meetcode) {
    try {
        await client.connect();
        const database = client.db(dbconfig.db.RNSWDB);
        const col = database.collection('acceptance_tips');
        const query = { 'meeting_code': meetcode };
        const response = await col.deleteOne(query);
        console.log(response);
        return response;
    } finally {
        await client.close();
    }
}


module.exports = {
    loadAcceptances,
    getAcceptance,
    loadAcceptanceTips,
    getAcceptanceTips,
    deleteAcceptanceTips
}