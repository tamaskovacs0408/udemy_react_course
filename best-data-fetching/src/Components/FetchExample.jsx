import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export default function FetchExample() {
  const [page, setPage] = useState(0);

  const {
    data: posts,
    // isError,
    isPending,
  } = useQuery({
    queryKey: ["posts", { page }],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/posts?page=${page}`);
      return await response.json();
    },
  });

  return (
    <div className='tutorial'>
      <h1 className='mb-4 text-2xl'>Data Fetching in React</h1>
      <button onClick={() => setPage(page - 1)}>Decrease page({page})</button>
      <button onClick={() => setPage(page + 1)}>Increase page({page})</button>
      {isPending && <div>Loading...</div>}
      {!isPending && (
        <ul>
          {posts?.map(post => {
            return <li key={post.id}>{post.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
