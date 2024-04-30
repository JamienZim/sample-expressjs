const express = require('express');
const router = express.Router();
// import { get, create, update, remove } from '../controllers/programmingLanguages.controller';
const rnswController = require('../controllers/rnsw.controller');

/* GET programming languages. */
router.get('/acceptances/:meetcode', rnswController.getAcceptances);
  
/* POST programming language */
router.post('/acceptances', rnswController.loadAcceptances);

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* PUT programming language */
// router.put('/:id', update);

/* DELETE programming language */
// router.delete('/:id', remove);

module.exports = router;