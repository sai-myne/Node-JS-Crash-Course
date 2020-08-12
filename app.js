const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.pebxw.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => app.listen(3000))
    .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');



// middleware & static files
app.use(express.static('public'))

app.use(morgan('dev'));


// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/single-blog', (req, res) => {
    Blog.findById('5f337b1813ebf43030d15bee')
        .then(result => res.send(result))
        .catch(err => console.log(err));
});



app.get('/about', (req, res) => {
    // res.send('<p>about page</p>');
    res.render('about', { title: 'about'});
});

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about', { title: 'about'});
});

// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch(err => console.log(err))
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blolg'});
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});