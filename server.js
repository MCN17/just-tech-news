// const express = require('express');
// const routes = require('./controllers/');
// const sequelize = require('./config/connection');
// const path = require("path");
// const exphbs = require("express-handlebars");
// const session = require('express-session');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const app = express();
// const PORT = process.env.PORT || 3001;

// const sess = {
//   secret: 'Super secret secret',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

// const hbs = exphbs.create({});



// app.engine("handlebars", hbs.engine);
// app.set("view engine", "handlebars");


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // The express.static() method is a built-in Express.js middleware function that can take all of the contents of a folder and serve them as static assets.
// //  This is useful for front-end specific files like images, style sheets, and JavaScript files.
// app.use(express.static(path.join(__dirname, "public")));

// // turn on routes
// app.use(routes);
// // app.use(require('./controllers/'));

// app.use(session(sess));

// // turn on connection to db and server
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
