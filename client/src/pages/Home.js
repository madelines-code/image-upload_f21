import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
const Home = () => {
  const auth = useContext(AuthContext);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    getCats();
  }, []);

  const getCats = async () => {
    try {
      // NOTE: access-token is getting sent here (devise-axios)
      let res = await axios.get("/api/cats");
      setCats(res.data);
    } catch (err) {
      alert("err in getCats()");
    }
  };
  const sample = () => {
    if (cats.length) {
      const index = Math.floor(Math.random() * cats.length);
      return cats[index];
    }
    return null;
  };
  const upVote = (id) => {
    console.log(id);
  };
  // no DB interaction
  const downVote = (id) => {
    console.log(id);
    // remove Cat from list
    const filteredCats = cats.filter((cat) => cat.id !== id);
    // get a new Cat to show
    setCats(filteredCats);
  };
  const renderCat = () => {
    let cat = sample();
    if (!cat) {
      return <p>No More Cats</p>;
    }
    return (
      <div>
        <h1>{cat.name}</h1>
        <p>breed: {cat.breed}</p>
        <button onClick={() => upVote(cat.id)}>like</button>
        <button onClick={() => downVote(cat.id)}>pass</button>
      </div>
    );
  };

  return (
    <div>
      <h1>Home!</h1>
      <code>{JSON.stringify(auth)}</code>
      <hr />
      {renderCat()}
    </div>
  );
};
export default Home;
