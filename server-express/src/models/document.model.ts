CREATE TABLE documents (
  doc_id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(255),
  status VARCHAR(100),
  user_id INT,
  case_id INT,
  file_path TEXT
);
