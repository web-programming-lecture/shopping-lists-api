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
│   README.md     /* You are here */
│   package.json  /* Package info, main scripts, dependencies to install */
│   app.js        /* Main file */
│   .env          /* Setup DB Connection Credentials here */
│   .gitignore    /* Exclude files (private, npm packages) from git */
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

#### Packages used:

##### [express](https://github.com/expressjs/express/)

##### [(express) body-parser](https://github.com/expressjs/body-parser)

##### [express-session](https://github.com/expressjs/session)

##### [mongoose](https://github.com/Automattic/mongoose/)

##### [pug](https://github.com/pugjs/pug)

##### Utils
**[dotenv](https://github.com/motdotla/dotenv)**:  
**[(express) cors](https://github.com/expressjs/cors)**:  
**[nocache](https://github.com/helmetjs/nocache)**:  
**[bcryptjs](https://github.com/dcodeIO/bcrypt.js)**:  

### Configure the MongoDB Database Connection

You can get free plan for MongoDB sandbox instances (512MB) at [https://mlab.com/](https://mlab.com/).   
The database connection is configured via environment variables.    
Create a `.env` file in the top level directory and set:  
```
MONGO_DB_USER=<user>
MONGO_DB_PASSWORD=<pw>
MONGO_DB_CONNECTIONSTRING=<connectionstring>
```
Make sure the file is excluded from git (see `.gitignore`). And not stored/pushed to the remote repository!

### Development Server

First install the dependencies using npm (make sure you installed [NodeJs](https://nodejs.org/en/))
```
npm install
```

To start a file watch server you can use nodemon:
```
npm install -g nodemon
nodemon app.js
```

To just start the server without watching files use:
```
npm run start
```

### Deploy to Heroku / zeit.co

You can get free plan hosting for your node server at [heroku.com](https://www.heroku.com/) or [zeit.co](https://zeit.co).
Make sure you configure the environment variable for the MongoDB Connection and the Port for production (80).

### TODO:
- Better ValidationError handling
- Provide Swagger UI