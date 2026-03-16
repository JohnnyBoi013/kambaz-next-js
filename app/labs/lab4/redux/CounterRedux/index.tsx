"use client";
import { Provider } from "react-redux";
import store from "../../store";
import ReduxExamples from "../page";

export default function Lab4() {
  return (
    <Provider store={store}>
      <ReduxExamples />
    </Provider>
  );
}
