import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard.jsx";

const FetchPosts = function ({ uri }) {
  const [currentPosts, setCurrentPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageNumberInput, setPageNumberInput] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${uri}/${page}`, {
          withCredentials: true,
        });

        if (response.data?.success) {
          setCurrentPosts(response.data.data);
        } else {
          setCurrentPosts([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, [page, uri]);

  const handlePageChange = (event) => {
    event.preventDefault();
    setPageNumberInput(event.target.value);
  };

  const handlePage = (event) => {
    event.preventDefault();
    setPage(pageNumberInput);
  };

  return (
    <>
      {currentPosts.length > 0 ? (
        <>
          {currentPosts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </>
      ) : (
        <h3 style={{ color: "black" }}>No posts to show</h3>
      )}
      <form
        onSubmit={handlePage}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <label htmlFor="page-number">Page</label>
        <input
        id="page-number"
          type="number"
          onChange={handlePageChange}
          value={pageNumberInput}
          style={{ width: "20rem" }}
        />
        <button type="submit">Go</button>
      </form>
    </>
  );
};

export default FetchPosts;
