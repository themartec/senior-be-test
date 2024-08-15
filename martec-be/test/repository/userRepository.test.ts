import { Database } from 'sqlite3';
import { saveMetadata, getUserTokensByIntegration, getUserMetadata, deleteUser, db } from '@/repository/userRepository.dev';
import path from 'path';

// Mock the sqlite3 module
jest.mock('sqlite3', () => {
  const mockDatabase = {
    run: jest.fn(),
    all: jest.fn(),
    close: jest.fn(),
  };
  return { Database: jest.fn(() => mockDatabase) };
});

describe('Database Operations', () => {
  let mockDb: Database;

  beforeEach(() => {
    mockDb = new Database(path.resolve(__dirname, 'database.sqlite3'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('saveMetadata should insert or replace metadata', async () => {
    mockDb.run =jest.fn().mockImplementation((query, params, callback) => callback(null));

    await expect(saveMetadata('test@example.com', 'provider', 'key', 'data')).resolves.toBe('success');
    expect(mockDb.run).toHaveBeenCalledWith(
      'INSERT OR REPLACE INTO metadata (composite_key, user_name, type, key, value) VALUES (?, ?, ?, ?, ?)',
      ['test@example.comproviderkey', 'test@example.com', 'provider', 'key', 'data'],
      expect.any(Function)
    );
  });

  test('getUserTokensByIntegration should retrieve user tokens', async () => {
    const mockRows = [{ key: 'token', value: 'mockToken' }];
    mockDb.all = jest.fn().mockImplementation((query, params, callback) => callback(null, mockRows));

    await expect(getUserTokensByIntegration('googleId', 'provider')).resolves.toEqual(mockRows);
    expect(mockDb.all).toHaveBeenCalledWith(
      'SELECT * FROM metadata WHERE user_name = ? and type = ?',
      ['googleId', 'provider'],
      expect.any(Function)
    );
  });

  test('getUserMetadata should retrieve user metadata', async () => {
    const mockRows = [{ key: 'metadata', value: 'mockMetadata' }];
    mockDb.all = jest.fn().mockImplementation((query, params, callback) => callback(null, mockRows));

    await expect(getUserMetadata('userID')).resolves.toEqual(mockRows);
    expect(mockDb.all).toHaveBeenCalledWith(
      'SELECT * FROM metadata WHERE user_name = ?',
      ['userID'],
      expect.any(Function)
    );
  });

  test('deleteUser should delete user from the database', async () => {
    mockDb.run =jest.fn().mockImplementation((query, params, callback) => callback(null));

    await expect(deleteUser('googleId')).resolves.toBeUndefined();
    expect(mockDb.run).toHaveBeenCalledWith(
      'DELETE FROM users WHERE google_id = ?',
      ['googleId'],
      expect.any(Function)
    );
  });
});
