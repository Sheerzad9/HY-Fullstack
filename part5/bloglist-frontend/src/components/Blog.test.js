import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;

  beforeEach(() => {
    const initialBlog = {
      title: "Title for testing :-)",
      author: "Testmania",
      url: "www.testmania.fi",
      likes: 0,
    };

    container = render(<Blog blog={initialBlog}></Blog>).container;
  });

  test("Blog shows initially only title", () => {
    const titleInUI = screen.getByText("Title for testing :-)", {
      exact: false,
    });

    expect(titleInUI).toBeDefined();
  });

  test("Blog shows additional information after clickin it", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("Show more");
    await user.click(button);

    const blogElement = screen.getByTestId("blog");

    expect(blogElement).toHaveTextContent("Author: Testmania");
    expect(blogElement).toHaveTextContent("Url: www.testmania.fi");
    expect(blogElement).toHaveTextContent("Likes: 0");
  });
});
