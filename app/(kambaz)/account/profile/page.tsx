import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" style={{ maxWidth: "500px" }}>
      <h3>Profile</h3>
      <FormControl
        id="wd-username"
        defaultValue="alice"
        placeholder="username"
        className="mb-3"
      />
      <FormControl
        id="wd-password"
        type="password"
        defaultValue="123"
        placeholder="password"
        className="mb-3"
      />
      <FormControl
        id="wd-firstname"
        defaultValue="Alice"
        placeholder="First Name"
        className="mb-3"
      />
      <FormControl
        id="wd-lastname"
        defaultValue="Wonderland"
        placeholder="Last Name"
        className="mb-3"
      />
      <FormControl
        id="wd-dob"
        type="date"
        defaultValue="2000-01-01"
        className="mb-3"
      />
      <FormControl
        id="wd-email"
        type="email"
        defaultValue="alice@wonderland.com"
        placeholder="email"
        className="mb-3"
      />
      <FormControl
        as="select"
        id="wd-role"
        defaultValue="USER"
        className="mb-3"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormControl>
      <Link href="/account/signin" className="btn btn-danger w-100">
        Signout
      </Link>
    </div>
  );
}
