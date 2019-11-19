# Back-End

In a world where relationships start with a swipe, its much easier to find someone for an intimate relationship than it is to find a plutonic friendship. With friendfinder, we are changing that. Now you can find people with similar interests to yourself without having to worry whether or not they are only wanting that one thing from you.

With friendfinder you can see potential matches that have the same or similar interests to you and once match you can chat directly with them.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

A step by step series of examples that tell you how to get a development env running

Install the dependancies that comes with the repo

```
npm i
```

Start the development local server, this git will use port 5000

```
npm run server
```

# BaseURL

## https://friend-finder-dev.herokuapp.com

# Endpoints

## Authentication

| Request Type |      Endpoint       |    Description     |
| :----------: | :-----------------: | :----------------: |
|     POST     | /api/users/register | Creates a new user |
|     POST     |  /api/users/signin  |   Creates JWT\*    |

- JSON Web Tokens Used to Verify Users

## Users

| Request Type | Endpoint |                   Description                    |
| :----------: | :------: | :----------------------------------------------: |
|     GET      |  /users  |    Returns the authenticated user from token     |
|     PUT      |  /users  |             Updates a user by token              |
|    DELETE    |  /users  | Removes a user from database and deletes account |

## Hobbies

| Request Type |   Endpoint    |          Description          |
| :----------: | :-----------: | :---------------------------: |
|     GET      | /hobbies/all  | Returns a list of all hobbies |
|     GET      |   /hobbies    |      Returns hobby by id      |
|     GET      | /hobbies/user |   Returns hobbies for user    |
|     POST     | /hobbies/user |  Inserts a hobby for a user   |
|    DELETE    | /hobbies/user |  Removes a hobby for a user   |

## Matches

| Request Type |  Endpoint   |        Description         |
| :----------: | :---------: | :------------------------: |
|     GET      | /match/user | Returns matches for a user |
|     POST     | /match/user |       Creates match        |

## Conversations

| Request Type |       Endpoint       |              Description              |
| :----------: | :------------------: | :-----------------------------------: |
|     GET      |   /users/convo/:id   |        Return a specific convo        |
|     GET      |   /users/:id/convo   | Returns all of the convo's by user id |
|     POST     | /users/:id/convo/:id |      Creates a new conversation       |

# Data Models

## Authentication

### Register

#### A POST request to the /api/users/register endpoint expects to recieve an object as follows:

```javascript
    {
      "user_id": 1,
      "email": "michael_scott@example.com",
      "first_name": "Michael",
      "last_name": "Scott",
      "age": 48,
      "gender": "male",
      "city": "Scranton",
      "state": "PA",
      "zipcode": 18509
    }
```

| Field |  Type  | Unique |
| :---: | :----: | :----: |
| email | String |  true  |

### Sign in

#### A POST request to the /api/users/signin endpoint expects to recieve an object as follows:

```javascript
{
    "email": "creed_bratton@example.com",
    "password": "pass123"
}
```

#### Success Response:

- Code: `200`
- Content: `{ message: ${user.email} successfully logged in, token, user_details }`

#### Error Response:

- Code: `404 NOT FOUND`
- Content: `{ error: "User doesn't exist" }`

OR

- Code: `401 UNAUTHORIZED`
- Content: `{ error: "Invalid Credentials" }`

NOTE: If successful, a JSON Web Token will be returned. This must be stored and used as authentication for API calls to matches, conversations and request endpoints.

### Users

#### A PUT request to the /api/users endpoint expects to recieve an object as follows:

```javascript
 {
      "email": "creed_bratton@example.com",
      "password": "pass123",
      "first_name": "Creed",
      "last_name": "Bratton",
      "age": 55,
      "gender": "male",
      "city": "Scranton",
      "state": "PA",
      "zipcode": 18509
  }
```
#### Success Response:

- Code: `201`
- Content: `{ message: "Successfully updated", updatedUser }`

#### Error Response:

- Code: `404 NOT FOUND`
- Content: `{ error: "User doesn't exist" }`

OR

- Code: `401 UNAUTHORIZED`
- Content: `{ error: "Invalid Credentials" }`

NOTE:

### Hobbies

#### A GET request to the /hobbies endpoint will return an object as follows:

```javascript

    {
        "hobbies_id": 1,
        "hobby_name": "hiking"
    }

```

#### A POST request to the /hobbies endpoint will return a message as follows:

`message: 'Successfully added ${count} records'`

### Matches

#### A GET request to the /match/user/:id endpoint will return an object as follows:

```javascript
{
}
```

NOTE:

### Conversations

#### A GET, PUT, POST request to the /snacks/nutrition endpoint will return an object as follows:

```javascript
{
}
```

NOTE:
