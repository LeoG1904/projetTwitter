import { Box, Button } from "@mui/material";
import { useState } from "react";
import "./TweetFilter.scss";

interface TweetFilterProps {
  onChange: (filter: "all" | "following") => void;
}

export default function TweetFilter({ onChange }: TweetFilterProps) {
  const [active, setActive] = useState<"all" | "following">("all");

  const handleClick = (value: "all" | "following") => {
    setActive(value);
    onChange(value);
  };

  return (
    <Box className="tweet-filter">
      <Button
        variant={active === "all" ? "contained" : "outlined"}
        onClick={() => handleClick("all")}
      >
        All Tweets
      </Button>
      <Button
        variant={active === "following" ? "contained" : "outlined"}
        onClick={() => handleClick("following")}
      >
        Following
      </Button>
    </Box>
  );
}