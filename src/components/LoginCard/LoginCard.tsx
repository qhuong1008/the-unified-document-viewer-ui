import { useState, type ChangeEvent } from "react";
import InputField from "../InputField/InputField";
import { useAuth } from "../../context/AuthContext";
import "./LoginCard.scss";

interface LoginCardProps {
  onSuccess?: () => void;
}

const LoginCard = ({ onSuccess }: LoginCardProps) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    const { username, password } = formData;
    if (!username || !password) {
      setError("Please enter your username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await login(username, password);
      onSuccess?.();
    } catch (err) {
      setLoading(false);
      setError("Incorrect username or password.");
    }
  };

  return (
    <div className="card">
      <p className="card-title">Welcome back</p>
      <p className="card-sub">Enter your credentials to access the platform.</p>

      <InputField
        label="Username"
        id="username"
        type="text"
        placeholder="you@keyloop.com"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        error={!!(error && !formData.username)}
        rightLabel={undefined}
      />

      <InputField
        label="Password"
        id="password"
        type="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormData({ ...formData, password: e.target.value })
        }
        error={!!(error && !formData.password)}
        rightLabel={
          <a href="#" className="forgot-link">
            Forgot password?
          </a>
        }
      />

      {error && <p className="error-msg visible">{error}</p>}

      <button
        className="submit-btn"
        onClick={handleSignIn}
        disabled={loading}
        style={{ opacity: loading ? 0.6 : 1 }}
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>

      <div className="or-divider">or</div>

      <button className="sso-btn">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Continue with SSO
      </button>
    </div>
  );
};

export default LoginCard;
