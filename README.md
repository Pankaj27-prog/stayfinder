# 🏨 StayFinder - Hotel Booking Platform

A full-stack hotel booking application built with React frontend and Express.js backend.

## ✨ Features

- **🏠 Room Selection**: Browse and select from various hotel rooms
- **📅 Date Booking**: Choose check-in and check-out dates
- **💰 Real-time Pricing**: Dynamic price calculations based on dates and guests
- **🛒 Shopping Cart**: Add rooms to cart with quantity management
- **👤 User Authentication**: Register and login functionality
- **📱 Responsive Design**: Works on desktop and mobile devices
- **🎨 Modern UI**: Clean and intuitive user interface

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **React Router** - Navigation
- **CSS3** - Styling
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pankaj27-prog/stayfinder.git
   cd stayfinder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. **Start the development server**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start them separately
   npm start          # Frontend (React)
   npm run server     # Backend (Express)
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📁 Project Structure

```
stayfinder/
├── public/                 # Static files
├── src/                    # React frontend
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── context/           # React context
│   └── assets/            # Images and assets
├── server/                # Express backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── index.js           # Server entry point
├── package.json           # Dependencies and scripts
└── README.md             # Project documentation
```

## 🌐 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login

### Bookings
- `POST /api/book` - Create a new booking

## 🚀 Deployment

### Deploy on Render

1. **Fork this repository** to your GitHub account

2. **Sign up for Render** at [render.com](https://render.com)

3. **Create a new Web Service**
   - Connect your GitHub repository
   - Choose the repository
   - Set build command: `npm install`
   - Set start command: `npm run server`
   - Add environment variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: A secure random string
     - `NODE_ENV`: production

4. **Deploy the frontend**
   - Create another Web Service
   - Set build command: `npm install && npm run build`
   - Set static publish path: `./build`

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `PORT` | Server port (default: 5000) | No |
| `NODE_ENV` | Environment (development/production) | No |

## 📱 Features Demo

- **Home Page**: Browse featured hotels
- **Booking Page**: Select rooms, dates, and guests
- **Cart Page**: Review and manage bookings
- **Authentication**: Register and login

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Pankaj Sarwa**
- GitHub: [@Pankaj27-prog](https://github.com/Pankaj27-prog)

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database solution
- Render for the seamless deployment platform

---

⭐ **Star this repository if you found it helpful!**
