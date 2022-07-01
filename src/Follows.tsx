import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { refreshToken } from "./utils/refresh-token";

type TokenObj = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};

type FollowObj = {
  id: string;
  name: string;
  username: string;
};

type FollowsApiResp = {
  data: FollowObj[];
  meta: {
    result_count: number;
    next_token: string;
  };
};

const Follows = () => {
  const navigate = useNavigate();
  const [follows, setFollows] = useState<FollowObj[]>([]);
  const [token, setToken] = useState<string>("");

  const getFollows = async (token: string) => {
    if (!token) return null;

    try {
      const req = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/follows`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (req.status === 401) {
        const new_token = await refreshToken();
        setToken(new_token);
        return;
      }

      const { data } = (await req.json()) as {
        status: boolean;
        data: FollowsApiResp;
      };
      setFollows(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const tokenObj: TokenObj = JSON.parse(
      localStorage.getItem("token") || "null"
    );
    if (!tokenObj) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    if (token) getFollows(token);
  }, [token]);

  return (
    <div className="follows-page">
      <h1>Follows:</h1>
      <div className="users-grid">
        {follows.map(({ id, username, name }) => (
          <Link to={`/tweets/${id}`} key={id} className="users-grid__item">
            <h2>{name}</h2>
            <h3>@{username}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Follows;
