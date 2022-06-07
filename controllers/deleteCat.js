const router = require('express').Router();
const fs = require('fs');

let cats = require('../data/catsDatabase.json');

router.get('/cats/delete/:id', (req, res) => {
    const catId = req.params.id;
    cats = cats.filter(cat => cat.id != catId);

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