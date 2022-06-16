import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

type TokenObj = {
  token: {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
  };
};
type TweetObj = {
  id: string;
  text: string;
  reply: boolean;
};
type TweetsApiResp = {
  status: boolean;
  data: {
    data: TweetObj[];
    meta: {
      oldest_id: string;
      newest_id: string;
      result_count: number;
      next_token: string;
    };
  };
};
type LikeApiResp = {
  status: boolean;
  data: {
    data: {
      liked: boolean;
    };
  };
};
type RetweetApiResp = {
  status: boolean;
  data: {
    data: {
      retweeted: boolean;
    };
  };
};

type ReplyApiResp = {
  status: boolean;
  data: {
    data: {
      id: string;
      text: string;
    };
  };
};

const Tweets = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [token, setToken] = useState<string>("");
  const [tweets, setTweets] = useState<TweetObj[]>([]);
  const [replyText, setReplyText] = useState<string>("");

  const getTweets = async (userId: string, token: string) => {
    if (!token) return null;

    try {
      const req = await fetch(
        `${process.env.REACT_APP_BASE_URL}/tweets/${userId}`,
        {
          method: "GET",
          headers: { Authorization: token },
        }
      );

      const { data } = (await req.json()) as TweetsApiResp;
      setTweets(data.data.map((x) => ({ ...x, reply: false })));
    } catch (error) {
      console.error(error);
    }
  };

  const likeTweet = async (tweetId: string) => {
    if (!token) return null;

    try {
      const req = await fetch(`${process.env.REACT_APP_BASE_URL}/like`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tweet_id: tweetId }),
      });

      const { status, data } = (await req.json()) as LikeApiResp;
      if (status && data.data.liked) window.alert("Tweet Liked!");
    } catch (error) {
      console.error(error);
    }
  };

  const retweetTweet = async (tweetId: string) => {
    if (!token) return null;

    try {
      const req = await fetch(`${process.env.REACT_APP_BASE_URL}/retweet`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tweet_id: tweetId }),
      });

      const { status, data } = (await req.json()) as RetweetApiResp;
      if (status && data.data.retweeted) window.alert("Tweet Retweeted!");
    } catch (error) {
      console.error(error);
    }
  };

  const openReply = (_id: string) => {
    setTweets((arr) =>
      arr.map((x) => {
        if (x.id === _id) x.reply = true;
        else x.reply = false;
        return x;
      })
    );
    setReplyText("");
  };

  const closeReply = (_id: string) => {
    setTweets((arr) =>
      arr.map((x) => {
        if (x.id === _id) x.reply = false;
        return x;
      })
    );
    setReplyText("");
  };

  const postReply = async (_id: string) => {
    try {
      const request = await fetch(`${process.env.REACT_APP_BASE_URL}/reply`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tweet_id: _id,
          text: replyText,
        }),
      });

      const { status } = (await request.json()) as ReplyApiResp;
      if (status) {
        alert("Reply Posted Successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("Error Posting Reply :-/");
    }

    setTweets((arr) => arr.map((x) => ({ ...x, reply: false })));
    setReplyText("");
  };

  useEffect(() => {
    const tokenObj: TokenObj = JSON.parse(
      sessionStorage.getItem("token") || "null"
    );
    if (tokenObj && params.id) {
      setToken(tokenObj.token.access_token);
      getTweets(params.id, tokenObj.token.access_token);
    } else navigate("/login");
  }, [navigate, params.id]);

  return (
    <div className="tweets-page">
      <h1>Tweets</h1>
      <div className="tweets-grid">
        {tweets.map(({ id, text, reply }) => (
          <div className="tweets-grid__item" id={id}>
            <p>{text}</p>
            <div className="tweets-grid__item-bar">
              <button onClick={() => retweetTweet(id)}>Retweet</button>
              <button onClick={() => likeTweet(id)}>Like</button>
              <button onClick={() => openReply(id)}>Reply</button>
            </div>
            {reply && (
              <div className="tweets-grid__item-reply">
                <textarea
                  value={replyText}
                  onChange={(ev) => setReplyText(ev.target.value)}
                />
                <div className="tweets-grid__item-reply-bar">
                  <button disabled={!replyText} onClick={() => postReply(id)}>
                    Post Reply
                  </button>
                  <button onClick={() => closeReply(id)}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tweets;
