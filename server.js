//imports for routing, sequelize, helpers, and handlebars
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exp = require('constants');

//create new express instance & set port
const app = express();
const PORT = process.env.PORT || 3001;

//Use helpers for handlebars engine
const hbs = exphbs.create({ helpers });

//Create sessions & cookies
const sess = {
  secret: 'foundation',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Serve public folder as static
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

//Verify that server is running properly
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});