const express = require('express');
const router = express.Router();

const addCatController = require('./controllers/addCat');
const addBreedController = require('./controllers/addBreed');
const editCatController = require('./controllers/editCat');

router.get('/', (req,res) => {
    let cats = require('./data/catsDatabase.json');
    console.log("Home page");
    res.render('homePage', { cats });
});

router.use('/cats/add-cat', addCatController);
router.use('/cats/add-breed', addBreedController);
router.use('/cats/edit/:id', editCatController);

module.exports = router;