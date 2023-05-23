# myFlix-React-client

The client side for a movies app called "MyFlix" built with the MERN stack in which users can search for and save information about movies. Movie and user data is stored in a database (MongoDB), and access to that data will be provided via a REST API (also known as a “RESTful API”). It is also a single-page, responsive app with routing, rich interactions, several interface views, and a polished user experience. 

<br>

<strong>[LIVE DEMO](https://myflix-movies-client.netlify.app/)</strong>

<br>

## Placeholder for Images
<p align-right>
<img src="http://via.placeholder.com/150x150" alt="movie app image">
<img src="http://via.placeholder.com/150x150" alt="movie app image">
<img src="http://via.placeholder.com/150x150" alt="movie app image">
   </p>
 
## Technology used:

- React 
- JSX 
- CSS
- Parcel
- React Bootstrap / Bootstrap
- Class components
- React Redux for state management

## User Stories:

- As a user, I want to be able to access information on movies, directors, and genres so that I can learn more about movies I've watched or am interested in.
- As a user, I want to be able to create a profile so I can save data about my favorite movies.

# Features and Requirements:

## 👨🏻‍💻 Main View:

* Returns al list of ALL movies to the user (each listed item with an image, title, and description)
* Sorting and filtering
* Ability to select a movie for more details

## 👨🏻‍💻 Single Movie View:

* Returns data (description, genre, director, image) about a single movie to the user
* Allows users to add a movie to their list of favorites

## 👨🏻‍💻 Login View:

* Allows users to log in with a username and password
* Registration view
* Allows new users to register (username, password, email, birthday)

## 👨🏻‍💻 Genre View:

* Returns data about a genre, with a name and description
* Displays example movies

## 👨🏻‍💻 Director View:

* Returns data about a director (name, bio, birt hyear, death year - if appropriate)
* Displays example movies

## 👨🏻‍💻 Profile View:

* Allows users to update their user info (username.password.email.date of birth)
* Allows existing users to deregister
* Displays favorite movies
* Allows users to remove a movie from their list of favorites

## 🛠 Installation: 
 ```
 git clone https://github.com/koola123/myFlix.git
 cd myFlix
 npm install
 ````
 
#### Then run the app on localhost:1234 in your browser with the following command:
 
 `parcel src/index.html`
  or
  `parcel index.html`
 
 Awesome! 🚀
 
 <br>
 
Version 1.0.0
