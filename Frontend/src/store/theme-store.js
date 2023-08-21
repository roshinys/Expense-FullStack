import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
  isDefault: true,
  webBackgroundColor: "#001c30",
  webColor: "white",
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    setDarkTheme(state) {
      state.webBackgroundColor = "white";
      state.webColor = "#001c30";
      state.isDefault = false;
      document.body.style.backgroundColor = "white";
      document.body.style.color = "#001c30";
    },
    setDefaultTheme(state) {
      state.webBackgroundColor = "#001c30";
      state.webColor = "white";
      state.isDefault = true;
      document.body.style.backgroundColor = "#001c30";
      document.body.style.color = "white";
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
