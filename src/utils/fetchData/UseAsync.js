import { useCallback, useEffect, useState } from 'react';

export const video_url = 'https://www.youtube.com/embed/5qap5aO4i9A';

const API_KEY = 'AIzaSyBECKE2KQDSgrLFeFYIQDqDOa7eozg570o';
const ID_VIDEO = '5qap5aO4i9A';
const URL_VIDEO_API = `https://www.googleapis.com/youtube/v3/videos?id=${ID_VIDEO}&key=${API_KEY}&fields=items(id,snippet(channelId,title,categoryId),statistics)&part=snippet,statistics`;
// URL_IMG = `https://www.googleapis.com/youtube/v3/videos?id=${ID_VIDEO}&key=${API_KEY}&part=snippet,statistics&fields=items(id,snippet,statistics)`;

export const FetchData = async () => {
  const res = await fetch(URL_VIDEO_API);
  const json = await res.json();
  return json;
};

// Function async fetch
export const UseAsync = (asyncFunction, shouldRun) => {
  const [state, setState] = useState({
    result: null,
    error: null,
    status: 'idle',
  });

  const run = useCallback(() => {
    setState({
      result: null,
      error: null,
      status: 'pending',
    });

    return asyncFunction()
      .then((response) => {
        setState({
          result: response,
          error: null,
          status: 'settled',
        });
      })
      .catch((err) => {
        setState({
          result: null,
          error: err,
          status: 'error',
        });
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (shouldRun) {
      run();
    }
  }, [run, shouldRun]);

  return [run, state.result, state.error, state.status];
};
