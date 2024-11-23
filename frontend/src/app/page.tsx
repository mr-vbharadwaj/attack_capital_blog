"use client";

import { useEffect, useState } from "react";
import PostList from "@/components/PostList";
import api from "@/lib/api";
import { Post } from "@/types";
import ClientLayout from "@/components/ClientLayout";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <ClientLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="space-y-8 bg-custom min-h-[90vh]">
        <h1 className="text-3xl font-bold" style={{color: 'black'}}>Latest Posts</h1>
        <PostList posts={posts} />
      </div>
    </ClientLayout>
  );
}
