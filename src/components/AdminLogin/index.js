import React from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../../store/hooks";

const AdminLogin = ({ history }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signInAdmin } = useAuth();
  return (
    <div>
      <span>Food Hubb</span>

      <input
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button
        onClick={() => {
          signInAdmin({
            email,
            password,
          });
          history.push("/dashboard");
        }}
      >
        Sign-In
      </Button>
    </div>
  );
};

export default AdminLogin;
