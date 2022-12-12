# Project: Assignment from BSport

This project is the result of an assignment given by BSport.

## Purpose

The purpose of this project is to build a calendar on which activities' offers retrieved from BSport's staging API are displayed. This requires to fetch not only the offers from the API, but also the establishments, meta activites and coaches of these offers, as well as the bookings related to this offer.

All the offers retrieved are the offers from the company whose id is 6 (which is fictitious). The logo and the favicon were both generated online, and are not supposed to refer to any existing company.

## Solution provided

For this project, I decided to split the screen in two parts.
* The first part, on the left, is the list of offers with a date filter and a pagination that enables the user to fetch more offers if they wish to.
* The second part, on the right (or as a Modal on mobile, where the width is limited), only appears when one specific offer is selected from the left part, and contains all the details related to this offer.

# Running the project

To run the project, you just need to clone it and launch the following commands:
* `yarn` to install the packages
* `yarn start` to launch the project, which is by default running on port 3000.