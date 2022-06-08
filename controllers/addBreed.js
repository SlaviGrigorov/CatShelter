const router = require('express').Router();
const fs = require('fs');

let breeds = require('../data/breeds.json');

router.get('/', (req,res) => {
    res.render('addBreed');
});

router.post('/', (req, res) => {
    let newBreed = req.body.name;

    if (newBreed.length > 0 && !breeds.includes(newBreed)) {
        breeds.push(newBreed);
        breeds = JSON.stringify(breeds);
        try{
            fs.writeFile('./data/breeds.json', breeds, (err) => err? console.log(err) : console.log("successful"));
        } catch(err) {
            console.log(err);
        }
        res.redirect('/');
    } else {
        return res.status(400).send('Breed already registered or empty field sent');
    }
});


module.exports = router;