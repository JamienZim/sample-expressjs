const express = require('express');
const router = express.Router();
// import { get, create, update, remove } from '../controllers/programmingLanguages.controller';
const rnswController = require('../controllers/rnsw.controller');

/* GET programming languages. */
router.get('/acceptances/:meetcode', rnswController.getAcceptances);
  
/* POST programming language */
router.post('/acceptances', rnswController.loadAcceptances);


/* GET programming languages. */
router.get('/tips/:meetcode', rnswController.getAcceptanceTips);
  
/* POST programming language */
router.post('/tips', rnswController.loadAcceptanceTips);
// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });
router.delete('/tips/:meetcode', rnswController.deleteAcceptanceTips);
/* PUT programming language */
// router.put('/:id', update);

/* DELETE programming language */
// router.delete('/:id', remove);

module.exports = router;