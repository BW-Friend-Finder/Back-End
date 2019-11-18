# Back-End

## Models and Routes:

1.  **Hobbies Model:**
    1.  find --> return all hobbies
    1.  findById --> returns hobby(ies) by specified hobbies_id
    1.  add --> add new hobby
    1.  update --> edit hobby specified by hobbies_id and object with updated content 
    1.  remove --> delete hobby specified by hobbies_id

1.  **Hobbies Routes:**
    1.  


1.  **users Model:**
    1.  find --> returns all users
    1.  findById --> returns user object when user_id specified. REQUIRES TOKEN FOR AUTHORIZATION
    1.  insert --> Adds a new user to the table
    1.  update --> Edits specified user 
    1.  remove --> delete hobby specified by hobbies_id

1.  **/api/users/ Routes:**
    1.  /login --> post --> requires email and password to be sent in body. 
        1.  Returns:
            1.  Confirmation message
            1.  Token
            1.  User object containing: 
                1.  user_id
                1.  email
                1.  first_name
                1.  last_name
                1.  age
                1.  gender
                1.  city
                1.  state
                1.  zipcode
    1.  /register --> post
        1.  Requirements (sent in body of request)
            1.  email
            1.  password
            1.  first_name
            1.  last_name
            1.  age
            1.  zipcode
            1.  Optional data: 
                1.  gender
                1.  city
                1.  state
        1.  Returns: 
            1.  user_id
            1.  email
            1.  first_name
            1.  last_name
            1.  age
            1.  gender
            1.  city
            1.  state
            1.  zipcode
    1.  /:id
        1.  Put --> REQUIRES TOKEN FOR AUTHORIZATION
            1.  Requires:
                1.  user_id as path param
                1.  updated user data:
                    1.  email
                    1.  password
                    1.  first_name
                    1.  last_name
                    1.  age
                    1.  zipcode
                1.  Optional data: 
                    1.  gender
                    1.  city
                    1.  state
            1.  Returns updated user object:
                1.  user_id
                1.  email
                1.  first_name
                1.  last_name
                1.  age
                1.  gender
                1.  city
                1.  state
                1.  zipcode
        1.  Delete --> REQUIRES TOKEN FOR AUTHORIZATION
            1.  Requires user_id as path param
        1.  GET --> REQUIRES TOKEN FOR AUTHORIZATION
            1.  Requires user_id as path param







