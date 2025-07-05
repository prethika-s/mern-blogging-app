# 📝 Blogify – *Get Reading*

**Blogify** is a full-stack, intelligent blogging platform that combines the power of **AI**, **JWT authentication**, and modern web technologies to provide a seamless reading and writing experience. Whether you're a casual reader, a passionate writer, or a platform admin — Blogify has everything you need.

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=flat-square" />
  <img src="https://img.shields.io/badge/Auth-JWT-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/AI-Integrated-red?style=flat-square" />
  <img src="https://img.shields.io/badge/Editor-Innovative-purple?style=flat-square" />
</p>

---

## 🚀 Features

### 🔐 JWT Authentication
- Secure login/signup with JSON Web Tokens
- Role-based access control for users and admins
- Protected routes and persistent sessions

### 🤖 AI-Powered Content Suite
- **AI Post Generator**: Generate blog posts from simple prompts
- **AI Comment Assistant**: Suggest engaging comments using contextual AI
- **AI Idea Engine**: Unlock blog ideas based on trending topics or niche interests
- **AI Summarizer**: Get TL;DRs of long articles instantly

### ✨ Innovative Editor
- Live preview with markdown + rich text
- AI-powered autocomplete and style suggestions
- Image upload, formatting shortcuts, and dark mode

### 📊 Admin Dashboard
- Manage all users, posts, and reported content
- Analytics: track post views, engagement metrics, and user activity
- Role assignment, content moderation, and post approvals

### 💬 Threaded Comments System
- Nested replies with upvote/downvote support
- Real-time updates using socket/event-based refresh

---

## ⚙️ Tech Stack

### 🔧 Backend
- **Node.js**, **Express**
- **MongoDB** (with Mongoose ODM)
- **JWT** Authentication
- **OpenAI / Gemini API** for AI integration

### 🎨 Frontend
- **React.js** (Vite)
- **TailwindCSS**
- **React Query / SWR**
- **Axios**, **React Router**
- **Quill / Slate.js** for custom editor

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js ≥ 18.x
- MongoDB
- npm or yarn

### 🔥 1. Clone the Repository

```bash
git clone https://github.com/your-username/blogify.git
cd blogify
````

### ⚙️ 2. Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

#### `.env` Example:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/blogify
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
```

### 🌐 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

## 📂 Project Structure

```
blogify/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── index.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── hooks/
│   └── main.jsx
```

---

## 🌐 API Endpoints (Sample)

### Auth

* `POST /api/auth/register` – User registration
* `POST /api/auth/login` – Login and receive token

### Posts

* `POST /api/posts/generate` – AI-powered blog post
* `GET /api/posts/:id` – Get blog post
* `PUT /api/posts/:id` – Edit post

### Comments

* `POST /api/comments/generate` – AI-generated comment
* `POST /api/comments/:postId` – Add comment
* `GET /api/comments/:postId` – Get all comments

### Admin

* `GET /api/admin/dashboard` – Admin analytics
* `PUT /api/admin/roles/:userId` – Update user role
* `DELETE /api/posts/:id` – Delete post

---

## 🧠 AI Use Cases

| Feature           | API Used      | Description                                    |
| ----------------- | ------------- | ---------------------------------------------- |
| Post Generator    | OpenAI/Gemini | Blog post from keyword/prompt                  |
| Comment Generator | OpenAI        | Suggests meaningful, relevant comments         |
| Idea Engine       | Gemini/OpenAI | Suggests blog topics based on trends/interests |
| Summarizer        | OpenAI/Gemini | Summarizes long-form posts                     |

---

## 🚧 Future Roadmap

* 📱 **Mobile App** (React Native / Flutter)
* 🌍 Internationalization (i18n)
* 🔒 2FA + OAuth with Google/GitHub
* 📊 Full analytics dashboard for writers
* 🔔 Push notifications for likes/comments

---

## ✨ Contributing

```bash
git clone https://github.com/your-username/blogify.git
git checkout -b feature/your-feature-name
npm install && npm run dev
```

Pull requests are welcome. For major changes, please open an issue first.

---

## 👨‍💻 Author

* **Prethika S**
  [GitHub](https://github.com/prethikas) • [LinkedIn](https://www.linkedin.com/in/yourprofile)

---

## 🪪 License

Licensed under the [MIT License](./LICENSE).

