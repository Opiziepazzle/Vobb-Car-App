 # 🚗 Car Dealership RESTful API

A simple RESTful API built with **Node.js**, **Express**, **TypeScript**, and **MongoDB** for managing cars, categories, and customers.

## 🧰 Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB
- JWT (Authentication)
- Jest + Supertest (Testing)
- Postman (API Documentation)

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/opiziepazzle/Vobb-Car-App.git

cd car-app

# Install dependencies
npm install

⚙️ Setup
Create a .env file in the root directory:
MONGODB_URI=mongodb://localhost:27017/car_dealership
JWT_KEY=your_jwt_secret

🚀 Running the Server
# Development mode
npm run dev

# Build and run (production)
npm run build
npm start

✅ Running Tests
npm run test


📁 Project Structure
car-app/
src/
├── config/
│   └── db.ts
├── controllers/
│   ├── authController.ts
│   └── carController.ts
├── middlewares/
│   ├── authMiddleware.ts
│   └── errorMiddleware.ts
├── models/
│   ├── Car.ts
│   ├── Category.ts
│   └── Manager.ts
├── routes/
│   ├── authRoutes.ts
│   └── carRoutes.ts
├── tests/
│   └── car.test.ts
├── app.ts
└── server.ts



🔑 Authentication
Authentication is done via JWT. To access protected routes like POST /api/cars, include your token in the Authorization header:
Authorization: Bearer <your-token>


📘 API Endpoints
🧑‍💼 Auth Routes
| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | /api/auth/register | Register a manager  |
| POST   | /api/auth/login    | Login and get token |

🚗 Car Routes
| Method | Endpoint  | Description                 | Protected |
| ------ | --------- | --------------------------- | --------- |
| POST   | /api/cars | Add a new car               | ✅         |
| GET    | /api/cars | Get all cars (with filters) | ❌         |


🔍 Car Query Filters
You can use the following query parameters with GET /api/cars:

brand: Filter by brand

model: Filter by model

availability: true/false

minPrice: Minimum price

maxPrice: Maximum price

page: Pagination (default 1)

limit: Items per page (default 10)


📄 Postman Documentation
👉 Click here to view the Postman API Collection

☁️ Live API
👉 Live API on Render


👨‍💻 Author
Adigun Hakeem Opeyemi

📜 License
MIT



