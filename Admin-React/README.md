# Project Overview

### Github URL

- https://github.com/rmit-fsd-2024-s1/s3939906-s4002970-a2

### Tools to be installed:

- @mui/material @emotion/react @emotion/styled
- @mui/x-data-grid
- subscriptions-transport-ws
- recharts
- @apollo/client
- graphql
- bad-words

# Admin Dashboard for SOIL Website

This is the admin dashboard for the SOIL website, built using React and GraphQL. It provides features for managing users, products, and reviews.

## Features

### User Management
- Display a list of all users
- Block or unblock a user
- Real-time updates when a user is blocked or unblocked

### Product Management
- Display a list of all products
- Add a new product
- Edit an existing product
- Delete a product
- Real-time updates when a product is added, edited, or deleted

### Review Management
- Display a list of recent reviews
- Delete inappropriate reviews
  > Use the 'bad-words' library to automatically block abusive reviews. Blocked reviews are marked with a red background and can be found on the reviews page. 
- Real-time updates when a new review is added or deleted

### Review Metrics
- Display the average rating of all reviews
- Display the total number of reviews
- Real-time updates of the metrics when a new review is added or deleted

## Technologies Used
- React
- Apollo Client
- GraphQL
- Material-UI

## Setup and Installation
1. Clone the repository
2. Install dependencies using `npm install`
3. Start the development server using `npm start`
4. Open the admin dashboard in your browser at `http://localhost:3000`
5. Admin-Server starts with the `node index.js` command

## Folder Structure
- `src/` - Contains the source code for the admin dashboard
  - `components/` - Contains reusable components used throughout the dashboard
  - `pages/` - Contains the main pages of the dashboard
    - `Users.js` - User management page
    - `Products.js` - Product management page
    - `Reviews.js` - Review management page
    - `Main.js` - Main dashboard page
  - `App.js` - Main App component
  - `index.js` - Entry point of the application
- `public/` - Contains public assets and HTML template
- `package.json` - Project configuration and dependencies

## GraphQL API
The admin dashboard communicates with a GraphQL API to fetch and modify data. The API is implemented using Apollo Server and Express.

### Queries
- `users` - Retrieves a list of all users
- `reviews` - Retrieves a list of reviews (accepts `limit` and `order` arguments)
- `products` - Retrieves a list of all products

### Mutations
- `blockUser` - Blocks a user
- `unblockUser` - Unblocks a user
- `createReview` - Creates a new review
- `deleteReview` - Deletes a review
- `createProduct` - Creates a new product
- `updateProduct` - Updates an existing product
- `deleteProduct` - Deletes a product

### Subscriptions
- `newReview` - Subscribes to new review events

## Moderation and Metrics
The admin dashboard includes a moderation feature that displays the most recent reviews submitted by users, showing the latest three reviews in real-time. It also presents two metrics related to reviews:
- Average Rating: Displays the average rating of all reviews
- Review Count: Displays the total number of reviews

These metrics are updated in real-time as users interact with the site.

The moderation feature and metrics provide valuable insights into user engagement and help administrators monitor and manage user-generated content effectively.

## Explanation of Chosen Metrics
The chosen metrics, Average Rating and Review Count, were selected because they provide important information about the overall sentiment and engagement of users with the products.

- Average Rating: This metric gives a quick overview of how positively or negatively users perceive the products. It helps administrators gauge customer satisfaction and identify products that may need improvement.
- Review Count: This metric indicates the level of user engagement and the popularity of the products. A high review count suggests that users are actively participating and sharing their opinions, which can be valuable for making informed decisions about product management and marketing strategies.

By displaying these metrics in the admin dashboard, administrators can easily monitor and analyze user feedback, make data-driven decisions, and take appropriate actions to enhance the user experience and improve product quality.