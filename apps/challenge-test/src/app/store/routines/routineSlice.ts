import { createSlice } from '@reduxjs/toolkit';

export const routineSlice = createSlice({
  name: 'routines',
  initialState: {
    isSaving: false,
    messageSaved: '',
    routines: [],
    active: null,
  },
  reducers: {
    savingNewRoutine: (state) => {
      state.isSaving = true;
    },
    addNewEmptyRoutine: (state, action) => {
      state.routines.push(action.payload as never);
      state.isSaving = false;
    },
    setActiveRoutine: (state, action) => {
      state.active = action.payload;
    },
    setRoutines: (state, action) => {
      state.routines = action.payload;
    },
    setSaving: (state) => {},
    updateRoutine: (state, action) => {},
    deleteRoutineById: (state, action) => {},
  },
});

export const {
  addNewEmptyRoutine,
  setActiveRoutine,
  setRoutines,
  setSaving,
  updateRoutine,
  deleteRoutineById,
  savingNewRoutine,
} = routineSlice.actions;
