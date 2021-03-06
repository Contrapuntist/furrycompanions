// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var exphbs = require("express-handlebars"); 
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var handlebars = require("handlebars");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Static directory
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// app.get('/', function (req, res) {
//   res.render('index');
// });

// Routes
// =============================================================
// require("./routes/api-routes.js")(app);
// require("./routes/html-routes.js")(app);
var htmlRoutes = require('./routes/userController.js');

app.use('/', htmlRoutes);

// *******************************************************
//      Sequelize code to start server
//      -- Uncommenting 'db' variable above required
// *******************************************************

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  }); 
});

// ********************************************
//      For testing server without sequelize 
//      -- Comment out when sequelize required 
// ********************************************

// app.listen(PORT, function() { 
//     console.log('app listening on port ' + PORT); 
// });


