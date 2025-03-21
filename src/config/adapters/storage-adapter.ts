import AsyncStorage from '@react-native-async-storage/async-storage';

//V-301,Paso 2.31
export class StorageAdapter {

  //Paso 3.32
  static async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  //Paso 2.32
  static async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      throw new Error(`Error setting item ${key} ${value}`);
    }
  }

  //Paso 2.33
  static async removeItem(key: string): Promise<void> {

    try {
      await AsyncStorage.removeItem(key);

    } catch (error) {
      console.log(error);
      throw new Error(`Error removing item ${key}`);
    }

  }



}
