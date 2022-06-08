const router = require('express').Router();



router.get('', (req, res) => {
    let cats = require('../data/catsDatabase.json');
    const catNameFromSearchEngine = req.query.name.toLowerCase();

    console.log(`Before: ${cats}`);

    cats = cats.filter(cat => cat.name.toLowerCase().includes(catNameFromSearchEngine));
    console.log(cats);
    res.render('homePage', { cats });

});

module.exports = router;