import TweetCard from "../domains/tweets/components/TweetCard/TweetCard";
import TweetForm from "../domains/tweets/components/TweetForm/TweetForm";
import "./Home.scss";

function Home() {
  const mockTweet = {
    avatar: "https://i.pravatar.cc/150?img=32",
    name: "Jane Doe",
    username: "@janedoe",
    date: "2h",
    content: "Voici un tweet fictif pour tester le front-end ! #React #BEM #SCSS",
    likes: 12,
    retweets: 5,
    replies: 3,
  };

  const handleTweet = (content: string) => {
    console.log("Tweet envoyé :", content);
  };

  return (
    <div className="home">
      <TweetForm avatar="https://i.pravatar.cc/150?img=32" onTweet={handleTweet} />
      <TweetCard
        avatar={mockTweet.avatar}
        name={mockTweet.name}
        username={mockTweet.username}
        date={mockTweet.date}
        content={mockTweet.content}
        likes={mockTweet.likes}
        retweets={mockTweet.retweets}
        replies={mockTweet.replies}
      />
    </div>
  );
}

export default Home;