
# API endpoints

* [users](#users)
  * [signedin](#signedin)
  * [signup](#signup)
  * [signin](#signin)
  * [signout](#signout)
* [integrations](#integrations)
  * [list](#list)
  * [github](#github)
    * [initiate auth](#initiate-auth)
    * [list repos](#list-repos)
    * [set repos](#set-repos)
    * [github auth](#github-auth)
* [keys](#keys)
  * [list keys](#list-keys)
  * [create key](#create-key)
* [annotation](#annotation)
  * [create annotation](#create-annotation)


## users


### signedin

check if a user is signed in
* **url** /api/users/signedin
* **verb** GET
* **input**
    ```javascript
        EMPTY
    ```

* **output**
    ```javascript
        STATUS CODE 200
    ```

    ```javascript
        {
          "signedin": "Boolean"
        }
    ```

* **auth** NONE

### signup

create a user given an email and password.
On success (200) a cookie storing the user's session is returned along with a json object with error being null.
On error the status code 400 is returned with a json object indicating the error in a string.
* **url** /api/users/signup
* **verb** POST
* **input**
    ```javascript
        {
          "email": "String",
          "password": "String"
        }
    ```

* **output**
  * **on success**
      ```javascript
            STATUS CODE 200
      ```

      ```javascript
            {
              "error": null
            }
      ```

  * **on error**
      ```javascript
            STATUS CODE 400
      ```

      ```javascript
            {
              "error": "String"
            }
      ```

* **auth** NONE

### signin

sign in an existing user using an email and password.
On success (200) a cookie storing the user's session is returned along with a json object with error being null.
On error the status code 400 is returned with a json object indicating the error in a string.
* **url** /api/users/signin
* **verb** POST
* **input**
    ```javascript
        {
          "email": "String",
          "password": "String"
        }
    ```

* **output**
  * **on success**
      ```javascript
            STATUS CODE 200
      ```

      ```javascript
            {
              "error": null
            }
      ```

  * **on error**
      ```javascript
            STATUS CODE 400
      ```

      ```javascript
            {
              "error": "String"
            }
      ```

* **auth** NONE

### signout

destroyes the current user's session if it exists always returns 200
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


### list

get a list of the current user's integrations
* **url** /api/integrations
* **verb** GET
* **input**
    ```javascript
        EMPTY
    ```

* **output**
  * **on success**
      ```javascript
            STATUS CODE 200
      ```

      ```javascript
            [
              "String",
              "..."
            ]
      ```

  * **on error**
      ```javascript
            STATUS CODE 400
      ```

      ```javascript
            {
              "error": "String"
            }
      ```


### github


#### initiate auth

redirects the user to the correct github url to start authorization
* **url** /api/integrations/github
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

#### list repos

list all repos of the currently logged in user
* **url** /api/integrations/github/repos
* **verb** GET
* **input**
    ```javascript
        EMPTY
    ```

* **output**
  * **on success**
      ```javascript
            STATUS CODE 200
      ```

      ```javascript
            [
              "String",
              "String",
              "..."
            ]
      ```

  * **on error**
      ```javascript
            STATUS CODE 400
      ```

      ```javascript
            {
              "error": "String"
            }
      ```

* **auth** SESSION

#### set repos

set the users github repo to post issues to
* **url** /api/integrations/github/repos
* **verb** POST
* **input**
    ```javascript
        {
          "name": "String"
        }
    ```

* **output**
  * **on success**
      ```javascript
            STATUS CODE 200
      ```

      ```javascript
            {
              "error": null
            }
      ```

  * **on error**
      ```javascript
            STATUS CODE 400
      ```

      ```javascript
            {
              "error": "String"
            }
      ```

* **auth** SESSION

#### github auth

used by github to return the auth token after user is verified. Redirects to `/create/github` when auth is complete.
* **url** /api/integrations/github/auth
* **verb** GET
* **input**
    ```javascript
        code=String&scope=String
    ```

* **output**
  * **on success**
      ```javascript
            STATUS CODE 302
      ```

  * **on error**
      ```javascript
            STATUS CODE 400
      ```

      ```javascript
            {
              "error": "String"
            }
      ```

* **auth** SESSION


### URLs

#### list URLs
list all URLs of the currently logged in user

* **url** /api/integrations/url/urls
* **verb** GET
* **input**
    ```javascript
        EMPTY
    ```

* **output**
  * **on success**
      ```javascript
            STATUS CODE 200
      ```

      ```javascript
            [
              "String",
              "String",
              "..."
            ]
      ```

  * **on error**
      ```javascript
            STATUS CODE 400
      ```

      ```javascript
            {
              "error": "String"
            }
      ```

* **auth** SESSION


#### set URL
set the users URL to post comments to

* **url** /api/integrations/url/urls
* **verb** POST
* **input**
    ```javascript
        {
          "name": "String"
        }
    ```

* **output**
  * **on success**
      ```javascript
            STATUS CODE 200
      ```

      ```javascript
            {
              "error": null
            }
      ```

  * **on error**
      ```javascript
            STATUS CODE 400
      ```

      ```javascript
            {
              "error": "String"
            }
      ```

* **auth** SESSION


## keys


### list keys

get a list of the user's keys
* **url** /api/keys
* **verb** GET
* **input**
    ```javascript
        EMPTY
    ```

* **output**
  * **on success**
      ```javascript
            STATUS CODE 200
      ```

      ```javascript
            [
              {
                "name": "String (Optional)",
                "api_key": "String",
                "endpoint": "String"
              }
            ]
      ```

  * **on error**
      ```javascript
            STATUS CODE 400
      ```

      ```javascript
            {
              "error": "String"
            }
      ```

* **auth** SESSION

### create key

get a list of the user's keys
* **url** /api/keys
* **verb** POST
* **input**
    ```javascript
        EMPTY
    ```

* **output**
  * **on success**
      ```javascript
            STATUS CODE 200
      ```

      ```javascript
            {
              "key": "String"
            }
      ```

  * **on error**
      ```javascript
            STATUS CODE 400
      ```

      ```javascript
            {
              "error": "String"
            }
      ```

* **auth** SESSION

## annotation


### create annotation

create an annotation
* **url** /api/annotate
* **verb** POST
* **input**
    ```javascript
        {
          "title": "String",
          "comment": "String",
          "to": "String",
          "from": "String",
          "selected": "String",
          "element": {
            "text": "String",
            "x": "Number",
            "y": "Number",
            "width": "Number",
            "height": "Number",
            "name": {
              "text": "String",
              "nth": "Number"
            },
            "class": {
              "text": "String",
              "nth": "Number"
            },
            "id": "String"
          }
        }
    ```

* **output**
  * **on success**
      ```javascript
            STATUS CODE 200
      ```

      ```javascript
            {
              "error": null
            }
      ```

  * **on error**
      ```javascript
            STATUS CODE 400
      ```

      ```javascript
            {
              "error": "String"
            }
      ```

* **auth** NONE
