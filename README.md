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

- If you want to use the build public options, make sure the IP value in the `.env` is updated and accessible from LAN. Otherwise, you can use the build local option.

---

### Date of Submission

> 15 September 2023

---

### Time Spent

[![wakatime](https://wakatime.com/badge/user/52dc8466-d511-4812-bfed-fa756030a686/project/3dbcaaf2-b071-4d74-b73d-8b4a06daf5f2.svg)](https://wakatime.com/badge/user/52dc8466-d511-4812-bfed-fa756030a686/project/3dbcaaf2-b071-4d74-b73d-8b4a06daf5f2)

[Details](https://wakatime.com/@52dc8466-d511-4812-bfed-fa756030a686/projects/kfrysihkpl?start=2023-09-09&end=2023-09-15)

<sub>The duration might be showed up as 0 sec, this is because i have renamed it from vouch to VouChat.</sub>

---

### Assumptions Made

Because of the requirements are only a few, so i have to made some assumptions when build this app. Here are the assumptions that i made:

- The app will be used by multiple users, so i have to make sure that the app is able to handle multiple users at the same time.
- The app will be reload a new message in real-time, so i have to make sure that the app is able to handle real-time message delivery.
- Because the app is don't have any login or authorization feature, i have implement a `sessionId` to every messages to make sure it will only shows green color on the user that sent the message, and gray color on the other users.
- I have to make sure this app is able to run on any device, so i have to make sure that the app is responsive and mobile friendly.
- The navigation is must be strict. So, i have to make sure that the user can't access the chat room without a username, the user can't access the chat room if the username is already taken by another user, and the user must has legitimate `sessionId` to access the chat room. Otherwise, the user will be redirected to the login page.

---

### Shortcuts/Compromises Made

- I have implement the `sessionId` on the every messages sent, because i have to make sure that the message is only shows green color on the user that sent the message, and gray color on the other users. But, i have to make sure that the `sessionId` is unique, so i have to implement a `uuid` to generate a unique `sessionId` for every users when they join to the room. Also, i have to make sure that the `sessionId` is not changed when the user refresh the page, so i have to implement a `localStorage` to store the `sessionId` on the user's browser. And to secure the route/navigation, i have to make sure that the user must has legitimate `sessionId` to access the chat room. Otherwise, the user will be redirected to the login page.

---

### What would be the approach to ensure the application is ready for production (testing)?

- I would like to implement a unit testing to make sure that the app is working as expected.
- Also i would like to implement a integration testing to make sure that the app is working as expected when it's integrated with other services.
- And the last, i would like to implement a end-to-end testing to make sure that the app is working as expected when it's accessed by the user.

### How would I ensure a smooth user experience as 1000’s of users start using your app simultaneously?

- I would like to implement a load balancer to make sure that the app is able to handle multiple users at the same time.
- Also i would like to implement a caching to make sure that the app is able to handle real-time message delivery.
- And the last, i would like to implement a CDN to make sure that the app is able to run on any device.

### What key steps would I take to ensure application security?

- I would start from build an Authentication such as Login email and password, and implement a JWT to make sure that the user is authenticated. Then, i would like to implement a CORS to make sure that the app is only accessible from the allowed domains. And the last, i would like to implement a CSRF to make sure that the app is protected from the CSRF attacks.
- Also i would secure the route to avoid unauthorized access to the app. For example, i would like to implement a middleware to make sure that the user must has legitimate `sessionId` to access the chat room. Otherwise, the user will be redirected to the login page.

### What did I not include in this solution? Was I short on time and not able to include something?

- I was trying to implement the typing indicator feature. The mechanism is when the user is typing, the other users will see a typing indicator on the user that is typing. But, i was short on time and not able to include it.

### Feedback on the Technical Challenge

Please be more detail and more specific on the flows and requirements, so i can understand the requirements and implement the features better.
