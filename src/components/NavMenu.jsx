import { Link, useLocation} from "react-router-dom";
import marvelLogo from '../assets/marvel-logo.png';
import useTranslation from "../hooks/useTranslation";

function NavMenu() {
    const location= useLocation()
    const { language, setLanguage, t } = useTranslation();
    const navItems = [{
        path: "/", text: t("nav.statisticsPane")
    }, {
        path: "/comics-search", text: t("nav.comicsSearch")
    }, {
        path: "/my-comics", text: t("nav.myComics")
    }, {
        path: "/favorite-comics", text: t("nav.favoriteComics")
    }];

  return (
      <>
            <ul className="navbar">
                <li>
                <img src={marvelLogo} alt="Logo" className="logo"/>
                </li>

                {navItems.map((navItem, index )=> {
                    return (
                        <li key={index} className={location.pathname === navItem.path ? "current-path" : "" }>
                            <Link to={navItem.path}>{navItem.text}</Link>
                        </li>
                    );
                })}

                <li>
                    <a href="#" onClick={() => {
                        setLanguage(language === "es" ? "en" : "es");
                        window.location.reload();
                    }}>
                        {language === "es" ? "Inglés" : "Spanish"}
                    </a>
                </li>
            </ul>
      </>
  );
}

export default NavMenu;