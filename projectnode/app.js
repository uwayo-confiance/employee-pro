const express = require("express");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
const PORT = 5000;

// ===============================
// MYSQL CONNECTION
// ===============================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blog",
});

db.connect((err) => {
  if (err) {
    console.log("MySQL connection error:", err);
  } else {
    console.log("MySQL connected successfully!");
  }
});

// ===============================
// MIDDLEWARE
// ===============================
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// ===============================
// MULTER IMAGE UPLOAD
// ===============================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

// ===============================
// ADMIN LOGIN
// ===============================
const adminCredentials = {
  username: "admin",
  password: "admin123",
};

// ===============================
// EMERALD SIDEBAR
// ===============================
function navigationBar(activePage) {
  return `
    <div class="sidebar">

      <div class="logo">
        🌿 ADMIN PANEL
      </div>

      <div class="menu">

        <a href="/" class="${activePage === "dashboard" ? "active" : ""}">
          🏠 Dashboard
        </a>

        <a href="/add-post" class="${activePage === "posts" ? "active" : ""}">
          📝 Posts
        </a>

        <a href="/add-user" class="${activePage === "users" ? "active" : ""}">
          👥 Users
        </a>

      </div>

      <form action="/logout" method="POST" class="logout-form">
        <button type="submit" class="logout-btn">
          🚪 Logout
        </button>
      </form>

    </div>
  `;
}

// ===============================
// COMMON CSS
// ===============================
function pageStyle() {
  return `
    <style>

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: Arial, sans-serif;
        background: #f0fdf4;
        color: #1f2937;
      }

      .sidebar {
        width: 250px;
        height: 100vh;
        background: #047857;
        position: fixed;
        left: 0;
        top: 0;
        padding: 20px;
        display: flex;
        flex-direction: column;
      }

      .logo {
        background: #065f46;
        color: white;
        padding: 20px 10px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        border-radius: 10px;
        margin-bottom: 30px;
      }

      .menu {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .menu a {
        text-decoration: none;
        color: white;
        padding: 14px;
        border-radius: 8px;
        font-size: 16px;
        transition: 0.3s;
      }

      .menu a:hover {
        background: #065f46;
      }

      .menu a.active {
        background: white;
        color: #047857;
        font-weight: bold;
      }

      .logout-form {
        margin-top: auto;
      }

      .logout-btn {
        width: 100%;
        padding: 13px;
        border: none;
        border-radius: 8px;
        background: #dc2626;
        color: white;
        font-size: 16px;
        cursor: pointer;
      }

      .logout-btn:hover {
        background: #b91c1c;
      }

      .main {
        margin-left: 250px;
        padding: 30px;
      }

      .header {
        background: white;
        padding: 25px;
        border-radius: 12px;
        margin-bottom: 25px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      }

      .header h1 {
        margin: 0;
        color: #065f46;
      }

      .header p {
        color: #6b7280;
      }

      .cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-bottom: 30px;
      }

      .card {
        background: white;
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      }

      .card h3 {
        margin-top: 0;
        color: #047857;
      }

      .card p {
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 0;
      }

      .form-container {
        background: white;
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        margin-bottom: 30px;
      }

      .form-container h2 {
        color: #065f46;
        margin-top: 0;
      }

      input,
      textarea {
        width: 100%;
        padding: 12px;
        margin: 8px 0 15px;
        border: 1px solid #d1d5db;
        border-radius: 7px;
        font-size: 15px;
      }

      textarea {
        min-height: 150px;
        resize: vertical;
      }

      input:focus,
      textarea:focus {
        outline: none;
        border-color: #047857;
      }

      .submit-btn {
        background: #047857;
        color: white;
        border: none;
        padding: 12px 22px;
        border-radius: 7px;
        cursor: pointer;
        font-size: 15px;
      }

      .submit-btn:hover {
        background: #065f46;
      }

      .table-container {
        background: white;
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        overflow-x: auto;
      }

      .table-container h2 {
        color: #065f46;
        margin-top: 0;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th {
        background: #047857;
        color: white;
        padding: 13px;
        text-align: left;
      }

      td {
        padding: 13px;
        border-bottom: 1px solid #e5e7eb;
      }

      tr:hover {
        background: #f0fdf4;
      }

      .delete-btn {
        background: #dc2626;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
      }

      .delete-btn:hover {
        background: #b91c1c;
      }

      .edit-btn {
        background: #2563eb;
        color: white;
        padding: 8px 12px;
        text-decoration: none;
        border-radius: 6px;
      }

      .login-page {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ecfdf5;
      }

      .login-box {
        width: 400px;
        background: white;
        padding: 35px;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      }

      .login-box h1 {
        text-align: center;
        color: #047857;
        margin-bottom: 25px;
      }

      .login-btn {
        width: 100%;
        background: #047857;
        color: white;
        padding: 13px;
        border: none;
        border-radius: 7px;
        cursor: pointer;
        font-size: 16px;
      }

      .login-btn:hover {
        background: #065f46;
      }

      .error {
        background: #fee2e2;
        color: #b91c1c;
        padding: 10px;
        border-radius: 6px;
        margin-bottom: 15px;
      }

      @media (max-width: 900px) {
        .cards {
          grid-template-columns: 1fr;
        }
      }

    </style>
  `;
}

