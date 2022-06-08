const router = require('express').Router();

router.get('', (req, res) => {
    let cats = require('../data/catsDatabase.json');
    const catNameFromSearchEngine = req.query.name.toLowerCase();

    cats = cats.filter(cat => cat.name.toLowerCase().includes(catNameFromSearchEngine));
    res.render('homePage', { cats });
});

module.exports = router;