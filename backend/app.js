const express = require('express');
const app = express();
const connection = require('./connection');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/like');
const adminRoutes = require('./routes/admin');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config()
const ENV = process.env.ENV;

connection;

if(ENV === 'development') {

    // Associations
    const Post = require('./models/Post');
    const User = require('./models/User');
    const Comment = require('./models/Comment');
    const Like = require('./models/Like');

    User.hasMany(Post, { foreignKey: 'user_id' });
    Post.belongsTo(User, { foreignKey: 'user_id' });

    User.hasMany(Comment, { foreignKey: 'user_id' });
    Comment.belongsTo(User, { foreignKey: 'user_id' });

    Post.hasMany(Comment, { foreignKey: 'post_id' });
    Comment.belongsTo(Post, { foreignKey: 'post_id' });

    Like.belongsTo(User, { foreignKey: 'user_id' });
}

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

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

app.use('/api/refresh', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;