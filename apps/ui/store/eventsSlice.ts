import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';

export interface EventsState {
  today: any[] | null;
}

const initialState: EventsState = {
  today: null,
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setToday(state, action) {
      state.today = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setToday } = eventsSlice.actions;

export const selectEventsState = (state: AppState) => state.events.eventsState;

export default eventsSlice.reducer;
