import SearchBar from "../Search/SearchBar";
import style from "./Nav.module.css"
import { Link } from "react-router-dom";

const Nav = (props) => {
  const { onSearch, setAccess } = props;

  const handleLogOut = () => {
    setAccess(false);
  };
  return (
    <div className={style.container}>
      <SearchBar onSearch={onSearch} />
      <Link to="/about" >
        <button className={style.btn}>About</button>
      </Link>

      <Link to="/home" >
        <button className={style.btn}>Home</button>
      </Link>

      <Link to="/favorites" >
        <button className={style.btn}>Favorites</button>
      </Link>
      
      <button onClick={handleLogOut} className={style.btn}>LOG OUT</button>
    </div>
  );
};

export default Nav;
