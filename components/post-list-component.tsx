import React, { Component, useEffect, useReducer, useState } from "react";
import axios from "axios";

import LoadingSpinner from "./loading-spinner";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostListState {
  error: Error | null;
  posts: Post[];
}

const initialState: PostListState = {
  error: null,
  posts: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_POST_SUCCESS":
      return {
        error: null,
        posts: action.posts as Post[]
      };

    case "GET_POST_FAIL":
      return {
        error: action.posts as Error,
        posts: []
      };

    default:
      return state;
  }
};

const PostList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [refresh, setRefresh] = useState<number | string>("");

  const [loading, setLoading] = useState(true);

  function onRefresh() {
    setLoading(true);
    setRefresh(Date.now);
  }

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        setLoading(false);
        dispatch({
          type: "GET_POST_SUCCESS",
          posts: response.data,
          errors: null
        });
      })
      .catch(error => {
        setLoading(false);
        dispatch({
          type: "GET_POST_FAIL",
          posts: {},
          errors: new Error(error.status)
        });
      });
  }, [refresh]);

  return (
    <div>
      <button className="btn btn-primary" onClick={onRefresh}>
        Refresh
      </button>
      <LoadingSpinner loading={loading} />
      <table className="table mt-2">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {state.posts.map(post => {
            return (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;
