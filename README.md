🧳 Wanderlust
A full-featured Airbnb-style travel and stay booking web application built with Node.js, Express, MongoDB, and EJS. Wanderlust allows users to explore listings, write reviews, register/login, and more.

🌐 Live Demo
🔗 Deployed Link [https://wonderlust-x2v6.onrender.com]

📂 Table of Contents
Features

Screenshots

Tech Stack

Installation

Usage

Project Structure

Contributing

License

✨ Features
🔒 User Authentication (Passport.js)

🏘️ Add/Edit/Delete Listings

⭐ Review System

📸 Image Upload (Cloudinary or Local)

📍 Google Maps Integration (optional)

🗂 Flash Messages for success/errors

🎨 Responsive and modern UI

🖼️ Screenshots
Add your app screenshots here (optional):

swift
Copy
Edit
📷 public/screenshots/login-page.png
📷 public/screenshots/listing-page.png
⚙️ Tech Stack
Backend: Node.js, Express.js

Frontend: EJS, Bootstrap

Database: MongoDB, Mongoose

Auth: Passport.js, express-session

Tools: dotenv, connect-flash, method-override, connect-mongo

🛠️ Installation
Clone the repo

bash
Copy
Edit
git clone https://github.com/yourusername/wanderlust.git
cd wanderlust
Install dependencies

bash
Copy
Edit
npm install
Setup .env file

env
Copy
Edit
ATLASDB_URL=your-mongodb-url
SECRET=your-session-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
Run the app

bash
Copy
Edit
npm start
🚀 Usage
Visit http://localhost:8080

Register or Login

Browse listings, add new ones, leave reviews, etc.

🗂 Project Structure
arduino
Copy
Edit
wanderlust/
├── models/
├── routes/
├── views/
├── public/
├── controllers/
├── app.js
├── .env (ignored)
└── .gitignore
🤝 Contributing
Feel free to fork this repo, make improvements, and open a PR!
Please open an issue for bugs or feature requests.

📜 License
MIT License © 2025 Your Name
