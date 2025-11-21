import React from "react";
import { assets } from "../../assets/assets";

const Blog = () => {
  return (
    <section
      className="bg-cover bg-center h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${assets.bannerBg})` }}
    >
      <h1 className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 text-white text-[210px]">
        Blog
      </h1>
    </section>
  );
};

export default Blog;
