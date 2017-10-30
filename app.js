const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Port
const port = 3000;

// Init app
const app = express();

//Mongo
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/todoapp';

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Bring in static public folder
app.use(express.static(path.join(__dirname, 'public')));

// View Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Connect to Mongodb
MongoClient.connect(url, (err, database) => {
    console.log('MongoDB connected');
    if (err) throw err;
    db = database;
    db.collection('todos').insertMany([
        // MongoDB adds the _id field with an ObjectId if _id is not present
        {
            test: "Task One",
            body: "Do someStruff"
        },
        {
            item: "Milk?",
            body: "GET THAT MILK!"
        }
    ]);
    Todos = db.collection('todos');

    //Moving the connection code so that we don't need to keep connecting throughout the project.
    app.listen(port, () => {
        console.log('Server Running on ' + port)
    });
});

//Routing  
app.get('/', (req, res, next) => {
    Todos.find({}).toArray((err, todos) => {
        if (err) {
            return console.log(err);
        }
        console.log(todos);
        res.render('index', {
            todos: todos
        });
    });
});