export interface User {
    id: string;
    email: string;
  }
  
  export interface Post {
    _id: string;
    title: string;
    content: string;
    authorId: User;
    createdAt: string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }