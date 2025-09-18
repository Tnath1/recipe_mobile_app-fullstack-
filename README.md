# Recipe Mobile App 

A Fullstack Recipe Mobile App built with **React Native (Expo)** for the mobile frontend and **Node.js + Express + PostgreSQL** for the backend.  
Users can browse recipes, view details, add/remove favorites, and open video or web tutorials.

---

## 🚀 Features
- Browse and view recipe details
- Search recipes by title
- Add recipes to favourites
- Remove recipes from favourites
- Embedded video/tutorial using WebView
- Tab-based navigation (Expo Router)
- Mobile-first UI with gradients and icons

---

## 🛠️ Tech Stack

**Frontend (mobile)**
- React Native (Expo)
- Expo Router
- React Navigation
- react-native-webview
- @expo/vector-icons

**Backend**
- Node.js
- Express
- Drizzle ORM (if used) / or Mongoose (if used)
- PostgreSQL or MongoDB (depending on your backend setup)

---

## Project Structure

```text
RECIPE_MOBILE_APP/
│
├── backend/                # Backend (Node.js + Express)
│   ├── src/                # Backend source code (controllers, routes, models)
│   │   ├── config/         # Config files
│   │   ├── db/             # DB connection & migrations
│   │   └── server.js       # Backend entry point
│   ├── drizzle.config.js   # Drizzle ORM config (if used)
│   ├── package.json
│   └── .env                # Backend environment variables
│
└── mobile/                 # Frontend (Expo React Native app)
    ├── app/                # Screens and navigation (Expo Router)
    │   ├── (auth)/         # Authentication routes
    │   ├── (tabs)/         # Tab navigation (favourites, search, etc.)
    │   └── recipe/         # Recipe screens (detail, list)
    ├── assets/             # Images, fonts, static files
    ├── components/         # Reusable UI components
    ├── constants/          # constants (api.ts, colors.js)
    ├── hooks/              # Custom hooks
    ├── services/           # API service helpers
    ├── package.json
    └── .env                # Frontend environment variables

```

## Technologies Used

- **Frontend:** React Native (Expo), Expo Router, Axios, CSS(raw)  
- **Backend:** Node.js, Express.js, PostgreSQL
- **Authentication:** Clerk 
- **State Management:** React hooks / Context API  

---

## Future Improvements

- Push notifications for new recipes  
- Offline mode support  
- Meal planning & shopping list  
- Social features (share recipes with friends)  

---

##  Contact

If you have any questions or suggestions, feel free to reach out:  

- Email: aromejonathanu@gmail.com  

