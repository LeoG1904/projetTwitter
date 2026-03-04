import { Box } from "@mui/material";
import TweetCard from "../../../domains/tweets/components/TweetCard/TweetCard";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

interface ProfileFeedProps {
  userId: number;
  currentUser: string;
  loading?: boolean;
}

export default function ProfileFeed({ userId, currentUser, loading }: ProfileFeedProps) {
  const tweets = useSelector((state: RootState) => state.tweets.tweets);

  if (loading) return <p>Loading tweets...</p>;

  const userTweets = tweets.filter(tweet => tweet.owner.id === userId);

  if (!userTweets.length) return <p>Pas encore de tweets.</p>;

  return (
    <Box className="profile__feed">
      {userTweets.map(tweet => (
        <TweetCard
          key={tweet.id}
          tweet={tweet}
          currentUser={currentUser}
        />
      ))}
    </Box>
  );
}