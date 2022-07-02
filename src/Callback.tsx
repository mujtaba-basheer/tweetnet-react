import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [token, setToken] = useState("");

  const fetchToken = (mid: string) => {
    fetch(`${process.env.REACT_APP_BASE_URL}/auth/token`, {
      method: "POST",
      body: JSON.stringify({ code, mid }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ data }) => {
        localStorage.setItem("token", JSON.stringify(data));
        setToken(data.access_token);
        setTimeout(() => navigate("/follows"), 10000);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const paramsCode = searchParams.get("code");
    if (paramsCode) {
      setCode(paramsCode);
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return (
    <div className="container">
      <h1>Redirecting to Follows...</h1>
      {token && <textarea value={token} />}

      <select
        onChange={(ev) => {
          const val = ev.target.value;
          if (val) fetchToken(val);
        }}
      >
        <option selected disabled value="">
          Select Username
        </option>
        <option value="62bda0b3945ec700049f88b0">mujtaba_basheer</option>
        <option value="62bfe94849f91800040ae75a">mujtaba_dev</option>
      </select>
    </div>
  );
};

export default Callback;
