// const defaultdb = require("../services/defaultdb.service");

// async function getFutureAcceptances(req, res) {
    
//     try {
//         // const data  = await defaultdb.getFutureAcceptances
//         // console.log(`data: ${data}`)
//         // res.json(data);
//         console.log('here1')
//         res.json(await defaultdb.getFutureAcceptances());
//     } catch (error) {
//         console.log('here2')
//         console.log({ errStatus: error.status, message: error.message });
//         res.status(500).json({ error: error.message });
//     }
// }

// module.exports = {
//     getFutureAcceptances
// }