const Post = require('../models/postModel');

exports.getPosts = async (req, res, next) => {
    // Отримуємо параметр sort з URL (наприклад, ?sort=old)
    const sortParam = req.query.sort;
    // Логіка: якщо 'old', то сортуємо ASC (зростання), інакше DESC (спадання - нові зверху)
    const order = sortParam === 'old' ? 'ASC' : 'DESC';

    try {
        // Передаємо порядок сортування у модель
        const [posts] = await Post.fetchAll(order);
        
        res.render('posts', { 
            posts: posts, 
            title: 'All Posts' 
        }); 
    } catch (err) {
        console.log(err);
    }
};

exports.getAddPost = (req, res, next) => {
    res.render('add-post', { title: 'Add Post', editing: false });
};

exports.postAddPost = async (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description; 
    const author = req.body.author;
    
    const post = new Post(title, description, author);
    await post.save();
    res.redirect('/posts');
};

// 1. GET: Отримання сторінки редагування конкретного поста
exports.getEditPost = async (req, res, next) => {
    // Очікуємо, що в URL буде ID поста, наприклад: /edit-post/1
    const postId = req.params.postId;
    
    // Перевірка query-параметра ?edit=true
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }

    try {
        // Знаходимо пост за ID в базі даних
        const [posts] = await Post.findById(postId);
        const post = posts[0]; // Оскільки MySQL повертає масив, беремо перший елемент

        if (!post) {
            return res.redirect('/');
        }

        // Рендеримо шаблон edit-post.ejs
        res.render('edit-post', {
            title: 'Edit Post',
            editing: editMode,
            post: post // Передаємо дані поста, щоб заповнити поля форми
        });
    } catch (err) {
        console.log(err);
    }
};

// 2. POST: Обробка відредагованих даних та оновлення в БД
exports.postEditPost = async (req, res, next) => {
    // Отримуємо дані з форми 
    const prodId = req.body.postId;
    const updatedTitle = req.body.title;
    const updatedDesc = req.body.description;
    const updatedAuthor = req.body.author;

    try {
        // Викликаємо метод моделі для оновлення
        await Post.update(prodId, updatedTitle, updatedDesc, updatedAuthor);
        console.log('UPDATED POST!');
        res.redirect('/posts');
    } catch (err) {
        console.log(err);
    }
};

// 3. POST: Видалення поста
exports.postDeletePost = async (req, res, next) => {
    const prodId = req.body.postId; // ID поста також беремо з прихованого input у формі видалення
    try {
        await Post.deleteById(prodId); // Викликаємо метод видалення з моделі
        console.log('DESTROYED POST');
        res.redirect('/posts');
    } catch (err) {
        console.log(err);
    }
};

exports.getIndex = (req, res, next) => {
    res.render('index', { 
        title: 'Welcome to PostBlog' // Цей заголовок піде в <%= title %>
    });
};