USE sprint_nine_db;
CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      login VARCHAR(30) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      status ENUM('admin', 'user') DEFAULT 'user',
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL
);
