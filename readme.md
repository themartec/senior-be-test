## Test 1

This project includes a frontend and a backend service. Docker Compose is used to manage and run these services in
isolated containers.
****

## Prerequisite:

Ensure you have the following installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Node.js v20 (if want to build source)

****

## Project Structure

- `martec-fe/` - Contains the frontend application built with Vite and Vue.js.
- `martec-be/` - Contains the backend application built with Node.js and Express.

****

## Running the Application

Follow these steps to build and run the application using Docker Compose:

**1. Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

**2. Build and Start the Containers**

   ```bash
   docker-compose up --build
   ```

**3. Access the Application**

* Frontend: Open your web browser and navigate to http://localhost:5173 to access the frontend application.
* Backend: The backend service will be available at http://localhost:3000.

**4. Others**

* You can modify the env variable inside `docker-compose.yml` file to change the setup

******

## Technical note

### Oauth 2.0 flow

1. User don't have cookie, or refresh_token expired

![img.png](pic/oauthflow.png)

### Choose the database design

Since the integration might be expands and will have lot more thing to consider other than `accessToken`
or `refreshToken`.
So the table will have kind of unique design to comprehend that (picture bellow)

It should be in NoSQL database but for now im only using SQlite as main database for simplicity

Every time user request with `userID` bind in cookies, we can get which integration type are enable for that user,
So if 1 user (email) connect to 1 or 2 or how many platform, FE can still render the feature base on that,

Api is secure by default since it need signed cookies to actually get the logged-in user metadata

#### Example:

- User sangpd connect to 2 platform, He can show both platform resource's
- He wants to disconnect google, we only need `DELETE * FROM metadata WHERE user_id = ? AND type = 'GOOGLE'`, after that
  the FE will no longer render resource of Google
- If he wants connects again, just click `Login with` and begin oauth2 flow again
- ...

![img.png](pic/flow1.png)