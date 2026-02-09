import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signin() {
  return (
    <div id="wd-signin-screen" style={{ maxWidth: "400px" }}>
      <h3>Signin</h3>
      <FormControl id="wd-username" placeholder="username" className="mb-3" />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-3"
      />
      <Link
        id="wd-signin-btn"
        href="/account/profile"
        className="btn btn-primary w-100 mb-3"
      >
        Signin
      </Link>
      <Link id="wd-signup-link" href="/account/signup">
        Signup
      </Link>
    </div>
  );
}
