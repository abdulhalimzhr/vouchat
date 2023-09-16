## Description

This project is a live chat (web) application project that allows users to interact with other users through a chat room—built using VueJS (front-end), NodeJS (back-end), MongoDB (database), and Socket.io for real-time message delivery.

Tested on Windows 11 with Hyper-V Docker (Because WSL is too slow).

## Pre-requisites

- [NPM](https://nodejs.org/en/download)
- [Docker](https://docs.docker.com/get-docker/)
- [Make](https://www.gnu.org/software/make/manual/make.html)

## How to Run the Application

1. Make sure you have installed all of the tools mentioned in the pre-requisites section above on your local device
2. Open the terminal within this project's directory
3. Run the following command to install all project dependencies, this will take 5-10 minutes to finish. If you want to use the build public options, ensure the IP value in the `.env` is updated and accessible from LAN. Otherwise, you can use the build local option.

   - For the public (in case you want this app accessible from LAN)

   ```
    make build env=public
   ```

   <sub>Note: Please change the IP Address on the .env file to your local IP Address</sub>

   - For local

   ```
    make build env=local
   ```

4. After the setup is completed, you can access the application through http://localhost:8080

### NOTE 

There are known issues regarding refreshing the page when inside the room, it returns 404. This is most likely an error from the node.js. I have run out of time to fix this issue, so for now, this app will work only in the local environment.

## Additional Information

### Date of Submission

15 September 2023

---

### Time Spent

Detailed Dashboard: [link](https://wakatime.com/@52dc8466-d511-4812-bfed-fa756030a686/projects/kfrysihkpl?start=2023-09-09&end=2023-09-15)

[![wakatime](https://wakatime.com/badge/github/abdulhalimzhr/vouchat.svg)](https://wakatime.com/badge/github/abdulhalimzhr/vouchat)

<sub> Note: The duration might be slightly inaccurate. This is because I have renamed the project folder name from Vouch to VouChat.</sub>

---

### Assumptions Made

Based on the requirements provided, some of the assumptions made throughout the development of this project are:

- The app must be accessible by multiple users at the same time.
- The app must be able to run in any browser and any device. Therefore, I must ensure the app is responsive and compatible with multiple browsers.
- Each message sent and received must be delivered in real time.
- Since the app does not have a login or authentication feature, each user and their messages must be uniquely identifiable. Therefore, a `sessionId` is linked to every message to ensure it will only show a green color on the user that sent the message and a gray color for other users with different `sessionId.`
- A user should not be able to enter any chat room without a username, and the user must have a legitimate `sessionId` to access the chat room. Otherwise, the user will be redirected to the initial join room page.
- A user should not be able to join a chat room, e.g., "Chat Room A." if the username is already taken by another active user within the "Chat Room A."
- A user can join a chat room, e.g., "Chat Room A." using a specific username even though other users have the same username in another chat room, e.g., "Chat Room B."
- There is no limitation on how many users can join the same room.

---

### Shortcuts/Compromises Made

- To ensure that the message only shows a green color for the user that sent the message and a gray color when they see message from other users, I have implemented the `sessionId` on every message sent. To make sure that the `sessionId` is unique, I have implemented a `uuid` to generate a unique `sessionId` for every user when they join the room.
- To ensure that the `sessionId` is not changed when the user refreshes the page, I have to implemented a `localStorage` to store the `sessionId` on the user's browser.
- To secure the route/navigation, I must ensure that the user has a legitimate `sessionId` to access the chat room. Otherwise, the user will get redirected to the login page.

---

### What would be the approach to ensure the application is ready for production (testing)?

- I would implement a unit test to ensure that the app is working as expected, starting from the very unit level to ensure that any development issues can be identified as quickly as possible in the development process.
- I would implement integration testing to ensure the app is working as expected when integrated with other services.
- And last, I would like to implement end-to-end testing to ensure that the app works as expected when the user accesses it.

---

### How would I ensure a smooth user experience as 1000 users start using your app simultaneously?

- By implementing a load balancer to ensure that the app can handle multiple users simultaneously.
- Implementing a caching mechanism ensures the app can handle real-time message delivery.
- Lastly, implementing a CDN ensures that the app can run on any device.

---

### What key steps would I take to ensure application security?

- Build an Authentication such as Login email and password and implement a JWT to ensure the user is authenticated.
- Implementing a CORS ensures the app is only accessible from the allowed domains.
- By implementing a CSRF to protect the app from CSRF attacks.
- Lastly, securing the route to avoid unauthorized access to the app. For example, by implementing a middleware to ensure the user has a legitimate `sessionId` to access the chat room. Otherwise, the user will be redirected to the login page.

---

### What should I have included in this solution? Was I short on time and not able to include something?

One feature was not implemented in this solution due to short on time, which was the "typing indicator" feature. This feature should allow a user to see when others are typing a message in the room chat.

---

### Feedback on the Technical Challenge

More detailed and specific information related to the flows and requirements would be highly appreciated to better understand and implement the features.

---

### Application Preview
![image](https://github.com/abdulhalimzhr/vouchat/assets/75671219/942d8d98-01e8-4994-b0e7-7e374a2afd5c)
![photo_2023-09-16_11-14-01](https://github.com/abdulhalimzhr/vouchat/assets/75671219/e55adad4-3340-4e03-9d49-26863e6cf2c8)

https://github.com/abdulhalimzhr/vouchat/assets/75671219/db58fd9c-5434-48e3-a560-48cd1eb1ee8a

