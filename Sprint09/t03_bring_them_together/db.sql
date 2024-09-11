CREATE DATABASE IF NOT EXISTS sprint_nine_db;
CREATE USER IF NOT EXISTS 'nfinohenov'@'localhost' IDENTIFIED BY 'securepass';
GRANT ALL PRIVILEGES ON sprint_nine_db.* TO 'nfinohenov'@'localhost';
FLUSH PRIVILEGES;
USE sprint_nine_db;
CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      login VARCHAR(30) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL
);
