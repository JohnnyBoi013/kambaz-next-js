"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { FormControl, Button } from "react-bootstrap";
import { signup } from "../client";

interface NewUser {
  username: string;
  password: string;
  verifyPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: string;
}

export default function Signup() {
  const [user, setUser] = useState<NewUser>({
    username: "",
    password: "",
    verifyPassword: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    role: "STUDENT",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignup = async () => {
    if (user.password !== user.verifyPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const { verifyPassword, ...newUser } = user;
      const createdUser = await signup(newUser);
      dispatch(setCurrentUser(createdUser));
      router.push("/account/profile");
    } catch (err: unknown) {
      const message =
        err &&
        typeof err === "object" &&
        "response" in err &&
        (err as { response: { data: { message: string } } }).response?.data
          ?.message
          ? (err as { response: { data: { message: string } } }).response.data
              .message
          : "Signup failed — check that the server is running";
      alert(message);
    }
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
      <Button id="wd-signup-btn" className="w-100 mb-3" onClick={handleSignup}>
        Signup
      </Button>
      <Link id="wd-signin-link" href="/account/signin">
        Signin
      </Link>
    </div>
  );
}
