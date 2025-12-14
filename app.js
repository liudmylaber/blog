// app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Імпортуємо файл маршрутів
const blogRoutes = require('./routes/blogRoutes');

const app = express();

// Налаштування EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// --- ПІДКЛЮЧЕННЯ МАРШРУТІВ ---
// Усі запити будуть проходити через наш blogRoutes
app.use(blogRoutes);

// Сторінка 404 (якщо маршрут не знайдено)
app.use((req, res, next) => {
    res.status(404).render('error', { title: 'Page Not Found' }); 
    // Переконайтеся, що у вас є файл error.ejs у папці views
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});