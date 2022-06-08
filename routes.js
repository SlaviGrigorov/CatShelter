const router = require('express').Router();

router.get('/', (req,res) => {
    let cats = require('./data/catsDatabase.json');
    console.log("Home page");
    res.render('homePage', { cats });
});

const addCatController = require('./controllers/addCat');
const addBreedController = require('./controllers/addBreed');
const editCatController = require('./controllers/editCat');
const deleteCatController = require('./controllers/deleteCat');

router.use('/cats/add-cat', addCatController);
router.use('/cats/add-breed', addBreedController);
router.use('/cats/edit', editCatController);
router.use('/cats/delete', deleteCatController);


module.exports = router;