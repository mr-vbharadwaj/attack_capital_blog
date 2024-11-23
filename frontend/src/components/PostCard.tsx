import { Post } from '@/types';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-2 text-black">{post.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span className='text-black'>By {post.authorId.email}</span>
        <span>{new Date(post.createdAt).toLocaleString()}</span>
      </div>
    </div>
  );
}