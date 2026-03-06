import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Home.scss";
import TweetForm from "../../domains/tweets/components/TweetForm/TweetForm";
import TweetCard from "../../domains/tweets/components/TweetCard/TweetCard";
import type { RootState } from "../../app/store";
import { loadUser } from "../../domains/users/slice";
import { useAppDispatch } from "../../hooks/hooks";
import {
  createTweetThunk,
  fetchFilteredTweetsThunk
} from "../../domains/tweets/slice";
import TweetOrder from "../../domains/tweets/components/TweetOrder/TweetOrder";
import TweetFilter from "../../domains/tweets/components/TweetFilter/TweetFilter";

function Home() {
  const dispatch = useAppDispatch();

  //   User depuis Redux
  const { profile: user, loading: userLoading } = useSelector(
    (state: RootState) => state.user
  );

  //   Tweets depuis Redux
  const { tweets = [], loading: tweetsLoading } = useSelector(
    (state: RootState) => state.tweets
  );

  //   Auth token
  const { token } = useSelector((state: RootState) => state.auth);

  //   Filtre et ordre locaux pour combiner
  const [currentFilter, setCurrentFilter] = useState<"all" | "following">("all");
  const [currentOrder, setCurrentOrder] = useState<"date" | "likes" | "retweets" | "replies">("date");

  //   Charger le user si non présent
  useEffect(() => {
    if (!user) dispatch(loadUser());
  }, [user, dispatch]);

  //   Charger les tweets dès que le user, le token, le filtre ou l’ordre changent
  useEffect(() => {
    if (user && token) {
      dispatch(fetchFilteredTweetsThunk({ filter: currentFilter, order: currentOrder, token }));
    }
  }, [user, token, currentFilter, currentOrder, dispatch]);

  //   Gestion de l’envoi d’un nouveau tweet
  const handleTweet = (content: string) => {
    if (!token) return;
    dispatch(createTweetThunk({ payload: { content }, token }));
  };

  //   Changer le filtre (all / following)
  const handleFilterChange = (filter: "all" | "following") => {
    setCurrentFilter(filter);
  };

  //   Gérer l’ordre
  const handleOrderChange = (order: "date" | "likes" | "retweets" | "replies") => {
    setCurrentOrder(order);
  };

  if (userLoading || tweetsLoading || !user) return <p>Loading...</p>;

  return (
    <div className="home">
      {/* Formulaire de tweet */}
      <TweetForm avatar={user.avatar || ""} onTweet={handleTweet} />

      {/* Filtres & ordre */}
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          marginBottom: 12,
          gap: 12
        }}
      >
        <TweetFilter onChange={handleFilterChange} />
        <TweetOrder order={currentOrder} onChange={handleOrderChange} />
      </div>

      {/* Affichage des tweets */}
      {tweets.length === 0 ? (
        <p>No tweets found.</p>
      ) : (
        tweets.map(tweet => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            currentUser={user.username}
          />
        ))
      )}
    </div>
  );
}

export default Home;