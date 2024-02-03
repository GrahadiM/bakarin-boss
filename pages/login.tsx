import { useState } from "react";
import { useRouter } from "next/router";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/layout";
import styles from "../components/app.module.css";

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    if (username === "admin" && password === "admin") {
      router.push("/menu_tambah");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <section className={`container ${styles.about}`}>
      <h2>
        <span>Tentang</span> Kami
      </h2>
      <div className={`row ${styles.form}`}>
        <div className="col-md-6 offset-md-3">
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className={`text-danger ${styles.error}`}>{error}</p>}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

Login.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
