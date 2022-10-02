/* eslint-disable array-callback-return */
import React from "react";
import { useDispatch } from "react-redux";
import { filteredItemsInRedux } from "../redux/filteredItemsSlice";

const Filter = ({ items }) => {
  const [filteredTitle, setFilteredTitle] = React.useState([]);
  const dispatch = useDispatch()

  React.useEffect(() => {
    const tempGenres = [];
    items.map((item, index) => {
      item.genres.map((genreItem) => {
        tempGenres.push(genreItem);
      });
    });
    setFilteredTitle(tempGenres);
  }, [items]);

  const filteredArr = filteredTitle.reduce((acc, current) => {
    const x = acc.find((item) => item.mal_id === current.mal_id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  const checkBoxHandler = (index) => {
    const filteredData = items
      .filter((element) =>
        element.genres.some((subElement) => subElement.mal_id === index)
      )
      .map((element) => {
        let newElt = Object.assign({}, element); // copies element
        newElt.genres = newElt.genres.filter(
          (subElement) => subElement.mal_id === index
        );
        return newElt;
      });
    dispatch(filteredItemsInRedux(filteredData))
  };


  return (
    <div>
      {filteredArr.map((item, id) => (
        <div className="filter" key={id}>  
          <input type="checkbox" onClick={() => checkBoxHandler(item.mal_id)} />
          <p className="filtername">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Filter;
