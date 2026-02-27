import { Box } from "@mui/material";
import "./ProfileFeed.scss";
import TweetCard from "../../../domains/tweets/components/TweetCard/TweetCard";

export default function ProfileFeed() {
  // Tableau de tweets fictifs
  const mockTweets = [
    {
      id: 1,
      avatar: "https://i.pravatar.cc/150?img=32",
      name: "Jane Doe",
      username: "@janedoe",
      date: "1h",
      content: "Ceci est un tweet de test pour le profil ! #React #BEM #SCSS",
      likes: 10,
      retweets: 3,
      replies: 2,
    },
    {
      id: 2,
      avatar: "https://i.pravatar.cc/150?img=12",
      name: "John Smith",
      username: "@johnsmith",
      date: "2h",
      content: "Encore un autre tweet pour tester le feed. #Frontend #UI",
      likes: 5,
      retweets: 1,
      replies: 0,
    },
    {
      id: 3,
      avatar: "https://i.pravatar.cc/150?img=45",
      name: "Alice Cooper",
      username: "@alicecooper",
      date: "3h",
      content: "Dernier tweet fictif pour voir comment ça rend ! #ReactJS #SCSS",
      likes: 20,
      retweets: 8,
      replies: 5,
    },
  ];

  return (
    <Box className="profile__feed" display="flex" flexDirection="column" gap={16}>
      {mockTweets.map((tweet) => (
        <TweetCard
          key={tweet.id}
          avatar={tweet.avatar}
          name={tweet.name}
          username={tweet.username}
          date={tweet.date}
          content={tweet.content}
          likes={tweet.likes}
          retweets={tweet.retweets}
          replies={tweet.replies}
        />
      ))}
    </Box>
  );
}