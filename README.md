# 📦 **Inventory API**

### Key Sections in the README:

1. **Project Overview**: Explains the purpose of the Inventory API.
2. **Setup Instructions**: Guides the user through installation, setting up environment variables, and starting the server.
3. **API Endpoints**: Lists all routes with descriptions and their usage.
4. **Technologies Used**: Briefly describes the main technologies powering the API.
5. **Testing**: How to test the API using Postman and set up environment variables.
6. **Exporting Reports**: Explains how to generate and export reports in different formats (PDF and CSV).
7. **Authentication & Authorization**: Details on JWT authentication and role-based access control.
8. **License and Contributions**: Information on contributing and licensing.

This README gives clear instructions for setting up and interacting with your **Inventory API**, making it easier for developers and users to integrate and use the system.

## **Overview**

The **Inventory API** is a backend system designed to manage inventory operations, track product stock levels, handle inventory movement logs, generate reports, and offer low-stock alerts. Built using **Node.js**, **Express.js**, and **MongoDB**, this API ensures smooth inventory management for various businesses and integrates with role-based access control for secure operations.

---

## **Features**

- 🏷️ **Product Management**: Add, update, delete, and retrieve inventory items.
- 📦 **Inventory Movement Logs**: Track and log changes in inventory levels.
- ⚠️ **Low-Stock Alerts**: Notifications for items that are low in stock.
- 📊 **Report Generation**: Generate and export inventory status reports.
- 🔐 **Authentication & Authorization**: Secure API access with JWT-based authentication.
- 🌍 **Database Integration**: Support for MongoDB database.

---

## **Getting Started**

### **1. Prerequisites**

Ensure you have the following installed:

- **Node.js**: v14 or higher.
- **npm**: v6 or higher.
- **MongoDB**: A local or cloud MongoDB instance (e.g., MongoDB Atlas).

---

### **2. Installation**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/<YourUsername>/<YourRepository>.git
   cd <YourRepository>
   ```

### **3. Install Dependencies**

Navigate to the project directory and install the required Node.js dependencies:
npm install

### **4. Set Up Environment Variables**

Create a .env file in the root directory of the project and configure it as follows:
PORT=5000
MONGO_URI=mongodb://localhost:27017/inventorydb
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=1h
ADMIN_ROLE=admin
EMPLOYEE_ROLE=employee

Explanation of Environment Variables:

    PORT: The port your API will run on (default is 5000).
    MONGO_URI: The MongoDB URI for your database (use MongoDB Atlas if you are using a cloud database).
    JWT_SECRET: A secret key used for signing JWT tokens.
    JWT_EXPIRATION: The expiration time for JWT tokens (e.g., 1h for 1 hour).
    ADMIN_ROLE: Role for admin users who can access all routes.
    EMPLOYEE_ROLE: Role for employee users with limited access.

### **5. Start the Server**

npm start

### **API Endpoints**

Authentication
Method Endpoint Description
POST /api/v1/auth/register Register a new user
POST /api/v1/auth/login Log in and receive a JWT token
GET /api/v1/auth/logout Log out and remove a JWT token
Products

Method Endpoint Description
GET /api/v1/inventory Get all inventory items
GET /api/v1/inventory/:id Get one inventory item
POST /api/v1/inventory Add a new product to the inventory
PUT /api/v1/inventory/:id Update an existing product
DELETE /api/v1/inventory/:id Delete a product from the inventory

Inventory Movement Logs
Method Endpoint Description
GET /api/v1/log Retrieve inventory movement logs
GET /api/v1/log/:id Retrieve inventory movement log
POST /api/inventory/logs Add a new inventory movement log (e.g., restock)

Low-Stock Alerts
Method Endpoint Description
GET /api/v1/low-stock Retrieve low-stock alerts

Reports
Method Endpoint Description
GET /api/v1/inventory-status Generate a report of the current inventory status
GET /api/v1/inventory-status/pdf Export the inventory status report as a PDF
GET /api/v1/inventory-statuss/csv Export the inventory status report as a CSV

Technologies Used

    Node.js: Backend runtime for building scalable applications.
    Express.js: Framework for building APIs and handling HTTP requests.
    MongoDB: NoSQL database for storing inventory data.
    JWT (JSON Web Tokens): Secure user authentication for API access.
    Mongoose: ODM for MongoDB used to interact with the database.

Exporting Reports

The API allows you to generate and export reports:

    Inventory Status: A report showing the current inventory and low-stock items.
    Export Options: You can export reports as PDF or CSV using the following routes:
        GET /api/reports/inventory-status/pdf to export as PDF.
        GET /api/reports/inventory-status/csv to export as CSV.

License

This project is licensed under the MIT License - see the LICENSE file for details.

💻 Crafted by SeriousCharProgrammer 🚀
