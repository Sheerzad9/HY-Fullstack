import blogService from "../services/blogs";

const CreateBlogForm = ({ setNotification }) => {
  let title, author, url;

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("title: ", title, ", author: ", author, ", url: ", url);
    try {
      await blogService.createBlog({ title, author, url });
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
            type="text"
            value={title}
            onChange={({ target }) => (title = target.value)}
          ></input>
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => (author = target.value)}
          ></input>
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => (url = target.value)}
          ></input>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
