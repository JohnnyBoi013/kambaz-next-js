"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { profile } from "./client";

export default function Session({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const currentUser = await profile();
        dispatch(setCurrentUser(currentUser));
      } catch {
        dispatch(setCurrentUser(null));
      }
    };
    fetchProfile();
  }, [dispatch]);

  return <>{children}</>;
}
