"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import api from "@/lib/api";
import { Post } from "@/types";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchUserPosts = async () => {
      try {
        const response = await api.get(`/posts?author=${user.id}`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchUserPosts();
  }, [user, router]);

  const handlePostCreated = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleGoBack = () => {
    router.push("/");
  };

  if (!user) return null;

  return (
    <div className="space-y-8 p-5 bg-custom h-[99vh] w-[99vw]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-black">Dashboard</h1>
        <div>
          <button onClick={handleGoBack} className="bg-blue-300 p-2 rounded text-black">
            Go Back
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white p-2 rounded ml-2"
          >
            Logout
          </button>
        </div>
      </div>
      <PostForm onPostCreated={handlePostCreated} />
      <div className="mt-8 glass-effect p-5">
        <h2 className="text-2xl font-bold mb-4 text-black">Your Posts</h2>
        <PostList posts={posts} />
      </div>
    </div>
  );
}
