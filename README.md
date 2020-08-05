![Build and Test](https://github.com/drphamwit/SE-SampleGithubRepo/workflows/Build%20and%20Test/badge.svg)

# OpenTab

## Introduction

OpenTab is a point of sale service that allows for customers to order beverages and food at their favorite restaurants. It is comprised of two parts, the mobile application for customers and a web application for restaurant employees. This repository is the code that makes up the mobile application. The mobile application side, lets customers create their accounts, be able to connect to local restaurants nearby, and order drinks to their desire, which then can be picked up from the bar. The OpenTab platform was built using React Native, React, NodeJS, SQL, Axios and ExpresJS. 

The GitHub repository link for the web application for the restaurant is: https://github.com/charliepluk/OpenTabRestaurant

## Features
* Account Registration
* Account Login/Logout
* Connect/Select Restaurant
* Browse Restaurant Menu
* View/Edit Order
* Checkout
* View Order History

## Getting Started
### Installation and Setup
1. Install [Node.js](https://nodejs.org/) and [MySQL](https://www.mysql.com/downloads/) if you haven't already.

2. Clone this repository and install its dependencies.
		
		> git clone https://github.com/charliepluk/OpenTab.git OpenTab
		> cd OpenTab
		> npm install
		
3. Copy and paste the MySQL code into your local Xamp setup to create a new database. 

		> cd Database Code
		> Copy the contents of the file
		> Paste the contents of the file in your local database code
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