// ===============================
// LOGIN PAGE
// ===============================
app.get("/login", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Admin Login</title>
      ${pageStyle()}
    </head>

    <body>

      <div class="login-page">

        <div class="login-box">

          <h1>🌿 Admin Login</h1>

          ${
            req.query.error
              ? `<div class="error">Invalid username or password</div>`
              : ""
          }

          <form action="/login" method="POST">

            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              required
            >

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              required
            >

            <button class="login-btn" type="submit">
              Login
            </button>

          </form>

        </div>

      </div>

    </body>
    </html>
  `);
});

// ===============================
// LOGIN POST
// ===============================
app.post("/login", (req, res) => {

  const { username, password } = req.body;

  if (
    username === adminCredentials.username &&
    password === adminCredentials.password
  ) {

    req.session.loggedIn = true;

    res.redirect("/");

  } else {

    res.redirect("/login?error=1");

  }
});

// ===============================
// DASHBOARD
// ===============================
app.get("/", (req, res) => {

  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }

  db.query(
    "SELECT id, title, date FROM posts ORDER BY date DESC",
    (postError, posts) => {

      if (postError) {
        return res.send("Error loading posts");
      }

      db.query(
        "SELECT id FROM users",
        (userError, users) => {

          if (userError) {
            return res.send("Error loading users");
          }

          res.send(`
            <!DOCTYPE html>
            <html>

            <head>
              <title>Dashboard</title>
              ${pageStyle()}
            </head>

            <body>

              ${navigationBar("dashboard")}

              <div class="main">

                <div class="header">
                  <h1>Dashboard</h1>
                  <p>Welcome to your blog administration panel.</p>
                </div>

                <div class="cards">

                  <div class="card">
                    <h3>📝 Total Posts</h3>
                    <p>${posts.length}</p>
                  </div>

                  <div class="card">
                    <h3>👥 Total Users</h3>
                    <p>${users.length}</p>
                  </div>

                  <div class="card">
                    <h3>🌿 Status</h3>
                    <p>Active</p>
                  </div>

                </div>

                <div class="table-container">

                  <h2>Recent Posts</h2>

                  <table>

                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Date</th>
                    </tr>

                    ${
                      posts.length === 0
                        ? `
                          <tr>
                            <td colspan="3">No posts found.</td>
                          </tr>
                        `
                        : posts
                            .map(
                              (post) => `
                                <tr>
                                  <td>${post.id}</td>
                                  <td>${post.title}</td>
                                  <td>${post.date}</td>
                                </tr>
                              `
                            )
                            .join("")
                    }

                  </table>

                </div>

              </div>

            </body>
            </html>
          `);
        }
      );
    }
  );
});

// ===============================
// ADD POST FORM + POSTS TABLE
// ===============================
app.get("/add-post", (req, res) => {

  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }

  db.query(
    "SELECT * FROM posts ORDER BY date DESC",
    (err, posts) => {

      if (err) {
        return res.send("Error loading posts");
      }

      res.send(`
        <!DOCTYPE html>

        <html>

        <head>
          <title>Add Post</title>
          ${pageStyle()}
        </head>

        <body>

          ${navigationBar("posts")}

          <div class="main">

            <div class="header">
              <h1>Posts Management</h1>
              <p>Add a new post and manage existing posts.</p>
            </div>

            <!-- ADD POST FORM -->
            <div class="form-container">

              <h2>➕ Add New Post</h2>

              <form
                action="/add-post"
                method="POST"
                enctype="multipart/form-data"
              >

                <label>Post Title</label>

                <input
                  type="text"
                  name="title"
                  placeholder="Enter post title"
                  required
                >

                <label>Post Content</label>

                <textarea
                  name="content"
                  placeholder="Enter post content"
                  required
                ></textarea>

                <label>Post Image</label>

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                >

                <button class="submit-btn" type="submit">
                  Add Post
                </button>

              </form>

            </div>

            <!-- POSTS TABLE UNDER FORM -->
            <div class="table-container">

              <h2>📋 All Posts</h2>

              <table>

                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>

                ${
                  posts.length === 0
                    ? `
                      <tr>
                        <td colspan="5">
                          No posts found.
                        </td>
                      </tr>
                    `
                    : posts
                        .map(
                          (post) => `
                            <tr>

                              <td>${post.id}</td>

                              <td>${post.title}</td>

                              <td>
                                ${
                                  post.content
                                    ? post.content.substring(0, 50) + "..."
                                    : ""
                                }
                              </td>

                              <td>${post.date}</td>

                              <td>

                                <form
                                  action="/delete-post/${post.id}"
                                  method="POST"
                                  style="display:inline;"
                                >

                                  <button
                                    class="delete-btn"
                                    type="submit"
                                    onclick="return confirm('Delete this post?')"
                                  >
                                    Delete
                                  </button>

                                </form>

                              </td>

                            </tr>
                          `
                        )
                        .join("")
                }

              </table>

            </div>

          </div>

        </body>
        </html>
      `);
    }
  );
});

// ===============================
// ADD POST POST
// ===============================
app.post(
  "/add-post",
  upload.single("image"),
  (req, res) => {

    if (!req.session.loggedIn) {
      return res.redirect("/login");
    }

    const { title, content } = req.body;

    const image = req.file
      ? req.file.filename
      : null;

    const sql = `
      INSERT INTO posts
      (title, content, image)
      VALUES (?, ?, ?)
    `;

    db.query(
      sql,
      [title, content, image],
      (err) => {

        if (err) {
          console.log(err);
          return res.send("Error adding post");
        }

        res.redirect("/add-post");

      }
    );
  }
);

// ===============================
// DELETE POST
// ===============================
app.post("/delete-post/:id", (req, res) => {

  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }

  const id = req.params.id;

  db.query(
    "DELETE FROM posts WHERE id = ?",
    [id],
    (err) => {

      if (err) {
        return res.send("Error deleting post");
      }

      res.redirect("/add-post");

    }
  );
});

// ===============================
// ADD USER FORM + USERS TABLE
// ===============================
app.get("/add-user", (req, res) => {

  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }

  db.query(
    "SELECT id, username, email FROM users ORDER BY id DESC",
    (err, users) => {

      if (err) {
        return res.send("Error loading users");
      }

      res.send(`
        <!DOCTYPE html>

        <html>

        <head>
          <title>Users</title>
          ${pageStyle()}
        </head>

        <body>

          ${navigationBar("users")}

          <div class="main">

            <div class="header">

              <h1>Users Management</h1>

              <p>
                Add and manage users.
              </p>

            </div>

            <!-- ADD USER FORM -->
            <div class="form-container">

              <h2>➕ Add New User</h2>

              <form action="/add-user" method="POST">

                <label>Username</label>

                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  required
                >

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  required
                >

                <label>Password</label>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                >

                <button
                  class="submit-btn"
                  type="submit"
                >
                  Add User
                </button>

              </form>

            </div>

            <!-- USERS TABLE UNDER FORM -->
            <div class="table-container">

              <h2>📋 All Users</h2>

              <table>

                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>

                ${
                  users.length === 0
                    ? `
                      <tr>
                        <td colspan="4">
                          No users found.
                        </td>
                      </tr>
                    `
                    : users
                        .map(
                          (user) => `
                            <tr>

                              <td>${user.id}</td>

                              <td>${user.username}</td>

                              <td>${user.email}</td>

                              <td>

                                <form
                                  action="/delete-user/${user.id}"
                                  method="POST"
                                  style="display:inline;"
                                >

                                  <button
                                    class="delete-btn"
                                    type="submit"
                                    onclick="return confirm('Delete this user?')"
                                  >
                                    Delete
                                  </button>

                                </form>

                              </td>

                            </tr>
                          `
                        )
                        .join("")
                }

              </table>

            </div>

          </div>

        </body>
        </html>
      `);
    }
  );
});

// ===============================
// ADD USER POST
// ===============================
app.post("/add-user", (req, res) => {

  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }

  const {
    username,
    password,
    email
  } = req.body;

  const sql = `
    INSERT INTO users
    (username, password, email)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [username, password, email],
    (err) => {

      if (err) {
        console.log(err);
        return res.send("Error adding user");
      }

      res.redirect("/add-user");

    }
  );
});

// ===============================
// DELETE USER
// ===============================
app.post("/delete-user/:id", (req, res) => {

  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }

  const id = req.params.id;

  db.query(
    "DELETE FROM users WHERE id = ?",
    [id],
    (err) => {

      if (err) {
        return res.send("Error deleting user");
      }

      res.redirect("/add-user");

    }
  );
});

// ===============================
// LOGOUT
// ===============================
app.post("/logout", (req, res) => {

  req.session.destroy((err) => {

    if (err) {
      return res.send("Error logging out");
    }

    res.redirect("/login");

  });
});

// ===============================
// START SERVER
// ===============================
app.listen(PORT, () => {

  console.log(
    `Server running at http://localhost:${PORT}`
  );

});