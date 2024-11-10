import { pixabayAPI } from "@/services/pixabay";
import reducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pixabayAPI.middleware),
});
