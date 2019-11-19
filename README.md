# Back-End


In a world where relationships start with a swipe, its much easier to find someone for an intimate relationship than it is to find a plutonic friendship. With friendfinder, we are changing that. Now you can find people with similar interests to yourself without having to worry whether or not they are only wanting that one thing from you.

With friendfinder you can see potential matches that have the same or similar interests to you and once match you can chat directly with them.


# BaseURL 
## https://friend-finder-dev.herokuapp.com

# Endpoints

## Authentication
|Request Type|	Endpoint	|Description|
|:---------:|:-----------:|:---------------:|
|POST	|/api/users/register |Creates a new user|
|POST	|/api/users/signin	 |Creates JWT*|
* JSON Web Tokens Used to Verify Users


## Users
|Request Type	|Endpoint	|Description|
|:---------:|:-----------:|:--------------:|
|GET    |/users/:id	|Returns user by id|
|PUT	|/users/:id |Updates a user by user_id|
|DELETE	|/users/:id	|Removes a user from database and deletes account|


## Hobbies
|Request Type	|Endpoint	|Description|
|:---------:|:----------:|:---------------:|
|GET	|   /hobbies	    |Returns a list of all hobbies|
|GET    |	/hobbies/:id    |Returns a single hobby|

## Matches
|Request Type	|Endpoint	|Description|
|:---------:|:------------:|:--------------:|
|GET	 |  /match/user/:id	|Returns matches by id|

## Conversations
|Request Type|	Endpoint	|Description|
|:---------:|:-----------:|:------------:|
|GET	|   /users/convo/:id	|Return a specific convo|
|GET	|/users/:id/convo	|Returns all of the convo's by user id|
|POST	|/users/:id/convo/:id|	Creates a new conversation |



# Data Models

## Authentication
### Register

#### A POST request to the /auth/register/organization endpoint expects to recieve an object as follows: (EVERY FIELD IS REQUIRED)
```javascript
{
    "username": "username"
    "password": "password",
    "email": "email@address.com",
    "phoneNumber": "3453453534",
    "streetAddress": "124 Ross",
    "state": "Nowhere",
    "zipcode": "12345",
    "organizationName": "Org Name",
    "contactPerson": "Fake Person",
    "role": "organization"
}
```

#### A POST request to the /auth/register/employee endpoint expects to recieve an object as follows: (EVERY FIELD IS REQUIRED)
```javascript
{
    "username": "username"
    "password": "password",
    "email": "email@address.com",
    "phoneNumber": "3453453534",
    "streetAddress": "124 Ross",
    "state": "Nowhere",
    "zipcode": "12345",
    "fullName": "Full Name",
    "contactPerson": "Fake Person",
    "role": "organization",
    "orgId": Organization # goes here
}
```

|Field	 |  Type	 |	    Unique   |
|:------:|:----------:|:--------------:|
|username |	String	|  true	|



### Login
#### A POST request to the auth/login/organization endpoint expects to recieve an object as follows:
```javascript
{
    "username": "username",
    "password": "happytree"
}
```

#### A POST request to the auth/login/employee endpoint expects to recieve an object as follows:
```javascript
{
    "username": "username",
    "password": "happytree"
}
```
NOTE: If successful, a JSON Web Token will be returned. This must be stored and used as authentication for API calls to snacks, subscriptions and request endpoints.


### Changing the Role
#### A PUT /auth/:id/update-role	endpoint will return an object as follows:
```javascript
{   
    "id": 1
    "username": "username"
    "password": "password",
    "email": "email@address.com",
    "phoneNumber": "3453453534",
    "streetAddress": "124 Ross",
    "state": "Nowhere",
    "zipcode": "12345",
    "fullName": "Full Name",
    "contactPerson": "Fake Person",
    "role": "organization",
    "orgId": Organization # goes here
}
```

### Subscriptions
#### A GET,PUT,POST request to the /subs endpoint will return an object as follows:
```javascript
[
    {
        "id": 2,
        "monthlyFee": "$5",
        "lengthOfSubscription": "4/4/4040 - 4/3/6060",
        "nameOfSubscription": "Name",
        "orgId": 1
    }
]
```
NOTE: For PUT requests an object only containing the changed field is required, if the field is to remain the same it is not needed. An 'id' isn't needed for POST requests.


### Snacks
#### A GET, PUT, POST request to the /snacks endpoint will return an object as follows:
```javascript
{
    "id": 2,
    "name": "Name",
    "numberOfServings": 2,
    "totalWeight": '1.5 grams',
    "price": '$5.00',
    "subId": 1
}
```
NOTE: For PUT requests an object only containing the changed field is required, if the field is to remain the same it is not needed. An 'id' isn't needed for POST requests.

### Nutrition
#### A GET, PUT, POST request to the /snacks/nutrition endpoint will return an object as follows:
```javascript
{
    "id": 2,
    "calories": 2,
    "totalFat": 2,
    "totalSugars": '1.5 grams',
    "protein": "1 gram",
    "carbs": "1 gram",
    "allergens": "none,
    "snackId": 1
}
```
NOTE: For PUT requests an object only containing the changed field is required, if the field is to remain the same it is not needed. An 'id' isn't needed for POST requests.



### Request
#### A GET, PUT, POST request to the /request endpoint will return an object as follows:
```javascript
{
    "id": 2,
    "snackName": "Name",
    "subId": 1
}
```
NOTE: For PUT requests an object only containing the changed field is required, if the field is to remain the same it is not needed. An 'id' isn't needed for POST requests.


### Purchase 
#### A GET, PUT, POST request to the /purchase endpoint will return an object as follows:
```javascript
{
    "id": 2,
    "snackName": "Name",
    "subId": 1
}
```
NOTE: For PUT requests an object only containing the changed field is required, if the field is to remain the same it is not needed. An 'id' isn't needed for POST requests.







