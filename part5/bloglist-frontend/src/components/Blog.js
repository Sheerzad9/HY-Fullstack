import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setNotification }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleNotification = (notificationOptions) => {
    setNotification(notificationOptions);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleDelete = async () => {
    if (
      window.confirm(`Are you sure you wan't to remoove blog: '${blog.title}'`)
    ) {
      try {
        const res = await blogService.deleteBlog(blog.id);
        handleNotification({ type: "success", message: res.message });
      } catch (e) {
        handleNotification({ type: "error", message: e.response.data.error });
      }
    }
  };

  const handleLike = async () => {
    try {
      const updatedBlog = await blogService.updateBlogLikes({
        newLikes: blog.likes + 1,
        blogId: blog.id,
      });

      handleNotification({
        type: "success",
        message: "Like's updated successfully!",
      });
    } catch (e) {
      handleNotification({
        type: "error",
        message: "Something went wrong! Try again later",
      });
    }
  };

  return (
    <div className="blog">
      {!showDetails ? (
        <>
          Title: {blog.title}{" "}
          <button onClick={() => setShowDetails(!showDetails)}>
            Show more
          </button>
        </>
      ) : (
        <>
          Title: {blog.title}
          <br />
          Author: {blog.author}
          <br />
          Url: {blog.url}
          <br />
          Likes: {blog.likes} <button onClick={handleLike}>Like</button>
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
