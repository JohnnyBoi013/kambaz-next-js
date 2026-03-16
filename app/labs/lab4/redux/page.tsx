"use client";
import { Provider } from "react-redux";
import store from "../store";
import ReduxExamples from "./ReduxExamples";

export default function ReduxPage() {
  return (
    <Provider store={store}>
      <ReduxExamples />
    </Provider>
  );
}
