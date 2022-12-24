import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogService from "../../services/blogs";
import { useDispatch } from "react-redux";
import { updateBlogLikes } from "../../reducers/blogReducer";

const SingleBlogView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    blogService.getSingleBlog(id).then((blog) => setBlog(blog));
  });

  const handleLike = async () => {
    dispatch(
      updateBlogLikes({
        newLikes: blog.likes + 1,
        blogId: blog.id,
      })
    );
  };

  return !blog ? null : (
    <div className="container">
      <div className="col-md-12">
        <h2>Blog details</h2>
        <hr />
        <h3>
          Title: <b>{blog.title}</b>
        </h3>
        <h5>
          Url: <a href={blog.url}>{blog.url}</a>
        </h5>
        <h5>
          {blog.likes} likes <button onClick={handleLike}>Like</button>
        </h5>
        <h5>Added by {blog.author}</h5>
      </div>
    </div>
  );
};

export default SingleBlogView;
