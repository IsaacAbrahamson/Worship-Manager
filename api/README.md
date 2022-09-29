# Worship-Manager

Backend

## Usage

Build for production
```
npm start
```

Run local server
```
npm run dev
```

Populate database
```
npm run populate
```

## Routes

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

Users
```
GET  /api/users/:id
POST /api/users/new
POST /api/users/update
POST /api/users/delete
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
GET  /login
POST /register
```