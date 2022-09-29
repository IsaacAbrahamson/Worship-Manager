# Worship-Manager

This folder contains all of the backend code for the application. You will need Node.js installed and have either a local MongoDB or Atlas database.

## Getting Started

Install dependencies:
```
npm install
```

Create a `.env` file in the `/api` root folder:
```
DB_STRING = mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
SESSION_SECRET = some_random_string_1234
```

Build for production
```
npm start
```

Run local server
```
npm run dev
```

Populate database with test user and information
```
npm run populate
```

## Test User

The following test user can be used in place of registering a new user:
```
email: testuser@example.com
password: test123
```

## API Endpoints

Services
```
GET  /api/services/
GET  /api/services/:id
POST /api/services/new
POST /api/services/update
POST /api/services/delete
```

People
```
GET  /api/people/
POST /api/people/new
POST /api/people/update
POST /api/people/delete
```

Songs
```
GET  /api/songs/
POST /api/songs/new
POST /api/songs/update
POST /api/songs/delete
```

Options
```
GET  /api/options/events/
POST /api/options/events/new
POST /api/options/events/update
POST /api/options/events/delete

GET  /api/options/roles/
POST /api/options/roles/new
POST /api/options/roles/update
POST /api/options/roles/delete

GET  /api/options/types/
POST /api/options/types/new
POST /api/options/types/update
POST /api/options/types/delete
```

Auth
```
GET  /api/auth/user
POST /api/auth/login
POST /api/auth/register
```