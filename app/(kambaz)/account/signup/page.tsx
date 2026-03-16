"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { FormControl, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

interface NewUser {
  _id: string;
  username: string;
  password: string;
  verifyPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: string;
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
}

export default function Signup() {
  const [user, setUser] = useState<NewUser>({
    _id: uuidv4(),
    username: "",
    password: "",
    verifyPassword: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    role: "STUDENT",
    loginId: "",
    section: "",
    lastActivity: "",
    totalActivity: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = () => {
    if (user.password !== user.verifyPassword) {
      alert("Passwords do not match!");
      return;
    }
    const { verifyPassword, ...newUser } = user;
    dispatch(setCurrentUser(newUser));
    router.push("/account/profile");
  };

  return (
    <div id="wd-signup-screen" style={{ maxWidth: "400px" }}>
      <h3>Signup</h3>
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-3"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-3"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <FormControl
        id="wd-verify-password"
        placeholder="verify password"
        type="password"
        className="mb-3"
        value={user.verifyPassword}
        onChange={(e) => setUser({ ...user, verifyPassword: e.target.value })}
      />
      <Button id="wd-signup-btn" className="w-100 mb-3" onClick={signup}>
        Signup
      </Button>
      <Link id="wd-signin-link" href="/account/signin">
        Signin
      </Link>
    </div>
  );
}
