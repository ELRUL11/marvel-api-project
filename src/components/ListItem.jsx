import ComicUtils from './ComicUtils';
import useTranslation from "../hooks/useTranslation";

function ListItem(props) {
  const {id, title, thumbnail, issueNumber, pageCount, dates, prices, selected} = props.comic;
  const { t } = useTranslation();

  const handleClick = () => {
    if(props.onSelect) { 
      props.onSelect(id);
    }
  }
  
  const handleComicUtilsClick = (origin) => {
    props.onClick({ comicId: id, origin:origin });
  }

  return (
    <div className={`comic ${selected ? "selected" : ""}`} onClick={handleClick}>
      <div className="comic-thumbnail-container">
        <img className="comic-thumbnail" src={`${thumbnail.path}.${thumbnail.extension}`} />
      </div>
      <div className="comic-data-container">
        <h2>{title}</h2>
        <p>{t("listItem.issue")}: {issueNumber}</p>
        <p>{t("listItem.pages")}: {pageCount}</p>
        <p>{t("listItem.date")}: {new Date(dates[0].date).toLocaleDateString()}</p>
        <p>{t("listItem.price")}: ${prices[0].price}</p>
      </div>
      {props.listType === 'myComics' || props.listType === 'favorites' ? (
        <ComicUtils showStar={props.listType === 'myComics'} onClick={handleComicUtilsClick} />
      ) : null }
    </div>
  );
}

export default ListItem;