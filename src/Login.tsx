import { useState, useEffect } from "react";

const Login = () => {
  const [authUrl, setAuthUrl] = useState("");
  const getAuthUrl = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/authorize`)
      .then((res) => res.json())
      .then(({ data }) => {
        setAuthUrl(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getAuthUrl();
  }, []);

  return (
    <div className="container">
      <a className="login-btn" href={authUrl}>
        Log In
      </a>
    </div>
  );
};

export default Login;
