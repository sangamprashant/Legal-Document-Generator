import { db } from "../config/db";
import { User } from "../types/user";

export const UserRepository = {
  createUser: (
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
      db.query(query, [name, email, password, role], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  getAllUsers: (): Promise<any> => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users", (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  getUsersByRole: (role: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE role = ?";
      db.query(query, [role], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  getUserByEmail: (email: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE email = ?";
      db.query(query, [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          const rows = results as User[];
          resolve(rows[0])
        }
      });
    });
  },
};
