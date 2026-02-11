"use client";
import { useState } from "react";
import SearchComponent from "./debounceSearch";

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);

  return (
    <div>
      <h1>Debounce Search</h1>
      <SearchComponent setComments={setComments} />
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.body}</li>
          ))}
        </ul>
      ) : (
        <p>No comments to display</p>
      )}
    </div>
  );
}
