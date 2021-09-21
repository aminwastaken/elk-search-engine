import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  // (async () => {  const result = await client.search({
  //   index: 'movies',
  //   body: {
  //     query: {
  //       match: { hello: 'world' }
  //     }
  //   }
  // })})();
  const query = {
    match: {
      overview: "adventure",
    },
  };

  const [response, setResponse] = useState({});

  useEffect(() => {
    axios
      .get("http://0.0.0.0:9200/movies/_search", {
        data: JSON.stringify(query),
      })
      .then((res) => {
        // setResponse(res);
        console.log(res);
      });
  });

  return <div className="App">{JSON.stringify(response)}</div>;
};

export default App;
