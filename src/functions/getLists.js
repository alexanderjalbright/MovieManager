import axios from "axios";
import {
  apiUrl,
  apiUrlList,
  apiKeySuffix,
  apiPageSuffix,
  localStoragePrefix
} from "../constants";

export default async function GetLists(id) {
  const key = localStorage.getItem(`${localStoragePrefix}key`);

  if (!key) {
    localStorage.setItem(`${localStoragePrefix}key`, "");
  }

  if (key) {
    const totalPagesResponse = await axios.get(
      `${apiUrl}${apiUrlList}${id}?${apiPageSuffix}1&${apiKeySuffix}${key}`
    );
    const totalPages = totalPagesResponse.data.total_pages;
    const listName = totalPagesResponse.data.name;

    const promises = [];
    for (let i = 1; i <= totalPages; i++) {
      promises.push(
        axios.get(
          `${apiUrl}${apiUrlList}${id}?${apiPageSuffix}${i}&${apiKeySuffix}${key}`
        )
      );
    }
    const responses = await axios.all(promises);
    let movieList = [];
    responses.forEach(item => {
      movieList = [...movieList, ...item.data.results];
    });
    return { name: listName, list: movieList };
  }
}
