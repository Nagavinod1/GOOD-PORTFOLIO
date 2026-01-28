# Firebase Database Setup Guide for Your Portfolio

## 🔥 Quick Setup Instructions

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** (or "Add project")
3. Enter a project name (e.g., "nagavinod-portfolio")
4. Disable Google Analytics (optional, not needed)
5. Click **"Create Project"**

### Step 2: Add a Web App

1. In your Firebase project, click the **Web icon** (`</>`)
2. Register your app with a name (e.g., "portfolio-web")
3. **Copy the Firebase configuration** - you'll need this!

It looks like this:
```javascript
const firebaseConfig = {
    apiKey: "AIzaSy...",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};
```

### Step 3: Enable Firestore Database

1. In Firebase Console, go to **Build > Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in production mode"** 
4. Select a location close to you (e.g., `asia-south1` for India)
5. Click **"Enable"**

### Step 4: Set Security Rules

Go to **Firestore Database > Rules** and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to write to contact_messages (for form submissions)
    match /contact_messages/{messageId} {
      allow create: if true;  // Anyone can submit a message
      allow read, update, delete: if false;  // Only you can view/edit via console
    }
  }
}
```

Click **"Publish"** to save the rules.

### Step 5: Update Your Config File

Open `firebase-config.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

---

## ✅ That's It!

Your contact form will now save messages to Firebase Firestore.

### Viewing Messages

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Open your project
3. Go to **Firestore Database**
4. Look for the `contact_messages` collection
5. All form submissions will appear there with:
   - Name
   - Email
   - Subject
   - Message
   - Timestamp
   - Read status

---

## 📝 File Changes Made

| File | Description |
|------|-------------|
| `firebase-config.js` | Firebase initialization & database functions |
| `index.html` | Added Firebase SDK scripts |
| `script.js` | Updated contact form to save to database |

---

## 🔒 Security Tips

1. Your API key is safe to expose in frontend (Firebase uses security rules)
2. The security rules above prevent anyone from reading your messages
3. Only you can view messages via the Firebase Console
4. Consider adding rate limiting via Firebase Functions if spam becomes an issue

---

## 🎯 Optional: Email Notifications

Want to receive an email when someone submits the form? You can:
1. Use Firebase Extensions > "Trigger Email" extension
2. Or set up a Firebase Cloud Function

Need help with email notifications? Just ask!
