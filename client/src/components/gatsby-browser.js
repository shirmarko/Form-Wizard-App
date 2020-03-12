import React from "react";
import { navigate } from "gatsby";

import { AuthProvider } from "react-use-auth";

export const wrapRootElement = ({ element }) => (
  <AuthProvider
    navigate={navigate}
    auth0_domain="shirmarko.auth0.com"
    auth0_client_id="3VNmH7Q1uUxw3079b3u2jvjYJH5Ge3LP"
  >
    {element}
  </AuthProvider>
);
