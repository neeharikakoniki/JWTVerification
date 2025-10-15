import * as Keychain from 'react-native-keychain';

export const saveToken = async (token: string) => {
  try {
    await Keychain.setGenericPassword('jwt', token, {
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
    });
    console.log('Token saved to Keychain:', token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

export const getToken = async () => {
  try {
    const creds = await Keychain.getGenericPassword();
    if (creds) {
      console.log('Token retrieved from Keychain:', creds.password);
      return creds.password;
    } else {
      console.warn('No credentials found in Keychain');
      return null;
    }
  } catch (error) {
    console.error('Error reading token:', error);
    return null;
  }
};

export const clearToken = async () => {
  try {
    await Keychain.resetGenericPassword();
    console.log('Token cleared from Keychain');
  } catch (error) {
    console.error('Error clearing token:', error);
  }
};
