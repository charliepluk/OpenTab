![Build and Test](https://github.com/drphamwit/SE-SampleGithubRepo/workflows/Build%20and%20Test/badge.svg)

# OpenTab

## Introduction

OpenTab is a point of sale service that allows for customers to order beverages and food at their favorite restaurants. It is comprised of two parts, the mobile application for customers and a web application for restaurant employees. This repository is the code that makes up the mobile application. The mobile application side, lets customers create their accounts, be able to connect to local restaurants nearby, and order drinks to their desire, which then can be picked up from the bar. The OpenTab platform was built using React Native, React, NodeJS, SQL, Axios and ExpresJS. 

The restaurant GitHub repository link is: https://github.com/charliepluk/OpenTabRestaurant

## Features
1. Account Registration
2. Account Login/Logout
3. Connect/Select Restaurant
4. Browse Restaurant Menu
5. View/Edit Order
6. Checkout
7. View Order History

## Getting Started
### Installation and Setup
1. Install [Node.js](https://nodejs.org/) and [MySQL](https://www.mysql.com/downloads/) if you haven't already.
2. Copy and paste the MySQL code into your local Xamp setup to create a new database. 

		> cd Database Code
		> Copy the contents of the file
		> Paste the contents of the file in your local database code

2. Clone this repository and install its dependencies.
		
		> git clone https://github.com/charliepluk/OpenTab.git OpenTab
		> cd OpenTab
		> npm install
### Run
1. In a separate shell start expo.

		> npm start
		
2. In another separate shell start the server.

		> cd Server
		> node server.js
## Demo video


## Contributors

* Cameron Liddell, Developer
* Charlie Plukfangpanya, Developer
* Akshay Patel, Developer

