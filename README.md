# ChatApp

ChatApp is a real-time chat application that allows users to communicate with each other.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time chat with multiple rooms.
- User authentication and authorization.
- Emojis for adding fun and expression to your messages.
- Room limit settings to control how many users can join a room simultaneously.
- Real-time communication powered by Socket.io.

## Technologies Used

### Frontend

- **React**: The JavaScript library for building user interfaces.
- **Material-UI**: A popular React UI framework for creating beautiful and responsive designs.
- **Emoji-Mart**: A library for easily adding emojis to your chat application.
- **Axios**: A promise-based HTTP client for making API requests.
- **React-Query**: A library for managing, caching, and syncing server state in React applications.
- **React-Router-DOM**: Used for handling routing in the React application.

### Backend

- **Node.js**: A runtime environment for running JavaScript on the server.
- **Express.js**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing user data and chat history.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB.
- **Jsonwebtoken**: Used for generating JSON Web Tokens for user authentication.
- **Crypto**: Used for encryption and secure data handling.

## Installation

1. Clone the repository: `git clone https://github.com/issaMbarki/chatapp.git`
2. Navigate to the project directory: `cd chatapp`
3. Install dependencies: `npm install`
4. Set up environment variables:

   - Create a `.env` file in both the client and backend directory.
   - Add the following variable for the client directory:

     ```
     REACT_APP_SERVER_URI = your_backend_uri
     ```

   - Add the following variables for the backend directory:

     ```
     MONGO_URI = your_mongodb_uri
     JWT_SECRET_KEY = your_secret_jwt_key
     FRONT_SERVER_URI = your_frontend_uri
     ```
 

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b new-feature`
3. Make your changes and commit them: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin new-feature`
5. Open a pull request, describing your changes in detail.

## License

This project is licensed under the [MIT License](LICENSE).
