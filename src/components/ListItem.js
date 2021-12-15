import { MdDelete, MdStarBorder, MdStarRate } from "react-icons/md";

const ListItem = ({ item, handleFriendDelete, handleFavouriteChange }) => {
  return (
    <li key={item.code} className="list-item">
      <div className="list-item-text">
        <p className="list-item-name">{item.name}</p>
        <p className="list-item-static">is your friend</p>
      </div>
      {item.isFavourite ? (
        <MdStarRate
          style={{ fill: "yellow" }}
          onClick={() => handleFavouriteChange(item)}
          className="favourite-item"
        />
      ) : (
        <MdStarBorder
          onClick={() => handleFavouriteChange(item)}
          className="favourite-item"
        />
      )}
      <MdDelete
        onClick={() => handleFriendDelete(item)}
        className="delete-item"
      />
    </li>
  );
};

export default ListItem;
