const express = require('express');
const morgan = require('morgan');


// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.pebxw.mongodb.net/<dbname>?retryWrites=true&w=majority';

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

// middleware & static files
app.use(express.static('public'))

app.use(morgan('dev'));


app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index', { title: 'Home', blogs });
});



app.get('/about', (req, res) => {
    // res.send('<p>about page</p>');
    res.render('about', { title: 'about'});
});

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about', { title: 'about'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blolg'});
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});