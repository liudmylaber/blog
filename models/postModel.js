const db = require('../db');

module.exports = class Post {
    constructor(title, description, author) {
        this.title = title;
        this.description = description;
        this.author = author;
    }

    // Збереження нового поста
    save() {
        return db.execute(
            'INSERT INTO posts (title, description, author) VALUES (?, ?, ?)',
            [this.title, this.description, this.author]
        );
    }

    // Отримання всіх постів із сортуванням
    static fetchAll(order = 'DESC') {
        // Захист: переконуємося, що order може бути тільки 'ASC' або 'DESC'
        const sortOrder = order === 'ASC' ? 'ASC' : 'DESC';
        
        // Використовуємо created_at для сортування за часом
        return db.execute(`SELECT * FROM posts ORDER BY created_at ${sortOrder}`);
    }

    // Отримання одного поста за ID
    static findById(id) {
        return db.execute('SELECT * FROM posts WHERE id = ?', [id]);
    }

    // Оновлення поста (для edit-post.ejs)
    static update(id, title, description, author) {
        return db.execute(
            'UPDATE posts SET title = ?, description = ?, author = ? WHERE id = ?',
            [title, description, author, id]
        );
    }

    // Видалення поста
    static deleteById(id) {
        return db.execute('DELETE FROM posts WHERE id = ?', [id]);
    }
};