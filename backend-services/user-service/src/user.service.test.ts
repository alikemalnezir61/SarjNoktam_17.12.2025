import { registerUser, loginUser } from './user.service';

describe('User Service', () => {
  it('should register a new user', async () => {
    const user = await registerUser({ username: 'testuser', password: 'testpass' });
    expect(user).toHaveProperty('id');
    expect(user.username).toBe('testuser');
  });

  it('should login with correct credentials', async () => {
    await registerUser({ username: 'loginuser', password: 'loginpass' });
    const token = await loginUser({ username: 'loginuser', password: 'loginpass' });
    expect(typeof token).toBe('string');
  });

  it('should fail login with wrong credentials', async () => {
    await registerUser({ username: 'failuser', password: 'failpass' });
    await expect(loginUser({ username: 'failuser', password: 'wrongpass' })).rejects.toThrow('Invalid credentials');
  });
});
