# Personal Notes Organizer – Frontend

## 📌 Project Overview
Personal Notes Organizer is a web-based application that allows users to create, view, update, and delete personal notes.  
This frontend is developed using **React.js** and communicates with a backend REST API deployed on **Render**.

The application follows a clean UI design and supports real-time CRUD operations.

---

## 🛠️ Technologies Used
- React.js
- Axios
- HTML5
- CSS3
- JavaScript (ES6)
- Vercel (Deployment)

---

## ✨ Features
- Create new notes
- View all notes
- Edit existing notes
- Delete notes
- Search notes by title or content
- Responsive UI
- Environment-based API configuration

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=https://personalbackend-1-0.onrender.com


📂 Project Structure
src/
 ├── components/
 │   ├── NoteForm.js
 │   └── NoteList.js
 ├── services/
 │   └── NoteService.js
 ├── App.js
 ├── index.js
 └── App.css

🔌 API Integration

All API calls are handled using Axios.

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/notes`;

🚀 Deployment

Frontend is deployed on Vercel.

🔗 Live URL:
https://personalfrontend.vercel.app


## 📸 Screenshots

### Create the New and Update the  Notes Dashboard
![Create Page](screenshots/create-note.png)

###  Delete New Note
![Delete Note](screenshots/Delete-notes.png)

### Error Handling
![Error Handling List](screenshots/Error-Handling.png)

###  Sonar Anaysis  
![Sonar Analysis](screenshots/Sonar-Analysis-frontend.png)

### Proper pull Request
![Pull request](screenshots/ProperPull-request-frontend.png)

###  Vercel Deployment
![Deployment](screenshots/Vercel-Deployment.png)

### Vercel Deployment with domain name
![Domain Name](screenshots/Vercel-Deployment-with-Domain-name.png)


### ✅ Frontend Screenshots
1. Vercel deployed app homepage  
2. Create new note screen  
3. Notes list with data  
4. Delete,Update,Search notes working  
5. Browser console showing successful API call (200 OK)
