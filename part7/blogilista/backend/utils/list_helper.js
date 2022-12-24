const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const myReducer = (accumulator, curVal) => {
    return (accumulator += curVal.likes);
  };

  return blogs.reduce(myReducer, 0);
};

const blogWithMostLikes = (blogs) => {
  if (blogs.length === 0) return;
  let curBlogWithMostLikes = blogs[0];

  blogs.forEach((currentBlog) => {
    if (curBlogWithMostLikes.likes < currentBlog.likes)
      curBlogWithMostLikes = currentBlog;
  });
  return curBlogWithMostLikes;
};

const personWithMostBlogs = (blogs) => {
  if (blogs.length === 0) return;
  // initializing
  let personWithMostBlogs = {
    author: "init",
    blogs: 0,
  };

  blogs.forEach((currBlog) => {
    const arrayOfBlogsWithCurrentPerson = _.filter(blogs, function (cur) {
      return cur.author === currBlog.author;
    });

    if (arrayOfBlogsWithCurrentPerson.length > personWithMostBlogs.blogs) {
      personWithMostBlogs = {
        author: currBlog.author,
        blogs: arrayOfBlogsWithCurrentPerson.length,
      };
    }
  });
  return personWithMostBlogs;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return;

  // init
  let blogWithMostLikes = {
    author: "init",
    likes: -1,
  };

  blogs.forEach((curBlog) => {
    const myReducer = (accumulator, curEl) => {
      if (curEl.author === curBlog.author) accumulator += curEl.likes;
      return accumulator;
    };

    const curBlogLikes = blogs.reduce(myReducer, 0);
    if (curBlogLikes > blogWithMostLikes.likes) {
      blogWithMostLikes = {
        author: curBlog.author,
        likes: curBlogLikes,
      };
    }
  });
  return blogWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  blogWithMostLikes,
  personWithMostBlogs,
  mostLikes,
};
