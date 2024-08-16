import { MetadataRow, StructuredData, UserDAO } from '@/model/type'
import {
  deleteMetadata,
  getUserMetadata,
  getUserTokensByIntegration,
  saveMetadata
} from '@/repository/userRepository.dev'

export const getUserMetadataService = async (userID: string) => {
  const metadata = await getUserMetadata(userID)
  return processRows(metadata)
}

export const getUserTokensByIntegrationService = async (googleId: string, provider: string) => {
  const token = await getUserTokensByIntegration(googleId, provider)
  return mapToUserDAO(token)
}

export const saveTokenMetadataService = async (email: string, integrationType: string, tokens: UserDAO) => {
  console.log(email, integrationType, tokens)
  const keys: Array<keyof UserDAO> = Object.keys(tokens) as Array<keyof UserDAO>
  const promises = keys.map(key => {
    const value = tokens[key];
    return saveMetadata(email, integrationType, key, value as string);
  });

  // Wait for all promises to complete
  await Promise.all(promises);
}

export const removeExpiredToken = async (email: string, integrationType: string) => {
  await deleteMetadata(email, integrationType)
}

const processRows = (rows: MetadataRow[]): StructuredData => {
  const structuredData: StructuredData = {};

  rows.forEach((row) => {
    const { type, key, value } = row;

    if (!structuredData[type]) {
      structuredData[type] = {};
    }

    structuredData[type][key] = value;
  });

  console.log(structuredData);
  return structuredData;
};

export const mapToUserDAO = (rows: any): UserDAO => {
  const result = rows.reduce((acc: any, item: any) => {
    acc[item.key] = item.value
    return acc
  }, {})
  return result
}