import { useState } from "react";
import LoginCard from "../LoginCard/LoginCard";
import "./LoginPage.scss";

interface LoginPageProps {
  onSuccess?: () => void;
}

const LoginPage = ({ onSuccess }: LoginPageProps) => {
  const [_version] = useState("v4.12.1");
  const [_isOnline] = useState(true);

  return (
    <div className="loginContainer">
      <div className="loginWrap">
        {/* Brand Header */}
        <div className="brandRow">
          <p className="brand">Keyloop &middot; Operate</p>
          <h1 className="pageTitle">Sign in</h1>
        </div>

        {/* Login Form Component */}
        <LoginCard onSuccess={onSuccess} />

        {/* Footer */}
        <p className="footer">© 2026 Quynh Huong. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LoginPage;
