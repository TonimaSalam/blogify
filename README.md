#Blogify   
A robust Blog APP, enables users to efficiently manage accounts and Blogs. Proficient in account creation, updates and delete. Also provides features - create, read, update and delete blogs.  

##Features  
-**Authentication:** Secure endpoints using JSON Web Tokens (JWT) for user authentication.  
-**CRUD Operations:** Allows Create, Read, Update, and Delete operations for user and blog.  
-**Validation:** Input validation(username,password,email,reqest body) to ensure data integrity and security.  
-**Authorization:** Role-based access control to restrict access to certain endpoints.Only registered user can create blog and only author can update and delete blog.  
-**Database Integration:** Interacts with a database(MySQL) to store and retrieve users and blogs.  
-**Content Negotiation:** User can request data in json,html,xml and text formats.  
-**Pagination:** Implemented server side pagination.  
-**Type Safety:** Frontend is developed with TypeScript to ensure type safety.  
-**Component-Based Architecture:** Organized into reusable components for maintainability and scalability.  
-**State Management:** Employs state management library(React Context API) for managing application state.  
-**Routing:** Implements client-side routing using React Router for navigation between different views.  
-**RESTful API:** Provides a RESTful API interface for communication with the frontend.  
-**Integration with Backend:** Communicates with the backend server to fetch and display blog posts and comments.  

##Tool & Technology  
**Backend:** JavaScript, Node.js, Express.js, MySQL.  
**Frontend:** React, TypeScript, Tailwind CSS.  
**Testing:** Jest.  

##Setup  
**Clone Repository:** Clone this repository to your local machine.  
To set up the backend on your local machine, follow these steps:  
1. **Install Dependencies:** Navigate to the project backend directory and install dependencies using "npm i".  

2. **Environment Variables:** Create a `.env` file in the root directory and add the necessary environment variables.  

DB_NAME = your database name  
DB_USERNAME = your username  
DB_PASSWORD = your password  
DB_LOCALHOST=localhost  
PORT =4000  
JWT_SECRET_KEY = your secrect key  

3. **Start the Server:** Run the server using "npm start"  

To set up the frontend on your local machine, follow these steps:  

1. **Install Dependencies:** Navigate to the project directory and install dependencies using "npm i".  
2. **Start the Development Server:** Run the development server using "npm run dev"   

##End Points  
-**To go to Home (localhost:4000/api/v1/)**  
Method: GET  
Headers:  
accept: application/json   
Req body: no request body required  
-**To register new user (localhost:4000/api/v1/register )**  
Method: POST  
Headers:  
accept: application/json  
Req body:  
{  
    "username" : "user1",  
    "useremail" : "user1@gmail.com",  
    "password" : "User1@1234"  
}  
**Note:** Password should contain at least 8 characters and at least one letter, number and special character (@ or # or &)  
-**To login (localhost:4000/api/v1/login)**  
Method: POST  
Headers:  
accept: application/json  
Req body:  
{  
    "username" : "user1",  
    "password" : "User1@1234"  
}  
-**To get user info (localhost:4000/api/v1/user)**  
Method: GET  
Headers:  
accept: application/json  
authorization: “JWT token”  
Req body: no request body required  
-**To edit user info (localhost:4000/api/v1/user)**  
Method: PATCH  
Headers:  
accept: application/json  
authorization: “JWT token”  
Req body:  
{  
    "newPassword" : "mahadi@234",  
    "oldPassword" : "mahadi@234"  
}  
-**To delete user (localhost:4000/api/v1/user)**  
Method: DELETE  
Headers:  
accept: application/json  
authorization: “JWT token”  
Req body: no request body required.  
-**To get all blogs (localhost:4000/api/v1/blog)**  
Method: GET  
Headers:   
accept: application/json  
Req body: no request body required.  
-**To get all blogs by a author (localhost:4000/api/v1/blog/author/:authorID)**
Method: GET  
Headers:  
accept: application/json  
Req body: no request body required.  
-**To get blog by id (localhost:4000/api/v1/blog/:blogID)**  
Method: GET  
Headers:  
accept: application/json  
Req body: no request body required.  
-**To get all blogs-Paginated (localhost:4000/api/v1/blog/:noOfContent/:pageNo)**  
Method: GET  
Headers:  
accept: application/json  
Req body: no request body required.  
-**To create blog (localhost:4000/api/v1/blog)**  
Method: POST  
Headers:   
accept: application/json  
authorization: “JWT token”  
Req body:  
{  
    "title" : "blog title",  
    "content" : "blog content"  
}  
-**To update blog (localhost:4000/api/v1/blog/:blogID)**  
Method: PATCH  
Headers:   
accept: application/json  
authorization: “JWT token”  
Req body:  
{  
    "title" : "blog title",  
    "content" : "blog content"  
}  
**Note:** You can change either title or content or both.  
-**To delete blog (localhost:4000/api/v1/blog/:blogID)**  
Method: DELETE  
Headers:  
accept: application/json  
authorization: “JWT token”  
Req body: no request body required.  



