import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      navigate("/login");
    } else {
      fetch(`${process.env.REACT_APP_BASE_URL}/token`, {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(({ data }) => console.log(data))
        .catch((err) => console.error(err));
    }
  }, [searchParams, navigate]);

  return (
    <div className="container">
      <h1>Welcome!</h1>
    </div>
  );
};

export default Callback;
