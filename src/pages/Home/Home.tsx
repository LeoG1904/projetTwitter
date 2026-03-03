import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Home.scss";
import TweetForm from "../../domains/tweets/components/TweetForm/TweetForm";
import TweetCard from "../../domains/tweets/components/TweetCard/TweetCard";
import type { RootState } from "../../app/store";
import { loadUser } from "../../domains/users/slice";
import { useAppDispatch } from "../../hooks/hooks";
import { createTweetThunk, fetchTweetsThunk } from "../../domains/tweets/slice";
import TweetFilter from "../../domains/tweets/components/TweetFilter/TweetFilter";
import TweetOrder from "../../domains/tweets/components/TweetOrder/TweetOrder";

function Home() {
  const dispatch = useAppDispatch();

  // 🔹 User depuis Redux
  const { profile: user, loading: userLoading } = useSelector(
    (state: RootState) => state.user
  );

  // 🔹 Tweets depuis Redux
  const { tweets = [], loading: tweetsLoading } = useSelector(
    (state: RootState) => state.tweets
  );

  // 🔹 Auth token
  const { token } = useSelector((state: RootState) => state.auth);

  // 🔹 Charger le user si non présent
  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [user, dispatch]);

  // 🔹 Charger les tweets dès que le user et le token sont prêts
  useEffect(() => {
    if (user && token) {
      dispatch(fetchTweetsThunk(token));
    }
  }, [user, token, dispatch]);

  // 🔹 Gestion de l’envoi d’un nouveau tweet
  const handleTweet = (content: string) => {
    if (!token) return; // sécurité
    dispatch(createTweetThunk({ payload: { content }, token }));
  };

  // 🔹 Afficher loader si user ou tweets non chargés
  if (userLoading || tweetsLoading || !user) return <p>Loading...</p>;

  // 🔹 Transformation pour rendre compatible avec TweetCard
  const displayedTweets = Array.isArray(tweets)
    ? tweets.map(tweet => ({
        id: tweet.id,
        content: tweet.content,
        createdAt: tweet.createdAt,
        ownerName: `user${tweet.ownerId}`,       // temporaire
        ownerAvatar: "https://i.pravatar.cc/150?img=32",
        likes: tweet.likeCount,
        retweets: 0,
        replies: tweet.commentCount,
      }))
    : [];

  
  
  const setFilter = (filter: string) => {
    console.log("Filtre sélectionné :", filter);
  }
  const setOrder = (order: string) => {
    console.log("Ordre sélectionné :", order);
  }
  
  return (
    <div className="home">
      <TweetForm avatar={user.avatar || ""} onTweet={handleTweet} />
      <div style={{ display: "flex", width: "100%", alignItems: "center", marginBottom: 12 }}>
        <TweetFilter onChange={setFilter} />
        <TweetOrder onChange={setOrder} />
      </div>
      {/* 🔹 Affichage simple des tweets */}
      {displayedTweets.map(tweet => (
        <TweetCard
          key={tweet.id}
          id={tweet.id}
          avatar={tweet.ownerAvatar}
          name={tweet.ownerName}
          username={`@${tweet.ownerName}`}
          date={`${Math.round(
            (new Date().getTime() - new Date(tweet.createdAt).getTime()) / 60000
          )}m`}
          content={tweet.content}
          likes={tweet.likes || 0}
          retweets={tweet.retweets || 0}
          replies={tweet.replies || 0}
          currentUser={`@${user.username}`}
        />
      ))}
    </div>
  );
}

export default Home;