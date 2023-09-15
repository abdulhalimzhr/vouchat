## Description

This is a live chat (web) application that allows users to interact with other users through a chat room. Built using VueJS (front-end), NodeJS (back-end), MongoDB (database), and Socket.io for real-time message delivery.

## Pre-requisites

- [NPM](https://nodejs.org/en/download)
- [Docker](https://docs.docker.com/get-docker/)
- [Make](https://www.gnu.org/software/make/manual/make.html)

## How to Run the Application

1. Make sure you have installed all of the tools mentioned in the pre-requisities section above in your local device
2. Open terminal within this project directory and run the following command to install all of the project dependencies which will take around 5-10 minutes to finish

   - For public (_in case you want to this app accessible from LAN_)
     ```
     make build env=public
     ```
     <sub>Note: Please change the IP Address on the .env file to your local IP Address</sub>
   - For local
     ```
     make build env=local
     ```

3. After the setup is done, the application can now be accessed through http://localhost:8080

## Additional Information

### Date of Submission

> 15 September 2023

### Time Spent

> 2 Days

### Assumptions Made

>

### Shortcuts/Compromises Made

>

### What would be the approach to ensure the application is ready for production (testing)?

>

### How would I ensure a smooth user experience as 1000’s of users start using your app simultaneously?

>

### What key steps would I take to ensure application security?

>

### What did I not include in this solution? Was I short on time and not able to include something?

>

### Feedback on the Technical Challenge

>
