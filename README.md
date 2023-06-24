# CowboysinaRanch

Cowboys in a Ranch is a web application that allows users to share their thoughts and react to them. It provides functionality to create users, create thoughts, add reactions to thoughts, and manage user relationships.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

## Features
- User registration and authentication
- Create, read, update, and delete thoughts
- Add reactions to thoughts
- Manage user relationships (add friends, remove friends)

## Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd cowboys-in-a-ranch`
3. Install the dependencies: `npm install`

## Usage
1. Ensure MongoDB is running on your local machine or update the MongoDB connection URL in `server.js`.
2. Start the application: `npm start`
3. Access the application in your browser at: `http://localhost:3000`

## API Routes
- `/api/users`
  - `GET /` - Get all users
  - `GET /:id` - Get a user by ID
  - `POST /` - Create a new user
  - `PUT /:id` - Update a user by ID
  - `DELETE /:id` - Delete a user by ID
  - `POST /:userId/friends/:friendId` - Add a friend to a user's friend list
  - `DELETE /:userId/friends/:friendId` - Remove a friend from a user's friend list

- `/api/thoughts`
  - `GET /` - Get all thoughts
  - `GET /:id` - Get a thought by ID
  - `POST /` - Create a new thought
  - `PUT /:id` - Update a thought by ID
  - `DELETE /:id` - Delete a thought by ID
  - `POST /:thoughtId/reactions` - Add a reaction to a thought
  - `DELETE /:thoughtId/reactions/:reactionId` - Remove a reaction from a thought

## Contributing
Contributions are welcome! If you'd like to contribute to the project, please follow these steps:
1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Commit your changes
4. Push the branch to your forked repository
5. Submit a pull request

## License
This project is licensed under the [MIT License](LICENSE).
