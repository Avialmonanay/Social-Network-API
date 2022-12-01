# Social Network API        
This Social Network API was built to demonstrate my ability to use MongoDB to create an API based social networking application. This application allows you to add users, thoughts, reactions, and friends and make the appropriate changes to those datasets that you expect to come with a social network application.


## Table of Contents (Optional)

- [Installation](#installation)
- [Usage](#usage)
- [Video Demonstration](#video-demonstration)
- [API Documentation](#api-documentation)
- [Features](#features)
- [Contact](#questions)



## Installation
This Application utilizes 2 NPM packages for Express and Mongoose. These can be downloaded by accessing the terminal of the application and running "npm i" that is all the configuration needed for this application. Once that is installed you can run the application and start making changes.

## Usage
This is an API application built with no front end UI. Users will have to interact with the application via api methods to get and modify data. Refer to the API documentation on this ReadMe for all API routes. When making api calls it is expected to have a response from the server with the requested information or an error if something whas inputted incorrectly by the user. When presented with data from the Users or Thoughts GET routes users will also see virtuals showing either Friend Count or Reaction Count

Sample image showing a successful API Call with returned JSON Data
![Example API](https://user-images.githubusercontent.com/108016215/204982912-9d29ba8c-48ad-43cc-8764-a7fcdfb11fa5.PNG)


## Video Demonstration
https://drive.google.com/file/d/1U9hd7vRa-2wyb2EyQETVsHNbSo17H_ZN/view

## API Documentation

### Users Route

**/api/users**

Supported Methods: GET, POST

GET Method will return all Users.

POST Method will add a new user.

Example POST JSON:
{
  "username": "Api Routes User",
  "email": "apiroutes@apiroutes.com"
}

---

**/api/users/{userID}**

Supported Methods: GET, PUT, DELETE

GET Method will pull a single user by their ID and return their results.

PUT Method will allow you to update a users email or username.

Example PUT JSON:{
  "username": "Updated Api Routes User",
  "email": "updatedapiroutes@apiroutes.com"
}

DELETE Method will delete the specified user.

---

**/api/users/{userId}/friends/{friendId}**

Supported Methods: POST, DELETE

POST Method will add the friendId to the friends array of the user specified in the userId

DELETE Method will remove the friendId from the friends array of the user specified in the userId

---

### Thoughts Route

**/api/thoughts/**

Supported Methods: GET, POST

GET Method returns all thoughts

POST Method Allows you to add in a new thought. Posting users username and Id need to be inputted into the JSON Body. This will attach the newley created thought ID to the user who made the thought.

Example POST JSON:{
  "thoughtText": "Enter Thought Text Here",
  "username": "{username}",
  "userId": "{userId}"
}

---

**/api/thoughts/{thoughtId}**

Supported Methods: GET, PUT, DELETE

GET Method will return a single thoughts JSON data by specified ID

PUT Method will allow you to update an existing thoughtText by specified ID

Example PUT JSON:{
  "thoughtText": "I updated this thought!"
}

DELETE Method will delete the specified thought and remove the thought id from the thoughts array on the posting user.

---

**/api/thoughts/{thoughtId}/reactions**

Supported Methods: POST

POST Method will add a reaction to the specified thought with data about the posting user.

Example POST JSON:{
	"reactionBody":"Wow Another Great Idea!",
	"username":"Updated Api Routes User"
}

---

**/api/thoughts/{thoughtId}/reactions/{reactionId}**

Supported Methods: DELETE

DELETE Method will delete a reaction and remove its ID from the reactions array in the Thoughts model

---

## Features
This Application utilizes Express for the server and API routes and Mongoose for data manipulation. 

Full Feature list and Versions:
{
"express": "^4.17.1",
"mongoose":"6.7.3"
}

## Questions

Github Username:Avialmonanay

If you have any additional questions please email me at rexxmadsen@gmail.com


