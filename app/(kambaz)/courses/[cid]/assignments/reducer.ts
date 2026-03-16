import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assignments } from "../../../database";
import { v4 as uuidv4 } from "uuid";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
}

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: assignments as Assignment[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (
      state,
      { payload: assignment }: PayloadAction<Omit<Assignment, "_id">>,
    ) => {
      const newAssignment: Assignment = {
        ...assignment,
        _id: uuidv4(),
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (
      state,
      { payload: assignmentId }: PayloadAction<string>,
    ) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== assignmentId,
      );
    },
    updateAssignment: (
      state,
      { payload: assignment }: PayloadAction<Assignment>,
    ) => {
      state.assignments = state.assignments.map((a) =>
        a._id === assignment._id ? assignment : a,
      );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
