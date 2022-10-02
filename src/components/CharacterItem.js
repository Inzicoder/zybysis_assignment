import React from "react";
import { useDrag } from 'react-dnd'

const CharacterItem = ({ item }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "image",
    item: { id: item.mal_id},
    collect: (monitor) => ({
        isDragging: monitor.isDragging()
    })
})



  return (
    <div className="card" ref={dragRef}>
      <div className="card-inner">
        <div className="card-front">
          <img src={item.images.jpg.image_url} alt="" />
        </div>
        <div className="card-back">
          <ul>
            <li>
              <strong>Title:</strong> {item.title}
            </li>
            <li>
              <strong>Rating:</strong> {item.rating}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharacterItem;
