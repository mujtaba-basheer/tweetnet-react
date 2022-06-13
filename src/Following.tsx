import { useEffect, useState } from "react";

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
  following: boolean;
};

type Follows = {
  data: FollowObj[];
  meta: {
    result_count: number;
    next_token: string;
  };
};

const Following = () => {
  const [token, setToken] = useState<TokenObj>({} as TokenObj);
  const [follows, setFollows] = useState<FollowObj[]>([]);
  const [ctaBtnText, setCtaBtnText] = useState<"Following" | "Unfollow">(
    "Following"
  );

  const getFollows = async () => {
    if (!token) return null;

    try {
      const req = await fetch(`${process.env.BASE_URL}/follows`, {
        method: "GET",
        headers: { Authorization: token.access_token },
      });

      const { data } = (await req.json()) as { status: boolean; data: Follows };
      setFollows(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const tokenObj = JSON.parse(sessionStorage.getItem("token") || "{}");
    if (tokenObj) setToken(tokenObj);

    getFollows();
  }, []);

  return (
    <div>
      <h1>Follows:</h1>
      <div className="users-grid">
        {follows.map(({ id, username, name, following }) => (
          <div key={id} className="users-grid__item">
            <div>
              <h2>{name}</h2>
              <h3>@{username}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Following;
