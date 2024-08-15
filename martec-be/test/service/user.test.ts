import { getUserMetadataService, getUserTokensByIntegrationService, saveTokenMetadataService } from '@/service/user.service';
import { getUserMetadata, getUserTokensByIntegration, saveMetadata } from '@/repository/userRepository.dev';
import { UserDAO } from '@/model/dao';

// Mock the repository functions
jest.mock('@/repository/userRepository.dev');

describe('User Service Functions', () => {

  afterEach(() => {
    jest.resetAllMocks(); // Reset mock data between tests
  });

  describe('getUserMetadataService', () => {
    it('should process metadata rows correctly', async () => {
      const mockMetadata = [
        { type: 'GOOGLE', key: 'accessToken', value: 'mockAccessToken' },
        { type: 'GOOGLE', key: 'refreshToken', value: 'mockRefreshToken' },
        { type: 'ONEDRIVE', key: 'accessToken', value: 'mockOneDriveAccessToken' }
      ];
      (getUserMetadata as jest.Mock).mockResolvedValue(mockMetadata);

      const result = await getUserMetadataService('userID');

      expect(result).toEqual({
        GOOGLE: {
          accessToken: 'mockAccessToken',
          refreshToken: 'mockRefreshToken'
        },
        ONEDRIVE: {
          accessToken: 'mockOneDriveAccessToken'
        }
      });
      expect(getUserMetadata).toHaveBeenCalledWith('userID');
    });
  });

  describe('getUserTokensByIntegrationService', () => {
    it('should map tokens to UserDAO format correctly', async () => {
      const mockTokens = [
        { key: 'accessToken', value: 'mockAccessToken' },
        { key: 'refreshToken', value: 'mockRefreshToken' }
      ];
      (getUserTokensByIntegration as jest.Mock).mockResolvedValue(mockTokens);

      const result = await getUserTokensByIntegrationService('googleId', 'provider');

      expect(result).toEqual({
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken'
      });
      expect(getUserTokensByIntegration).toHaveBeenCalledWith('googleId', 'provider');
    });
  });

  describe('saveTokenMetadataService', () => {
    it('should save all token metadata', async () => {
      const mockTokens: UserDAO = {
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken',
        expiredAt: 123
      };
      (saveMetadata as jest.Mock).mockResolvedValueOnce(undefined);

      await saveTokenMetadataService('email', 'integrationType', mockTokens);

      expect(saveMetadata).toHaveBeenCalledWith('email', 'integrationType', 'accessToken', 'mockAccessToken');
      expect(saveMetadata).toHaveBeenCalledWith('email', 'integrationType', 'refreshToken', 'mockRefreshToken');
      expect(saveMetadata).toHaveBeenCalledWith('email', 'integrationType', 'expiredAt', 123);
      expect(saveMetadata).toHaveBeenCalledTimes(3);
    });
  });

});
