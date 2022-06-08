const express = require('express');
const handlebars = require('express-handlebars');
const routes = require('./routes');
const app = express();
const port = 4000;

app.use('/styles', express.static('public'));
app.use(express.urlencoded({extended: false}));

const hbs = handlebars.create({});
hbs.handlebars.registerHelper('eq', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(routes);

app.listen(port, () => console.log(`Server is listening on ${port}...`));