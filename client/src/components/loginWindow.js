import React, { Component } from "react";

class LoginWingow extends Component {
  Login = () => {
    fetch("/api/login");
  };

  render() {
    return (
      <body>
        <a href="https://github.com/login/oauth/authorize?client_id=675b21a693ede89510cb">
          Login with github
        </a>
      </body>
    );
  }
}

export default LoginWingow;
