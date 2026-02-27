import { useState } from "react";
import "./Home.scss";
import TweetForm from "../../domains/tweets/components/TweetForm/TweetForm";
import TweetFilter from "../../domains/tweets/components/TweetFilter/TweetFilter";
import TweetOrder from "../../domains/tweets/components/TweetOrder/TweetOrder";
import TweetCard from "../../domains/tweets/components/TweetCard/TweetCard";

function Home() {
  const [filter, setFilter] = useState<"all" | "following">("all");
  const [order, setOrder] = useState<"date" | "likes" | "retweets" | "replies">("date");

  const mockTweets = [
    {
      id: 1,
      avatar: "https://i.pravatar.cc/150?img=32",
      name: "Jane Doe",
      username: "@janedoe",
      date: new Date().getTime() - 1000 * 60 * 60, // 1h ago
      content: "Ceci est un tweet de test !",
      likes: 10,
      retweets: 3,
      replies: 2,
      following: true,
    },
    {
      id: 2,
      avatar: "https://i.pravatar.cc/150?img=12",
      name: "John Smith",
      username: "@johnsmith",
      date: new Date().getTime() - 1000 * 60 * 120, // 2h ago
      content: "Encore un autre tweet pour tester le feed.",
      likes: 5,
      retweets: 1,
      replies: 0,
      following: false,
    },
    {
      id: 3,
      avatar: "https://i.pravatar.cc/150?img=45",
      name: "Alice Cooper",
      username: "@alicecooper",
      date: new Date().getTime() - 1000 * 60 * 180, // 3h ago
      content: "Dernier tweet fictif pour voir comment ça rend !",
      likes: 20,
      retweets: 8,
      replies: 5,
      following: true,
    },
  ];

  // Filtrer les tweets
  let displayedTweets = mockTweets.filter((t) => (filter === "following" ? t.following : true));

  // Trier les tweets
  displayedTweets.sort((a, b) => {
    switch (order) {
      case "date":
        return b.date - a.date;
      case "likes":
        return b.likes - a.likes;
      case "retweets":
        return b.retweets - a.retweets;
      case "replies":
        return b.replies - a.replies;
      default:
        return 0;
    }
  });

  const handleTweet = (content: string) => {
    console.log("Tweet envoyé :", content);
  };

  return (
    <div className="home">
      <TweetForm avatar="https://i.pravatar.cc/150?img=32" onTweet={handleTweet} />

      <div style={{ display: "flex", width: "100%", alignItems: "center", marginBottom: 12 }}>
        <TweetFilter onChange={setFilter} />
        <TweetOrder onChange={setOrder} />
      </div>

      {displayedTweets.map((tweet) => (
        <TweetCard
          key={tweet.id}
          avatar={tweet.avatar}
          name={tweet.name}
          username={tweet.username}
          date={`${Math.round((new Date().getTime() - tweet.date)/60000)}m`}
          content={tweet.content}
          likes={tweet.likes}
          retweets={tweet.retweets}
          replies={tweet.replies}
        />
      ))}
    </div>
  );
}

export default Home;