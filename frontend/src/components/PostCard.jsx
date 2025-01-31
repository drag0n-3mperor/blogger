import { useEffect, useState } from "react";
import "./PostCard.css";
import axios from "axios";

const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchLikedData = async () => {
      const response = await axios.get(
        `http://localhost:3000/post/show/${post._id}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setIsLiked(response.data.data.isLiked);
        setLikes(response.data.data.likes);
      }
    };
    fetchLikedData();
  }, []);

  const toggleLiked = async (e) => {
    const response = await axios.get(
      `http://localhost:3000/post/like/toggle/${post._id}`,
      {
        withCredentials: true,
      }
    );
    if (response.data.success) {
      setIsLiked(response.data.data.isLiked);
      setLikes(response.data.data.likes);
    } else {
      console.log("Failed to proceed");
    }
  };

  return (
    <div className="postcard-container">
      <h2 className="postcard-title">{post.title}</h2>
      <div className="postcard-content-container">
        <p className="postcard-content">{post.content}</p>
      </div>
      <div className="postcard-button-container">
        <button onClick={toggleLiked} className="postcard-button">
          <div>{isLiked ? "Liked" : "Like"}</div>
          <div>{likes}</div>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
