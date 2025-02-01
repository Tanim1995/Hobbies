Events Platform(Hobbies)

A community-driven platform for browsing, signing up for, and managing events.

Project Overview
This is a community events platform where users can browse events, sign up, and add them to their Google Calendar. Staff members have additional permissions to create, edit, and manage events.
 Features (MVP)
 Browse events with event details, date, and location
 Sign up for an event and disable sign-up button after registration
Add events to Google Calendar with one click
Staff authentication for event creation and management
 Fully responsive & accessible UI
Live hosted and publicly accessible


🛠️ Tech Stack
React
TailwindCss
Firebase
Google Calendar API
Netlify

 Getting Started
1.  Clone the Repository
bash
CopyEdit
git clone https://github.com/your-username/events-platform.git
cd events-platform

2.  Install Dependencies
bash
CopyEdit
npm install
 Set Up Firebase
Go to Firebase Console → Create a new project
Enable Firestore Database (for storing event data)
Enable Authentication → Select "Email/Password"
Go to Project Settings → Copy the Firebase config
Create a .env file in the root directory and add:
env
CopyEdit
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id

Set Up Google Calendar API
Go to Google Cloud Console → Create a new project
Enable the Google Calendar API
Generate API credentials → Select "OAuth Client ID"
Copy the Client ID and API Key → Add them to the .env file:
env
CopyEdit
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
VITE_GOOGLE_API_KEY=your-api-key
 Run the Project Locally
bash
CopyEdit
npm run dev
Visit your local host

 Deployment (Netlify)
Go to Netlify → Create an account
Connect the GitHub repository
Add environment variables (Firebase & Google API) in Netlify settings
Deploy the site 

Test Account for Reviewers
Use the following test account for access:
Staff Email: test@test.com Password: test12
User 
Email:matthew@king.com
Password: matthewking
