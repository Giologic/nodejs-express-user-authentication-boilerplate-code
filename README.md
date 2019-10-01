# Node JS / Express User Authentication Boilerplate

This respository serves as boilerplate code for implementing user authentication with Node JS and Express JS. 

## Specifications

This boilerplate uses the following tech stack:
* Node JS
* Express JS Framework (REST API Framework)
* Mlab Mongoose (Database)
* Passport JS (Authentication)
___


## Installation and Configuration
Use the node package manager to install the boilerplate code project

```bash
npm install
```
You will need to setup the hostname and the port that your boilerplate will be using.

```sh
# .env
HOSTNAME=<Server Hostname>
PORT=<Server Port>
```

The boilerplate code uses Mlab (MongoDB cloud service) as the database. All of which, will be provided once you create a database instance in the MLab web application. You will need to configure your settings as follows:

```sh
# .env
HOSTNAME=<Server Hostname>
PORT=<Server Port>

DB_USER=<Database User>
DB_PASSWORD=<Database Password>
DB_PORT=<Database Port>
DB_NAME=<Database Name>
DB_URL=<Database URL>
```

## Usage
Run your application using the node package manager
```bash
npm start
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

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)