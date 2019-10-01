# Shopping Lists API

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