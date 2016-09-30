# API endpoints

| url | verb |
| --- | ---- |
| **users** | |
| `/api/users/signup`  | POST |
| `/api/users/signin`  | POST |
| `/api/users/signout` | GET  |
| **integrations** | |
| `/api/integrations`  | GET  |
| └ **github** | |
| `/api/integrations/github` | GET |
| `/api/integrations/github/auth` | GET |
| **keys** | |
| `/api/keys` | GET |
| **annotation** | |
| `/api/annotate` | POST |

## users

### signedin

check if a user is signed in

* **url** `/api/users/signedin`
* **verb** GET
* **input**
 * 
 ```javascript
       EMPTY
 ```
* **output**
 * 
  ```javascript
        STATUS CODE 200
        {
          "signedin": Boolean
        }
  ```
* **auth** NONE

### signup

create a user given an email and password.  
On success (200) a cookie storing the user's session is returned along with a
json object with error being null.  
On error the status code 400 is returned with a json object indicating the
error in a string.  

* **url** `/api/users/signup`
* **verb** POST
* **input**
 ```javascript
       {
         "email": String,
         "password": String
       }
 ```
* **output**
 * on **success**
  ```javascript
        STATUS CODE 200
        {
          "error": null
        }
  ```
 * on **error**
  ```javascript
        STATUS CODE 400
        {
          "error": String
        }
  ```
* **auth** NONE

### signin

sign in an existing user using an email and password.
On success (200) a cookie storing the user's session is returned along with a
json object with error being null.  
On error the status code 400 is returned with a json object indicating the
error in a string.  

* **url** `/api/users/signin`
* **verb** POST
* **input**
  ```javascript
        {
          "email": String,
          "password": String
        }
  ```
* **output**
 * on **success**
  ```javascript
        STATUS CODE 200
        {
          "error": null
        }
  ```
 * on **error**
  ```javascript
        STATUS CODE 400
        {
          "error": String
        }
  ```
* **auth** NONE

### signout

destroyes the current user's session if it exists always returns 200

* **url** `/api/users/signout`
* **verb** GET
* **input**
  ```javascript
        EMPTY
  ```
* **output**
  ```javascript
        EMPTY
  ```
* **auth** NONE

## integrations

### integrations

get a list of the current user's integrations

* **url** `/api/integrations`
* **verb** GET
* **input**
  ```javascript
        EMPTY
  ```
* **output**
 * on **success**
  ```javascript
        STATUS CODE 200
        [
          String,
          String...
        ]
  ```
 * on **error**
  ```javascript
        STATUS CODE 400
        {
          "error": String
        }
  ```
* **auth** SESSION

### github go to auth

redirects the user to the correct github url to start authorization

* **url** `/api/integrations/github`
* **verb** GET
* **input**
  ```javascript
        EMPTY
  ```
* **output**
  ```javascript
        STATUS CODE 302
  ```
* **auth** SESSION

### github repos

list all repos of the currently logged in user

* **url** `/api/integrations/github/repos`
* **verb** GET
* **input**
  ```javascript
        EMPTY
  ```
* **output**
 * on success
  ```javascript
        STATUS CODE 200
        [
          String
        ]
  ```
 * on error
  ```javascript
        STATUS CODE 400
        {
          "error": String
        }
  ```
* **auth** SESSION

### github set repo

set the users github repo to post issues to

* **url** `/api/integrations/github/repos`
* **verb** POST
* **input**
  ```javascript
        {
          "name": String
        }
  ```
* **output**
 * on success
  ```javascript
        STATUS CODE 200
        {
          "error": null
        }
  ```
 * on error
  ```javascript
        STATUS CODE 400
        {
          "error": String
        }
  ```
* **auth** SESSION

### github auth

used by github to return auth token after user is verified. Returns user to `/`
when auth is complete

* **url** `/api/integrations/github/auth`
* **verb** GET
* **input**
  ```javascript
        code=String&scope=String
  ```
* **output**
 * on **success**
  ```javascript
        STATUS CODE 302

  ```
 * on **error**
  ```javascript
        STATUS CODE 400
        {
          "error": String
        }
  ```
* **auth** SESSION

## keys

### keys

get a list of user's keys

* **url** `/api/keys`
* **verb** GET
* **input**
  ```javascript
        EMPTY
  ```
* **output**
 * on **success**
  ```javascript
        [
          {
            "name": String (Optional),
            "apiKey": String,
            "endpoint": String
          }...
        ]

  ```
 * on **error**
  ```javascript
        STATUS CODE 400
        {
          "error": String
        }
  ```
* **auth** SESSION

### create

create a new key

* **url** `/api/keys`
* **verb** POST
* **input**
  ```javascript
        EMPTY
  ```
* **output**
 * on **success**
  ```javascript
        {
          "key": String
        }

  ```
 * on **error**
  ```javascript
        STATUS CODE 400
        {
          "error": String
        }
  ```
* **auth** SESSION

## annotation

### annotate

create a new annotation

* **url** `/api/annotate`
* **verb** POST
* **input**
  ```javascript
        {
          "title": String,
          "comment": String,
          "to": String,
          "from": String,
          "selected": String
          "element": {
            "text": String,
            "x": Number,
            "y": Number,
            "width": Number,
            "height": Number,
            "name": {
                "text": String,
                "nth": Number
            },
            "class": {
                "text": String,
                "nth": Number
            },
            "id": String
          }
        }
  ```
* **output**
 * on **success**
  ```javascript
        STATUS CODE 200
        {
          "error": null
        }

  ```
 * on **error**
  ```javascript
        STATUS CODE 400
        {
          "error": String
        }
  ```
* **auth** SESSION

