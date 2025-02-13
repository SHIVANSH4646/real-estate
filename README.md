# real-estate

In this project we have to create a frontend part for an application which is used to unlock the home.
I'm providing all the essential code which provide user friendly interface.
I had provided 3 source code app, homescreen, detailscreen

# app.js
it provides global API data fetching capabilities.
Manages screen navigation.
Defines the screens in the app

# Homescreen.js
It fetches home data from API using React Query.
Display a list of homes with images and descriptions.
Navigates to DetailsScreen when a home is clicked.

# Detailscreen.js
Fetches user location when the screen loads.
Calculates distance between the user and home.
Displays "Unlock" button if the user is within 30 meters.
Calls an API to unlock the home when the button is pressed.
