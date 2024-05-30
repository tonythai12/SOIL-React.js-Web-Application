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

- Created and defined a route file for navigation handling. Initially attempted to define children elements using `<Outlet/>`, but found handling tab navigation via state more efficient except for a few parts.

### src → pages folder & navigation handling

- Contains a total of 7 page components.
- Main component is the top-level component after App.js.
- Page transitions are managed within Main.js using state.
- While routing for page transitions was an option, handling common values directly through state navigation seemed less cumbersome compared to creating a context. Thus, navigation handling via state was implemented for menu tab movement.

### public → json file

- Due to the absence of a database, information required for a shopping mall such as products, sales, and diet plans are stored in JSON format. Data is fetched using useEffect and stored in state upon initial rendering.

### src → context folder

- Contains AuthProvider.js, which manages user login, signup, and related user data information.
- Holds a list of information for all users registered on SOIL, as well as data for the currently logged-in user, handling modifications, deletions, etc.
- Functions for modifying user information across different components are processed here to centralize user data handling.

### src → components folder

- Contains various components such as Bill, Login, Sign Up, ImgSlider, UserProfileForm, Modal, ProductDetail, etc.
- Each component is appropriately placed and utilized within pages.
- Components were created for reusable parts or sections that could be independently developed.

### Styling

- Tailwind CSS is used for styling.
- Header, body, and footer elements are provided on the main page, along with navigation functionality implemented through tab menus.

### Login / Signup

- Signup requires users to input name, email, and password. Checks are implemented for email format, password length, and duplicate emails.
- Upon signup, user data is stored as an array element in localStorage and userDataList state, managed within AuthProvider.js.
- Successful login redirects users to the main page, while after logging in, users are redirected to "My Page".

### Profile and Profile management feature

- Upon login, the "Login/SignUp" menu tab is replaced with a menu tab containing the user's name, which redirects to "My Page".
- Users can edit name, address, and password (except email) by clicking on the pencil icon in "My Page".
- Logout and delete user buttons are provided if the user doesn't click the edit profile icon. Both functions are handled within AuthProvider.js.
- Deleting a user removes their data from userDataList, userData, and localStorage, logging them out and redirecting to the main page.

### Organic product specials & small-scale farming

- Clicking on buttons containing the names of six vegetables provides users interested in growing those crops with tips and cultivation methods. Special sale items related to the selected crops are displayed at the bottom.
- Clicking "Choose your preference" in the top right allows users to select their preferred vegetables, which are stored in localStorage, with a checkmark displayed on the buttons.
- Once users select their preferred vegetables, relevant information is displayed. If no vegetables are selected, tomato information is provided by default.

### Shopping cart

- Clicking "Add to Cart" on the Product page adds items to the cart, using the user's email as a key to store an array of items in the cart. When logged in, the cart is maintained using the email as the key.
- The number of items in the cart is displayed on the tab menu, and adding the same product increases the quantity rather than adding it again.
- Users can increase, decrease, or remove items, with the total cost updated accordingly. All actions are also applied to the CartItem information.
- Checking out clears all CartItem information. Future plans involve creating a separate component to store checkout bill information and implementing a payment system.

### Diet Plan

- Clicking "Create your profile" allows users to set age, height, weight, eating habits, and goals through a modal.
- Upon submitting, the information is stored in localStorage and userData, and a suitable diet plan is provided based on goals and eating habits.
- Currently, the plan is determined by extracting keywords from the user's input goals. User plans are also stored in localStorage, userData, and userDataList, and if available, the corresponding diet plan is immediately displayed.
