const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/edit/:id', moviesController.edit);
router.get('/', moviesController.list);
router.get('/new', moviesController.new);
router.get('/recommended', moviesController.recomended);
router.get('/detail/:id', moviesController.detail);
router.get('/add', moviesController.add);
router.post('/create', moviesController.create);
//router.put('/update/:id', moviesController.update)



module.exports = router;