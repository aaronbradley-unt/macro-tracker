Macro tracker- A web application that tracks macronutrient intake in a diet. Student project @ UNT Software Engineering course.

Features:
-User authentication (login/signup) via Firebase
-Add and log meals with nutritional information
-View meals and daily macronutrient totals
-Data stored in Firebase Firestore

tech stack:
-Frontend: React
-Backend: Firebase (Firestore, Authentication)
-Styling: CSS
-Package Manager: npm

File Structure:

macro-tracker/
├── node_modules/ # Installed project dependencies
├── public/ # Static files (index.html, favicon)
├── src/ # All React components and logic
│ ├── App.js # Main React component
│ ├── App.css # Styles for App.js
│ ├── index.js # Entry point for React app
│ ├── firebase.js # Firebase configuration and service exports (db, auth)
│ ├── testFirebase.js # Example/test functions for Firestore (add/fetch data)
│ └── components/ # Optional folder for additional components (MealForm.js, MealList.js, Login.js)
├── package.json # Project metadata, dependencies, scripts
├── .gitignore # Files/folders to ignore in Git
└── README.md # Project explanation and instructions

project setup:

git clone https://github.com/aaronbradley-unt/macro-tracker.git

cd macro-tracker

npm install

npm start
-(opens app in https://localhost:3000)






