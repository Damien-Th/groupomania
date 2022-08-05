const express = require('express');
const app = express();
const connection = require('./connection');
const func  = require('./function');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

connection;

// Associations

const Post = require('./models/Post');
const User = require('./models/User');
const Comment = require('./models/Comment');
const Like = require('./models/Like');

func.hasMany(User, Post, 'user_id', 'CASCADE')
func.hasMany(User, Comment, 'user_id', 'CASCADE')
func.hasMany(Post, Comment, 'post_id', 'CASCADE')
func.belongsTo(Like, User, 'user_id')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(cors({origin: 'http://localhost:3006', credentials: true }))
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cookieParser());

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/like');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/like', likeRoutes);

module.exports = app;