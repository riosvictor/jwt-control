import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Home: React.FC = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const getBookmarks = async () => {
    const result = await axiosPrivate.get('/bookmarks');
    setBookmarks(result.data);
  }

  useEffect(() => {
    getBookmarks();
  }, [])

  return (
    <>
      <h2>Home</h2>

      <ul>
        {bookmarks.map((bookmark, idx) => (
          <li key={idx}>
            {bookmark}
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          getBookmarks();
        }}
      >
        Redo Request
      </button>
    </>
  );
}

export default Home;