USE sprint_nine_db;

ALTER TABLE users
ADD COLUMN status ENUM('admin', 'user') DEFAULT ('user');
