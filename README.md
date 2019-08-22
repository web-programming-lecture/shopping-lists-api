# Shopping Lists API

### Configure the MongoDB Database Connection
You can get free teer MongoDB sandbox instances at [https://mlab.com/](https://mlab.com/).   
The database connection is configured via environment.    
Create a `.env` file in the top level directory and set:  
```
MONGO_DB_USER=<user>
MONGO_DB_PASSWORD=<pw>
MONGO_DB_CONNECTIONSTRING=<connectionstring>
```
Make sure the file is excluded from git (see `.gitignore`). And not stored in the repository!

### Development Server
To start a file watch server you can use nodemon:
```
npm install -g nodemon
nodemon app.js
```

### TODO:
- Better ValidationError handling