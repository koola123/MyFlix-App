# myFlix-client

This is the client-side development for an application called myFlix based on its existing server-side code (REST API and database).

<b>[LIVE DEMO](https://myflix-movies-client.netlify.app/)</b>

## USER STORIES

- As a user, I want to be able to access information on movies, directors, and genres so that I can learn more about movies I've watched or am interested in.
- As a user, I want to be able to create a profile so I can save data about my favorite movies.

## FEATURES AND REQUIREMENTS

### Main view

* Returns al list of ALL movies to the user (each listed item with an image, title, and description)
* Sorting and filtering
* Ability to select a movie for more details

### Single movie view

* Returns data (description, genre, director, image) about a single movie to the user
* Allows users to add a movie to their list of favorites

### Login view

* Allows users to log in with a username and password
* Registration view
* Allows new users to register (username, password, email, birthday)

### Genre view

* Returns data about a genre, with a name and description
* Displays example movies

### Director view

* Returns data about a director (name, bio, birt hyear, death year - if appropriate)
* Displays example movies

### Profile view

* Allows users to update their user info (username.password.email.date of birth)
* Allows existing users to deregister
* Displays favorite movies
* Allows users to remove a movie from their list of favorites

##### Languages & Tools used for building this App:
```html
   <script> MERN-Stack (MongoDB, ExpressJS, ReactJS, NodeJS) </script>
 ```
```html
   <html> HTML5, CSS3, SCSS </html>
 ```
 
 #### Author
 
 Matthias Müringer
 
 
#### Version
 
 1.0.0
