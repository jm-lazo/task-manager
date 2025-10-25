# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start full fake REST API (root folder)

   ```bash
   npm run start:api
   ```

This will raise a fake api at http://localhost:4000/

3. Start the app

   ```bash
   npx expo start
   ```

   This will open Metro Bundler.
   From there you can:
   -Press i to open in iOS Simulator
   -Press a to open in Android Emulator
   -Scan the QR code with the Expo Go app on your physical device

## 📦 Dependencies

| Tipo | Paquete                                       |  Versión   | Descripción                  |
| :--: | --------------------------------------------- | :--------: | ---------------------------- |
|  ⚛️  | **react-native**                              |  `0.81.5`  | Core del proyecto            |
|  🚀  | **expo**                                      | `~54.0.20` | Framework base               |
|  🧠  | **zustand**                                   |  `^5.0.8`  | Estado global + persistencia |
|  💾  | **@react-native-async-storage/async-storage** |  `^2.2.0`  | Almacenamiento local         |
|  🎨  | **expo-linear-gradient**                      |  `15.0.7`  | Gradientes para UI           |
|  🧩  | **@expo/vector-icons**                        |  `15.0.3`  | Íconos del sistema           |

## Important

The API_URL configuration handles the difference between how Android and iOS emulators access the local development server. (/services/api.ts)

-On iOS (Simulator):
localhost refers to your development machine, so the app can directly access the API using http://localhost:4000.

-On Android (Emulator):
The emulator runs in a virtualized environment, and localhost points to the emulator itself — not your host machine.
To access your computer’s local server, Android uses the special alias 10.0.2.2.

✅ This ensures both platforms can reach the local JSON Server instance running on your computer during development.
