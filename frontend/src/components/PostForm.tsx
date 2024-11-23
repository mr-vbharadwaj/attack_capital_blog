import { useState } from "react";
import api from "@/lib/api";
import { Post } from "@/types";
import toast from "react-hot-toast";

interface PostFormProps {
  onPostCreated: (post: Post) => void;
}

export default function PostForm({ onPostCreated }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await api.post("/posts", { title, content });
      onPostCreated(response.data);
      setTitle("");
      setContent("");
      toast.success("Post created successfully!");
    } catch (error) {
      toast.error("Error creating post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center max-w-screen bg-grey">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow max-w-[80vw] w-full"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
