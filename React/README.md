# Project Overview

### Github URL

- https://github.com/rmit-fsd-2024-s1/s3939906-s4002970-a2

### Tools to be installed:

- "@testing-library/jest-dom"
- "@fortawesome/free-solid-svg-icons"
- "@fortawesome/react-fontawesome"
- "tailwindcss"
- "yup"
- "formik"
- "axios"
- "dayjs"

### routes.js

- I created a routes.js file to handle navigation using useRoutes. In the routes.js file, there are child routes, and I used <Outlet /> to ensure that the menus in the Main component are always visible when navigating between pages.

### src → pages folder & navigation handling

- Contains a total of 7 page components.
- Main component is the top-level component after App.js.
- Page transitions are managed by useRoutes and navigation.

### network forder -> http.js

- By using the HttpClient class, I reduced duplicate code when communicating with the server, making HTTP requests easier to manage and error handling more consistent. This approach results in cleaner code where server communication occurs, helps prevent mistakes, and ensures predictable and uniform results, making errors easier to control.

1. Constructor:

Accepts a baseURL to create an axios instance. This instance sets the base URL for all requests.

2. fetch Method:

An asynchronous function that takes a URL and an options object as arguments.
Sets Content-Type to application/json by default, but uses the headers provided in the options object if available.
Uses the request method of axios to send the request and handle the response.
Returns the response status and data if the request is successful.
Handles errors by returning the error status and message. It uses the message from the server if available; otherwise, it uses a default message. If there is an error type, it returns the type as well.

### src → context folder

1. AuthProvider.js

- Contains AuthProvider.js, which manages user login, signup, and related user data information.
- Holds a list of information for all users registered on SOIL, as well as data for the currently logged-in user, handling modifications, deletions, etc.
- Functions for modifying user information across different components are processed here to centralize user data handling.

2. ProductProvider.js

- I created a Product Context to fetch product information from the database. This context is responsible for retrieving the products and storing them in the state, allowing child components to access the state without prop drilling.
- The reason for this approach is that the product information is essential for various components, such as Cart and Review, making it a crucial piece of data that is used across multiple parts of our website.

3. CartProvider.js

- CartProduct.js is a context that holds and manages all the user's cart information.
- It handles fetching product information, updating quantities, and deleting products.
- Additionally, it includes the addToCart function, which is used to add products to the cart
- This function can be accessed through the context on the Products page, allowing users to add items to the cart.
- By centralizing product handling within this context, it effectively fulfills its role.

### src → components folder

- Contains various components such as Bill, Login, Sign Up, ImgSlider, UserProfileForm, Modal, ProductDetail, etc.
- Each component is appropriately placed and utilized within pages.
- Components were created for reusable parts or sections that could be independently developed.

### Styling

- Tailwind CSS is used for styling.
- Header, body, and footer elements are provided on the main page, along with navigation functionality implemented through tab menus.

### Signup / Login

- In SignUp.js, users are required to provide their email, name, and password, and to re-enter the password in a confirm password field to prevent mistakes. We used Yup and Formik for validation during the sign-up process. The email, username, and password are sent to the database, where the password is hashed and duplicate email and username checks are performed. If all checks pass, the information is stored in the Users table in the database.

- In Login.js, we also used Yup and Formik for validation. After sending the email and password information to the server, the server checks the Users table for matching information. If a match is found, bcrypt compare is used to compare the password with the hashed password. If the information is correct, the login is successful. Additionally, a "remember me" button is provided; if this button is checked and the login is successful, the email is stored in localStorage so that the email information is displayed when the user attempts to log in again after logging out.

### MyPage ( Profile and Profile management feature )

- Upon login, the "Login/SignUp" menu tab is replaced with a menu tab containing the user's name, which redirects to "My Page".
- Users can edit email, name and password by clicking on the pencil icon in "My Page". and also check if duplicated email,name is or not from server. if nothing is written in input, return alert message to make them fill in the blank.
- Logout and delete user buttons are provided if the user doesn't click the edit profile icon. Both functions are handled within AuthProvider.js.
- Deleting a user removes their data from userData state and DB User and and also remove token in localStorage.

### Products (show all products, special products)

- The Products page displays all SOIL products and special items.
- Clicking on each image allows users to view a detailed page for that product.
- If the product has best reviews, the number of these reviews is displayed, and clicking the best review button lets users see the details of these reviews.
- Lastly, the page provides the functionality to add both regular and special products to the cart. If the product is already in the cart, the server handles increasing the quantity of that product.

### Cart

- Clicking "Add to Cart" on the Product page adds items to the DB Cart and user's cart in db can be called and saved in cartProducts state whenever refreshed.
- The number of items in the cart is displayed on the tab menu, and adding the same product increases the quantity rather than adding it again.
- Cart Page shows all user's cart list
- Users can increase, decrease, or remove items, with the total cost updated accordingly. All actions are also applied to the CartItem information and DB.
- Checking out clears all CartItem information and remove it from Cart db.

### Reviews

- User can create reviews about products but no reviews are, it shows appropriate message to user.
- if they are not soil's user or didn't login, they can't see create button in Review page.

- Users can view information about the product, the review content, and the user who wrote the review. By clicking ViewDetail, they can navigate to the detailed page of the review. If the logged-in user is the author of the review, they can see and use the edit and delete buttons; otherwise, these buttons are not visible.

- When creating a review, users must provide a title, rating, product, and content, with the content being limited to 100 characters. A review cannot be created if any of these fields are missing. After creating a review, users are redirected back to the review list page.

- In the review list, users can follow the author of a review by clicking the heart button. When a user is followed, the heart icon is filled in; clicking it again will unfollow the user, and the heart icon will be unfilled.

- Clicking on each user's image in the review list allows users to see the number and names of users currently following that user.

- If a review has been blocked by an administrator, it will be blurred, and the UI will display \***_ This review has been deleted by the admin _**. Clicking on the review will not provide any information about it.
