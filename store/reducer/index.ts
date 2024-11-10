import { pixabayAPI } from "@/services/pixabay";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  [pixabayAPI.reducerPath]: pixabayAPI.reducer,
});
export default reducer;
