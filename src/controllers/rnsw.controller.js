const rnsw = require("../services/rnsw.db.service");
// const retrieveAcceptances = require("../utils/data/retrieveAcceptances");

async function loadAcceptances(req, res) {
    
    try {
        // console.log('here1')
        // console.log(req.body)
        // res.status(200).json(req.body);
        res.json(await rnsw.loadAcceptances(req.body));
    } catch (error) {
        console.log('here2')
        console.log({ errStatus: error.status, message: error.message });
        res.status(500).json({ error: error.message });
    }
}

async function getAcceptances(req, res) {
    console.log('got herer')
    const meetCode = req.params.meetcode;
    try {
        console.log(` meetCode: ${meetCode}`)
        // res.status(200).json({ message: 'success' });
        res.json(await rnsw.getAcceptance(meetCode));
    } catch (error) {
        console.log('here2')
        console.log({ errStatus: error.status, message: error.message });
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    loadAcceptances,
    getAcceptances
}