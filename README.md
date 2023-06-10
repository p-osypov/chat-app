# Web chat app

## Required env vars

The following env vars need adding and populating in your `.env` file.
```dotenv
API_SECRET="Your secret key"
MONGO_URI="mongodb://localhost:27017/chat"
PORT=3000
```
## Running

Install node packages using `npm install`.

To run the app in dev mode use `npm start`. The local url will be `http://localhost:PORT`

To run production use `npm run start:production`

## Folder structure

```
├── logs                      # Folder for info and error logs
├── public                    # Publicly available files. Client part of app is all here.
├── storage                   # Folder for uploaded images.
├── src                       # Source code
|   ├── middleware            # Server Middlewares
|   ├── models                # MongoDB models
|   ├── rotes                 # API and client pages routes are here
|   ├── services              # API services to handle routes logic
|   ├── utils                 # Extra helpers to process data
|   ├── constants.js          # Global constants such as Paths and env vars
|   ├── server.js             # Main script to start server
└── README                    # This file
```
