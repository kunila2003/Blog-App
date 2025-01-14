import React, { useState, useEffect } from "react";
import axios from "../api";
import BlogCard from "../components/BlogCard";
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  //get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
          id = {blog._id}
          isUser = {localStorage.getItem('userId')=== blog.user?._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user?.username}
            time={blog.createdAt}
          />
        ))}
    </>
  );
};

export default Blog;
