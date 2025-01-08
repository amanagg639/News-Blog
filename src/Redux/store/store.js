import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newsReducer'; // Import the reducer directly

const store = configureStore({
  reducer: {
    news: newsReducer, // Use the imported reducer directly
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
      // You can add custom middleware here if needed
    }),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

// Optional: Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export default store;