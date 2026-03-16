import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments } from "../database";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: enrollments as Enrollment[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (
      state,
      { payload }: PayloadAction<{ userId: string; courseId: string }>,
    ) => {
      const exists = state.enrollments.find(
        (e) => e.user === payload.userId && e.course === payload.courseId,
      );
      if (!exists) {
        state.enrollments.push({
          _id: `${payload.userId}-${payload.courseId}`,
          user: payload.userId,
          course: payload.courseId,
        });
      }
    },
    unenroll: (
      state,
      { payload }: PayloadAction<{ userId: string; courseId: string }>,
    ) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === payload.userId && e.course === payload.courseId),
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
