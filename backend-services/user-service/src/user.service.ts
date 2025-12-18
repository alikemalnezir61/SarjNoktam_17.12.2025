import jwt from 'jsonwebtoken';

interface User {
  id: number;
  username: string;
  password: string;
}

const users: User[] = [];

export const registerUser = async (data: { username: string; password: string }) => {
  const user: User = {
    id: users.length + 1,
    username: data.username,
    password: data.password // Not: Gerçek projede hashlenmeli
  };
  users.push(user);
  return { id: user.id, username: user.username };
};

export const loginUser = async (data: { username: string; password: string }) => {
  const user = users.find(u => u.username === data.username && u.password === data.password);
  if (!user) throw new Error('Invalid credentials');
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'supersecretkey', { expiresIn: '1h' });
  return token;
};
