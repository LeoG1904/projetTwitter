import { Box } from "@mui/material";
import TweetCard from "../../../domains/tweets/components/TweetCard/TweetCard";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

interface ProfileFeedProps {
  userId: number;
  currentUser: string;
}

export default function ProfileFeed({ userId, currentUser }: ProfileFeedProps) {
  const { tweets, loading } = useSelector((state: RootState) => state.tweets);

  if (loading) return <p>Loading tweets...</p>;

  //   Filtrer les tweets du user avec userId passé en props
  const userTweets = tweets.filter(tweet => tweet.owner.id === userId);

  if (!userTweets.length) return <p>Pas encore de tweets.</p>;

  return (
    <Box className="profile__feed">
      {userTweets.map(tweet => (
        <TweetCard key={tweet.id} tweet={tweet} currentUser={currentUser} />
      ))}
    </Box>
  );
}