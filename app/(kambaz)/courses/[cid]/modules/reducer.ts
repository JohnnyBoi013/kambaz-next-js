import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modules } from "../../../database";
import { v4 as uuidv4 } from "uuid";

interface Lesson {
  _id: string;
  name: string;
  description?: string;
  module?: string;
}

interface CourseModule {
  _id: string;
  name: string;
  description?: string;
  course: string;
  editing?: boolean;
  lessons?: Lesson[];
}

interface ModulesState {
  modules: CourseModule[];
}

const initialState: ModulesState = {
  modules: modules as CourseModule[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (
      state,
      { payload: module }: PayloadAction<{ name: string; course: string }>,
    ) => {
      const newModule: CourseModule = {
        _id: uuidv4(),
        lessons: [],
        name: module.name,
        course: module.course,
      };
      state.modules = [...state.modules, newModule];
    },
    deleteModule: (state, { payload: moduleId }: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== moduleId);
    },
    updateModule: (state, { payload: module }: PayloadAction<CourseModule>) => {
      state.modules = state.modules.map((m) =>
        m._id === module._id ? module : m,
      );
    },
    editModule: (state, { payload: moduleId }: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === moduleId ? { ...m, editing: true } : m,
      );
    },
    setModules: (
      state,
      { payload: modules }: PayloadAction<CourseModule[]>,
    ) => {
      state.modules = modules;
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule, setModules } =
  modulesSlice.actions;
export default modulesSlice.reducer;
