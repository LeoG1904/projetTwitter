import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Home.scss";
import TweetForm from "../../domains/tweets/components/TweetForm/TweetForm";
import TweetCard from "../../domains/tweets/components/TweetCard/TweetCard";
import type { RootState } from "../../app/store";
import { loadUser } from "../../domains/users/slice";
import { useAppDispatch } from "../../hooks/hooks";
import { createTweetThunk, fetchTweetsThunk } from "../../domains/tweets/slice";
import TweetOrder from "../../domains/tweets/components/TweetOrder/TweetOrder";
import TweetFilter from "../../domains/tweets/components/TweetFilter/TweetFilter";

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
    if (!user) dispatch(loadUser());
  }, [user, dispatch]);

  // 🔹 Charger les tweets dès que le user et le token sont prêts
  useEffect(() => {
    if (user && token) dispatch(fetchTweetsThunk(token));
  }, [user, token, dispatch]);

  // 🔹 Gestion de l’envoi d’un nouveau tweet
  const handleTweet = (content: string) => {
    if (!token) return;
    dispatch(createTweetThunk({ payload: { content }, token }));
  };

  if (userLoading || tweetsLoading || !user) return <p>Loading...</p>;

  const setFilter = (filter: string) => console.log("Filtre sélectionné :", filter);
  const setOrder = (order: string) => console.log("Ordre sélectionné :", order);

  return (
    <div className="home">
      <TweetForm avatar={user.avatar || ""} onTweet={handleTweet} />
      <div style={{ display: "flex", width: "100%", alignItems: "center", marginBottom: 12 }}>
        <TweetFilter onChange={setFilter} />
        <TweetOrder onChange={setOrder} />
      </div>

      {/* 🔹 Affichage des tweets avec le TweetCard refactoré */}
      {tweets.map(tweet => (
        <TweetCard
          key={tweet.id}
          tweet={tweet}                // ← on passe directement le tweet
          currentUser={user.username}  // ← compare avec owner.username dans TweetCard
        />
      ))}
    </div>
  );
}

export default Home;