import mysql from 'mysql2';
import { UserRepository } from '../repositories/user.repository';
import { Role } from '../types/role';

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'document',
});

db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err.message);
  } else {
    console.log('Connected to MySQL database');
    initializeUserData().then(() => {
      console.log("User data initialized successfully");
    });
  }
});

async function initializeUserData() {
  try {
    const advocates = await UserRepository.getUsersByRole(Role.ADVOCATE);
    const users = await UserRepository.getUsersByRole(Role.USER);

    if (advocates.length === 0) {
      await UserRepository.createUser("Advocate Name", "advocate@example.com", "adv123", Role.ADVOCATE);
      console.log("Default 'advocate' user created");
    }

    if (users.length === 0) {
      await UserRepository.createUser("User Name", "user1@example.com", "user123", Role.USER);
      console.log("Default 'user' created");
    }
  } catch (error) {
    console.error("Error initializing user data:", error);
  }
}
