import blogService from "../services/blogs";

const CreateBlogForm = ({ setNotification, onBlogCreatedSuccessfully }) => {
  let title, author, url;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await blogService.createBlog({ title, author, url });
      onBlogCreatedSuccessfully();
      setNotification({
        type: "success",
        message: "Blog created successfully!",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (e) {
      setNotification({ type: "error", message: e });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      console.log("Error: ", e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            id="blog_title"
            type="text"
            value={title}
            onChange={({ target }) => (title = target.value)}
          ></input>
        </div>
        <div>
          author:
          <input
            id="blog_author"
            type="text"
            value={author}
            onChange={({ target }) => (author = target.value)}
          ></input>
        </div>
        <div>
          url:
          <input
            id="blog_url"
            type="text"
            value={url}
            onChange={({ target }) => (url = target.value)}
          ></input>
        </div>
        <button id="submit_blog_btn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
