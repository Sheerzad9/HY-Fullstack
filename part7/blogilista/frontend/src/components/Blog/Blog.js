import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog, updateBlogLikes } from "../../reducers/blogReducer";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const [showDetails, setShowDetails] = useState(false);

  const handleDelete = async () => {
    dispatch(deleteBlog(blog));
  };

  const handleLike = async () => {
    dispatch(
      updateBlogLikes({
        newLikes: blog.likes + 1,
        blogId: blog.id,
      })
    );
  };

  return (
    <div className="blog" data-testid="blog">
      {!showDetails ? (
        <div>
          Title: <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
          <button
            id="show_more_btn"
            onClick={() => setShowDetails(!showDetails)}
          >
            Show more
          </button>
        </div>
      ) : (
        <>
          Title: <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
          <br />
          Author: {blog.author}
          <br />
          Url: {blog.url}
          <br />
          Likes: {blog.likes}{" "}
          <button id="like_blog_btn" onClick={handleLike}>
            Like
          </button>
          <br />
          <button onClick={() => setShowDetails(!showDetails)}>
            Show Less
          </button>
          <button
            onClick={handleDelete}
            style={{ color: "white", backgroundColor: "Red" }}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default Blog;
