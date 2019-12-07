import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import { listIds, seed } from "../constants";
import { GetLists } from "../functions";
import ListContainer from "./ListContainer";

function App() {
  const [movieLists, setMovieLists] = useState(seed);

  useEffect(() => {
    if (true) {
      Promise.all(
        listIds.map(listId => {
          return GetLists(listId);
        })
      ).then(tempMovieLists => {
        setMovieLists(tempMovieLists);
      });
    }
  }, []);

  return (
    <div className="App">
      {movieLists.map(movieList => (
        <ListContainer list={movieList} />
      ))}
      <footer className={styles.footer}>
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </footer>
    </div>
  );
}

export default App;
