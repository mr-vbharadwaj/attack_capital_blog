import { Post } from '@/types';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No posts found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 m-5">
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  );
}