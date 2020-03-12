import React from "react";
import { Button } from "reactstrap";

// import GitHubLogin from "react-github-login";
import { useAuth } from "react-use-auth";

const LoginWingow = () => {
  //   const { isAuthenticated, login, logout } = useAuth();
  const { login, logout } = useAuth();

  return (
    <nav>
      <Button onClick={() => login()}>Login</Button>
      <Button onClick={() => logout()}>Logout</Button>
    </nav>
  );
};

export default LoginWingow;
