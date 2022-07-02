type TokenObj = {
  access_token: string;
  refresh_token: string;
};

export const refreshToken: () => Promise<string> = () => {
  return new Promise((res, rej) => {
    const tokenObj: TokenObj = JSON.parse(localStorage.getItem("token") || "");

    fetch(`${process.env.REACT_APP_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenObj.access_token}`,
      },
      body: JSON.stringify({
        token: {
          refresh_token: tokenObj.refresh_token,
        },
      }),
    })
      .then((resp) => {
        if (resp.status !== 200)
          throw new Error("Your session has expired! Please login again.");
        return resp.json();
      })
      .then((data: { status: boolean; data: TokenObj }) => {
        localStorage.setItem("token", JSON.stringify(data.data));
        res(data.access_token);
      })
      .catch(rej);
  });
};
