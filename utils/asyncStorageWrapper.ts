import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistStorage, StorageValue } from "zustand/middleware";
import { TodoStore } from "../store/useTodoStore";

export const asyncStorageWrapper: PersistStorage<TodoStore, unknown> = {
  getItem: async (name: string): Promise<StorageValue<TodoStore> | null> => {
    const value = await AsyncStorage.getItem(name);

    return value ? (JSON.parse(value) as StorageValue<TodoStore>) : null;
  },
  setItem: async (
    name: string,
    value: StorageValue<TodoStore>
  ): Promise<void> => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name: string): Promise<void> => {
    await AsyncStorage.removeItem(name);
  },
};
