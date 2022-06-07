const router = require('express').Router();
const fs = require('fs');

let cats = require('../data/catsDatabase.json');
let breeds = require('../data/breeds.json');


router.get('/cats/add-cat', (req,res) => {
    res.render('addCat', { breeds });
});

router.post('/cats/add-cat', (req,res) => {
    let newCat = req.body;
    if (newCat.name.length < 2 || newCat.description.length <3 || newCat.imgURL.length < 2){
        return res.status(400).send('Please fill all fields');
    } else {
        newCat.id = cats[cats.length - 1].id + 1;
        cats.push(newCat);
        console.log(newCat);
        let jsonData = JSON.stringify(cats, "", 4);

        try {
            fs.writeFile('./data/catsDatabase.json', jsonData, (err) => err? console.log(err): true);
        } catch(err){
            console.log(err);
        }
    }
    res.redirect('/');
});

module.exports = router; 