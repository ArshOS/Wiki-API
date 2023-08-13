const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// Database connection
mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true});

// Schema
const articleSchema = {
    title: String,
    content: String
};

// Model
const Article = mongoose.model("Article", articleSchema);

// const a1 = new Article( {
//     title: "REST",
//     content: "REST is short for REpresentational State Transfer. IIt's an architectural style for designing APIs."
// });

// const a2 = new Article( {
//     title: "API",
//     content: "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."
// });

// const a3 = new Article( {
//     title: "Bootstrap",
//     content: "This is a framework developed by Twitter that contains pre-made front-end templates for web design."
// });

// const a4 = new Article( {
//     title: "DOM",
//     content: "The Document Object Model is like an API for interacting with our HTML."
// });

// const a5 = new Article( {
//     title: "Jack Bauer",
//     content: "Jack Bauer once stepped into quicksand. The quicksand couldn't escape and nearly drowned."
// });

// const list = [a1, a2, a3, a4, a5];

// Article.insertMany(list, function(err, docs) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(docs);
//     }
// });


app.get("/articles", function(req, res) {
    Article.find({}, function(err, foundArticles) {
        if(err) {
            res.send(err);
        } else {
            res.send(foundArticles);
        }
    });
    
});

app.post("/articles", function(req, res) {

    const newArticle = new Article ( {
        title: req.body.title,
        content: req.body.content
    });

    newArticle.save(function(err) {
        if(!err) {
            res.send("Successfully added a new article.");
        } else {
            res.send(err);
        }
    });
});

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))