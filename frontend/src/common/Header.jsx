import classes from "./Header.module.css";
import logo from "../assets/logo.png";
import searchIcon from "../assets/search-icon.png";
import cartIcon from "../assets/shopping-bag.png";
function Header() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.logo}>
          <img className={classes.img} src={logo}></img>
        </div>

        <div className={classes.nav}>
          <ul className={classes.nav_list}>
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Shop</a>
            </li>
            <li>
              <a href="">About us</a>
            </li>
            <li>
              <a href="">Blog</a>
            </li>
            <li>
              <a href="">Contact us</a>
            </li>
          </ul>
        </div>
        <div className={classes.nav}>
          <ul className={classes.login_section}>
            <li>
              <a href="">Login</a>
            </li>
            <li>
              <a href="">
                <img src={searchIcon}></img>
              </a>
            </li>
            <li>
              <a href="">
                <img src={cartIcon}></img>
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
export default Header;
