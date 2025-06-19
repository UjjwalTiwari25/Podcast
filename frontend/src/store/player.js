import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: { isPlayerDiv: false, songPath: "", img: "" },
  reducers: {
    setDiv(state) {
      state.isPlayerDiv = true;
    },
    closeDiv(state) {
      state.isPlayerDiv = false;
    },
    changeSong(state, action) {
      const pathOfSong = action.payload;
      state.songPath = pathOfSong;
    },
    changeImage(state, action) {
      const imgOfSong = action.payload;
      state.img = imgOfSong;
    },
  },
});
export const playerActions = playerSlice.actions;
export default playerSlice.reducer;
