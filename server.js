var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });

// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// Routes
// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

app.get("/", function (req, res) {
    res.render("index");
})

app.get("/saved", function (req, res) {
    res.render("saved");
})




// console.log("\n******************************************\n" +
//     "Grabbing every article headline, preview and link\n" +
//     "from the NYTimes website:" +
//     "\n******************************************\n");
app.get("/scrape", function (req, res) {

    axios.get("https://www.nytimes.com").then(function (response) {

        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(response.data);

        // An empty array to save the data that we'll scrape
        var result = {};

        // Select each element in the HTML body from which you want information.
        // NOTE: Cheerio selectors function similarly to jQuery's selectors,
        // but be sure to visit the package's npm page to see how it works
        $("article").each(function (i, element) {
            result.title = $(this).children().text();
            result.link = $(this).find("a").attr("href");
            result.preview = $(this).find("p").text();

            // var title = $(element).children().text();
            // var link = $(element).find("a").attr("href");
            // var preview = $(element).find("p").text();

            // Save these results in an object that we'll push into the results array we defined earlier
            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });

        // Log the results once you've looped through each of the elements found with cheerio
        res.send("Scrape Complete");
        // console.log(results);
    });
})

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

// axios.get("https://www.nytimes.com").then(function (response) {

//     // Load the HTML into cheerio and save it to a variable
//     // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
//     var $ = cheerio.load(response.data);

//     // An empty array to save the data that we'll scrape
//     var results = [];

//     // Select each element in the HTML body from which you want information.
//     // NOTE: Cheerio selectors function similarly to jQuery's selectors,
//     // but be sure to visit the package's npm page to see how it works
//     $("article").each(function (i, element) {

//         var title = $(element).children().text();
//         var link = $(element).find("a").attr("href");
//         var preview = $(element).find("p").text();
//         // console.log($(element).find("p"));
//         // Save these results in an object that we'll push into the results array we defined earlier
//         results.push({
//             title: title,
//             link: link,
//             preview: preview
//         });
//     });

//     // Log the results once you've looped through each of the elements found with cheerio

//     console.log(results);
// });

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});