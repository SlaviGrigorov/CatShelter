const router = require('express').Router();
const fs = require('fs');

let cats = require('../data/catsDatabase.json');
let breeds = require('../data/breeds.json');

router.get('/cats/edit/:id', (req, res) => {    
    let catId = req.params.id;
    let cat = cats[catId];
    res.render('editCat', { breeds, cat })
    console.log(cats[catId]);
});

router.post('/cats/edit/:id', (req, res) => {
    let updatedCat = req.body;
    updatedCat.id = req.params.id;
    cats.splice(updatedCat.id, 1, updatedCat)

    let jsonData = JSON.stringify(cats, "", 4);

    try {
        fs.writeFile('./data/catsDatabase.json', jsonData, (err) => err? console.log(err): true);
    } catch(err){
        console.log(err);
    }
    res.redirect('/');
    // console.log(cats);
});

module.exports = router; 