import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen" style={{ maxWidth: "400px" }}>
      <h3>Signup</h3>
      <FormControl id="wd-username" placeholder="username" className="mb-3" />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-3"
      />
      <FormControl
        id="wd-verify-password"
        placeholder="verify password"
        type="password"
        className="mb-3"
      />
      <Link
        id="wd-signup-btn"
        href="/account/profile"
        className="btn btn-primary w-100 mb-3"
      >
        Signup
      </Link>
      <Link id="wd-signin-link" href="/account/signin">
        Signin
      </Link>
    </div>
  );
}
