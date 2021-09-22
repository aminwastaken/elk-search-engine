import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";

const Home = () => {
  const [hits, setHits] = useState([]);
  const [total, setTotal] = useState(0);
  const [genres, setGenres] = useState([]);
  const query = {
    sort: [
      {
        release_date: {
          order: "desc",
        },
      },
    ],
  };

  useEffect(() => {
    // axios({
    //   url: "http://0.0.0.0:9200/movies/_search",
    //   method: "POST",
    //   timeout: 0,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: JSON.stringify(query),
    // }).then((res) => {
    //   console.log(res.data);
    // });

    //------------
    axios
      .get("http://0.0.0.0:9200/movies/_search", {
        params: {
          source: JSON.stringify(query),
          source_content_type: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setHits(res.data.hits.hits);
        setTotal(res.data.hits.total.value);
      });
  }, []);
  return (
    <div>
      HomePage
      <SearchBar />
      <MovieList hits={hits} total={total} />
    </div>
  );
};

export default Home;
