const express = require('express');

const postController = require('../controllers/postController');

const router = express.Router();

// --- Визначення маршрутів ---

// GET / => Головна сторінка
router.get('/', postController.getIndex);

// GET /posts => Те саме, що і головна (список постів)
router.get('/posts', postController.getPosts);

// GET /add-post => Показати форму додавання
router.get('/add-post', postController.getAddPost);

// POST /add-post => Обробити дані з форми додавання
router.post('/add-post', postController.postAddPost);

// GET /edit-post/:postId => Показати форму редагування (з ID в URL)
router.get('/edit-post/:postId', postController.getEditPost);

// POST /edit-post => Зберегти зміни
router.post('/edit-post', postController.postEditPost);

// POST /delete-post => Видалити пост
router.post('/delete-post', postController.postDeletePost);

module.exports = router;