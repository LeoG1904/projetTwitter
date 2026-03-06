import { Box, Select, MenuItem } from "@mui/material";
import "./TweetOrder.scss";

interface TweetOrderProps {
  order: "date" | "likes" | "retweets" | "replies"; //   ordre contrôlé
  onChange: (order: "date" | "likes" | "retweets" | "replies") => void;
}

export default function TweetOrder({ order, onChange }: TweetOrderProps) {
  const handleChange = (event: any) => {
    onChange(event.target.value);
  };

  return (
    <Box className="tweet-order">
      <Select value={order} onChange={handleChange} size="small">
        <MenuItem value="date">Date</MenuItem>
        <MenuItem value="likes">Likes</MenuItem>
        <MenuItem value="retweets">Retweets</MenuItem>
        <MenuItem value="replies">Comments</MenuItem>
      </Select>
    </Box>
  );
}