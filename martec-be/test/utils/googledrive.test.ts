import { google } from 'googleapis';
import { drive, googleAuthClient, people } from '../../src/utils/googledrive.utlis';

// Mock the Google APIs
jest.mock('googleapis', () => {
  const driveMock = jest.fn();
  const peopleMock = jest.fn();
  const OAuth2Mock = jest.fn().mockImplementation(() => ({
    setCredentials: jest.fn(), // Add other methods if needed
  }));

  return {
    google: {
      drive: jest.fn(() => driveMock),
      people: jest.fn(() => peopleMock),
      auth: {
        OAuth2: OAuth2Mock,
      },
    },
  };
});

describe('Google API Client', () => {
  it('should initialize OAuth2 client with correct credentials', () => {
    expect(googleAuthClient).toBeDefined();
    expect(google.auth.OAuth2).toHaveBeenCalledWith(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URL
    );
  });

  it('should create drive and people API instances', () => {
    expect(drive).toBeDefined();
    expect(people).toBeDefined();
    expect(google.drive).toHaveBeenCalledWith({ version: 'v3', auth: googleAuthClient });
    expect(google.people).toHaveBeenCalledWith({ version: 'v1', auth: googleAuthClient });
  });
});
