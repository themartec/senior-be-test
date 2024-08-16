import { Database } from 'sqlite3'
import {
  deleteMetadata,
  deleteUser,
  getUserMetadata,
  getUserTokensByIntegration,
  saveMetadata
} from '@/repository/userRepository.dev'
import path from 'path'

// Mock the sqlite3 module
jest.mock('sqlite3', () => {
  const mockDatabase = {
    run: jest.fn(),
    all: jest.fn(),
    close: jest.fn(),
    serialize: jest.fn()
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
  // it('should create the metadata table if it does not already exist', async () => {
  //   const row = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='metadata'");
  //   expect(row).not.toBeNull();
  //   expect(row.name).toBe('metadata');
  // });

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

  test('deleteMetadata should delete metadata from the database', async () => {
    mockDb.run = jest.fn().mockImplementation((query, params, callback) => callback(null))

    await expect(deleteMetadata('googleId', 'google')).resolves.toBe('success')
    expect(mockDb.run).toHaveBeenCalledWith(
      'DELETE FROM metadata WHERE user_name = ? and type = ?',
      ['googleId', 'google'],
      expect.any(Function)
    )
  })
});
