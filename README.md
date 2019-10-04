# Node JS / Express User Authentication Boilerplate

This respository serves as boilerplate code for implementing user authentication with Node JS and Express JS. 

## Specifications

This boilerplate uses the following tech stack:
* Node JS
* Express JS Framework (REST API Framework)
* MongoDB (Database)
* Passport JS (Authentication)
___


## Installation and Configuration
To setup the application
```bash
docker-compose build
```
You will need to setup the hostname and the port that your boilerplate will be using.

```sh
# .env
PORT=5000
```

The boilerplate code uses a docker image to host mongo as the database. You will need to configure your settings as follows:

```sh
# .env
DB_URL=mongodb://mongo:27017/boilerplate_db
```

The authentication system of this boilerplate uses bcrypt for hashing passwords. The JWT Secret is used as a reference in hashing the passwords.
```sh
JWT_SECRET=ptFq8OEjvKZ3QFABWsTKGON8nsJikkE9PC1
```

## Usage
Run your application using docker
```bash
docker-compose up
```

The application automatically seeds the users through docker-compose. You may remove or comment this to remove automatic seeding.

```yml
# docker-compose.yml
seed:
    build: .
    command: npm run seed
    depends_on:
      - mongo
```

### Endpoints

#### Authentication
___

##### Registration
POST /api/v1/auth/register

Input
```json
{
  "firstName": "Gio",
  "lastName": "Velez",
  "email": "gio@test.com",
  "password": "password", //8 characters
  "confirmPassword": "confirmPassword"
}
```
Output
```json
{
  "id": "5d935771ef2c81cc7403d9b2",
  "firstName": "Test",
  "lastName": "Account",
  "email": "new@gmail.com"
}
```

##### Login
POST /api/v1/auth/login

Input
```json
{
  "email": "gio@test.com",
  "password": "password", //8 characters
}
```
Output
```json
{
  "message": "Successfully Logged in",
  "token": "Bearer <JWT Token>"
}
```
___

#### Users

##### Get current user
GET /api/v1/users/me

Input
```json
{}
```

Output
```json
{
  "id": "5d934c48eb797fc1235f2a8a",
  "firstName": "Test",
  "lastName": "Account",
  "email": "test@gmail.com"
}
```

##### Get current user
GET /api/v1/users

Input
```json
{}
```

Output
```json
[
    {
        "id": "5d96f96e0c91c5001123a1c0",
        "firstName": "Gio",
        "lastName": "Velez",
        "email": "gio@test.com"
    },
    {
        "id": "5d96f96e0c91c5001123a1c1",
        "firstName": "JP",
        "lastName": "Tan",
        "email": "jp@test.com"
    }
]
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
