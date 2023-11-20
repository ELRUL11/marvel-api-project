import starIcon from '../assets/star-icon.png';
import trashIcon from '../assets/trash-icon.png';

function ComicUtils(props) {
    
    const handleClick = (origin) => {
        props.onClick(origin)
    }

  return (
      <div className="comic-utils">
        {props.showStar ? (
            <div onClick ={() => handleClick('star')}>
                <img src={starIcon} alt="Favorite this comic from the list" />
            </div>
        ) : null}      
        <div onClick={() => handleClick('trash')}>
            <img src={trashIcon} alt="Remove comic from list" />
        </div>
      </div>
  );
}

export default ComicUtils;