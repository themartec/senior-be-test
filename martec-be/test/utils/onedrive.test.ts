import { getAccessToken, getUserEmail } from '../../src/utils/onedrive.utils';
import fetchMock from "jest-fetch-mock";

describe('API Functions', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('getAccessToken should return token data', async () => {
    const mockResponse = {
      access_token: 'mockAccessToken',
      token_type: 'Bearer',
      expires_in: 3600,
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
    const code = 'testCode';
    const result = await getAccessToken(code);

    expect(result).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://login.microsoftonline.com/consumers/oauth2/v2.0/token',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: expect.any(String),
      })
    );
  });

  test('getUserEmail should return user data', async () => {
    const mockUserResponse = {
      email: 'testuser@example.com',
      id: '12345',
      displayName: 'Test User',
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockUserResponse));

    const accessToken = 'mockAccessToken';
    const result = await getUserEmail(accessToken);

    expect(result).toEqual(mockUserResponse);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://graph.microsoft.com/v1.0/me',
      expect.objectContaining({
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    );
  });

  test('getUserEmail should throw error on failed request', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to fetch user info: Failed to fetch'));

    const accessToken = 'mockAccessToken';

    await expect(getUserEmail(accessToken)).rejects.toThrow('Failed to fetch user info: Failed to fetch');
  });

});
