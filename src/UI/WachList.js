import axios from "axios";
import * as React from "react";
import { useDrop } from "react-dnd";
import CharacterItem from "../components/CharacterItem";

const WachList = () => {
  const [basket, setBasket] = React.useState([]);
  const [apiData, setAPIData] = React.useState([]);

  React.useEffect(() => {
    const fetchItems = async () => {
      await axios
        .get(`https://api.jikan.moe/v4/anime`)
        .then((response) => {
          setAPIData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    setBasket(JSON.parse(localStorage.getItem("basket")));
    fetchItems();
  }, []);

  const [{ isOver }, dropRef] = useDrop({
    accept: "image",
    drop: (item) => addImageToBoard(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  const addImageToBoard = ({ id }) => {
    const pictureList = apiData.filter((picture) => id === picture.mal_id);
    setBasket((board) => [...board, pictureList[0]]);
    localStorage.setItem("basket", JSON.stringify(basket));
  };
  console.log(basket,'basket')
  return (
    <div style={{ float: "right",width:'120px',height:'10vh'}} ref={dropRef}>
    
      {basket?.map((item) => (
        <section key={item?.mal_id}>
          <CharacterItem item={item} />
        </section>
      ))}
    </div>
  );
};

export default WachList;
