const PORT = 3000;

// Installed module imports
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Local database imports
const db = require('./util/database');
const sequelize = require('./util/database');

// importing routes
const indexRoute = require('./routes/indexRouter');
const loginRoute = require('./routes/sign-in-up/loginRoute');
const registerRoute = require('./routes/sign-in-up/registerRouter');
const projectRoute = require('./routes/projectRoute');

// initializing database models
const User = require('./model/userModel');
const Project = require('./model/projectModel');

// Setting view engine and static (public) folder
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname + '/public')));

// Using Body Parser to handle incoming requests
app.use(bodyParser.urlencoded({extended: false}));


// Establishing session
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
const store = new SequelizeStore({
    db: db
});

app.use(session({
    secret: "thisismysecrctekey",
    store: store,
    saveUninitialized: false,
    cookie: {maxAge: oneDay},
    resave: false
}));

// Sequelize Associations
Project.belongsTo(User, {constraints: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'});
User.hasMany(Project);


// using Routes
app.use(indexRoute);
app.use(loginRoute);
app.use(registerRoute);
app.use('/projects-menu',projectRoute);


const initApp = async () => {
    console.log("Testing the database connection..");
    /**
     * Test the connection.
     * You can use the .authenticate() function to test if the connection works.
     */
    try {
        await db.authenticate();
        // console.log("Connection has been established successfully.");

        // syncing models created
        /**
         * Start the web server on the specified port.
         */
        app.listen(PORT, () => {
            console.log(`Server is up and running at: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error.original);
    }
};
initApp().then(r => sequelize.sync());