# Shopping Lists API

The Shopping Lists API is a NodeJs web application to manage shopping lists.  

It provides an admin ui, where you can
- register an account
- login to your account
- create new lists
- delete lists
- access the API documentation

It also provides an API where you can:  
- add items to a list
- remove items from a list
- mark items as *bought*
- edit items

All data (users, shopping lists, shopping list items) is stored in a MongoDB.

### About this project

```css
│   README.md      /* You are here */
│   package.json   /* Package info, main scripts, dependencies to install */
│   app.js    <--- /* Main file. Start here. */
│   .env           /* Setup DB Connection Credentials here (excluded by .gitignore) */
│   .gitignore     /* Exclude files (private, npm packages) from git */
│
└───routes
│   │   api.js    /* API Routes (/api/v1/lists, ...) mapped to controller functions */
│   │   ui.js     /* UI Routes for the admin ui (/login, ...) render pug views */
│
└───views
│   │   layout.pug   /* Pug layout template used by other pug templates */
│   │   home.pug     /* Pug template for main screen */
│   │   login.pug
│   │   register.pug
│
└───public           /* Serve static files (css, images) from public foler, to use in pug templates */
│   │   styles.css
│   │   ...
│
└───controllers     
│   │   lists.js     /* C(reate)R(ead)U(pdate)D(elete) functions for lists */
│   │   items.js     /* CRUD functions for list items */
│
└───models
│   │   shopping.js  /* Declare the models for shopping lists & items */
│   │   users.js     /* Declare the models for users incl. password hashing */

```

### Configure the MongoDB Database Connection

[MongoDB](https://www.mongodb.com/) is a document database. You can get a free plan for MongoDB sandbox instances (512MB) at [https://mlab.com/](https://mlab.com/).   
The database connection is configured via environment variables.    
Create a `.env` file in the top level directory and set:  
```
MONGO_DB_USER=<user>
MONGO_DB_PASSWORD=<pw>
MONGO_DB_CONNECTIONSTRING=<connectionstring>
```
Make sure the file is excluded from git (see `.gitignore`). And not stored/pushed to the remote repository!

### Development

+ **1** First install the dependencies using npm (make sure you installed [NodeJs](https://nodejs.org/en/))
    ```
    npm install
    ```
+ **2** Choose:
  - **2a** Start a server with file watch hat restarts when changing files using nodemon:
    ```
    npm install -g nodemon
    nodemon app.js
    ```

  - **2b** Just start the server without watching files:
    ```
    npm run start
    ```
+ **3** Open Browser [http://localhost:8081](http://localhost:8081)

### Deploy to Heroku / zeit.co

You can get free plan hosting for your node server at [heroku.com](https://www.heroku.com/) or [zeit.co](https://zeit.co).
Make sure you configure the environment variable for the MongoDB Connection and the Port for production (80).


#### Packages used:

##### [express](https://github.com/expressjs/express/)

Express is a minimal and flexible NodeJs web application framework that provides a robust set of features to develop web applications. Some of the core features of Express framework:

- Set up middlewares to respond to HTTP Requests
  - E.g. serve static files from file system
- Define routes to map actions to HTTP Method and URL
- Dynamically render HTML Pages based on passing arguments to templates

```js
const express = require('express');

const app = express();

app.get('/', function (request, response) {
   // handle request and build response
});

// more advanced
let middleware = function(req, res, next) { next(); }
app.get('/users/:id', middleware, function (req, res, next) {
   // get parameter from url and send it as response
   res.send(req.params.id);
});

app.listen(80);
```

Example: Static files middleware
```js
/**
 * Serve files from within a given root directory.
 * The file to serve will be determined by combining req.url with the provided root directory.
 * When a file is not found, instead of sending a 404 response,
 * this module will instead call next() to move on to the next middleware,
 * allowing for stacking and fall-backs.
 */
app.use('/public', express.static('public'));
```

Example: Render html with dynamic templates ([pug](https://github.com/pugjs/pug))
```js
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/home', (req, res) => {
    const lists = [
      { name: "List 1", _id: 1 },
      { name: "List 2", _id: 2 }
    ];
    return res.render('home', { lists: lists});
});
```
`/views/home.pug`
```pug
...
ul#lists
  each list in lists
    li 
      span.name #{list.name}
      span ID: #{list._id}
...
```
`outputs`
```html
<ul id="lists">
  <li>
    <span class="name">List 1</span>
    <span>ID: 1</span>
  </li>
  <li>
    <span class="name">List 2</span>
    <span>ID: 2</span>
  </li>
</ul>
```

##### [body-parser](https://github.com/expressjs/body-parser)

Body-parser is a NodeJs middleware for handling JSON, Raw, Text and URL encoded form data. It parses incoming request bodies in a middleware before the handlers and makes it available under the req.body property.

##### [express-session](https://github.com/expressjs/session)

Session middlware for Express.  
Stores session data on backend site and manages a cookie (only id) for it.
```js
app.use(session({ secret: '48afd9ff279cbc1f30e6b56' }));

app.post('/login', (req, res) => {
  let session = req.session;
  session.user = {
      id: "",
      username: ""
  };
  session.isAuthenticated = true;
  return res.redirect(301, "/");
});

app.get('/logout', (req, res) => {
    let session = req.session;
    session.user = undefined;
    session.isAuthenticated = false;
    return res.redirect(301, "/");
});

function userMustBeAuthenticated(req, res, next) {
    if (!req.session.isAuthenticated) return res.redirect(301, "/login");
    next();
}

app.get('/secret', userMustBeAuthenticated, (req, res) => {
    // User is authenticated
});

```

##### [mongoose](https://github.com/Automattic/mongoose/)
Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

// Define the model
const Cat = mongoose.model('Cat', { name: String, age: number });

// Create and save new cat
const kitty = new Cat({ name: 'Zildjian', age: 10 });
kitty.save().then(() => console.log('meow'));

// Query a cat
Cat.findOne({ name: 'Zildjian' }, (err, cat) => {
    if (err) return next(err);
    return res.send(cat);
});
```

##### [pug](https://github.com/pugjs/pug) (formerly known as Jade)

Template engine to build html.
```pug
//- template.pug
p #{name}'s Pug source code!
```

```js
const pug = require('pug');

// Compile template.pug, and render a set of data
console.log(pug.renderFile('template.pug', {
  name: 'Timothy'
}));
// "<p>Timothy's Pug source code!</p>"
```

Example iteration:
```pug
ul
  each val in [1, 2, 3, 4, 5]
    li= val
```
builds to:
```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
```

##### Other Utils used

**[dotenv](https://github.com/motdotla/dotenv)**: Loads environment variables (e.g. the database credentials) from `.env` file for NodeJs projects. For production mode the environment is configured by environment variables.    
**[cors](https://github.com/expressjs/cors)**: Configure [CORS](https://developer.mozilla.org/de/docs/Web/HTTP/CORS) Headers.  
**[nocache](https://github.com/helmetjs/nocache)**: Disable Caching for API Responses.  
**[bcryptjs](https://github.com/dcodeIO/bcrypt.js)**: Used to hash the users password before storing it to the database. 

### TODO:
- Better Validation Error handling
- Provide Swagger UI for API
- Refactor to use [NestJS](https://docs.nestjs.com/)?