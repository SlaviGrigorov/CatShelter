const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

let cats = require('./data/catsDatabase.json');
let breeds = require('./data/breeds.json');

const hbs = handlebars.create({});
hbs.handlebars.registerHelper('eq', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});


app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use('/styles', express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req,res) => {
    res.render('homePage', { cats });
});

app.get('/cats/add-cat', (req,res) => {
    res.render('addCat', { breeds });
});

app.post('/cats/add-cat', (req,res) => {
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

app.get('/cats/add-breed', (req,res) => {
    res.render('addBreed');
});

app.post('/cats/add-breed', (req, res) => {
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

app.get('/cats/edit/:id', (req, res) => {    
    let catId = req.params.id;
    let cat = cats[catId];
    res.render('editCat', { breeds, cat })
    console.log(cats[catId]);
});

app.post('/cats/edit/:id', (req, res) => {
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

app.get('/cats/delete/:id', (req, res) => {
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

app.listen(port, () => console.log(`Server is listening on ${port}...`));