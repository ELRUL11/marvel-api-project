import { getKey, saveKeyValue } from '../libs/session-storage';
import { useState} from 'react';
import useTranslation from "../hooks/useTranslation";

import List from '../components/List';

function FavoriteComics(props) {
  const [favoriteComics, setFavoriteComics] = useState(
    getKey('favoriteComics') && getKey('favoriteComics').length > 0 ? getKey('favoriteComics') : []
  );
  // Translation
  const { t } = useTranslation();

  const handleClick = ({ comicId }) => {
  
   // Obtain the new favoriteComics removing the one "trashed"
  const newFavoriteComics = favoriteComics.filter(comic => comic.id !== comicId);
  setFavoriteComics(newFavoriteComics);
  }

  // Save data to Session Storage
  saveKeyValue('favoriteComics', favoriteComics);

  return (
    <div>
      <div className="owned-container">
        <h1>{t("searchForm.comicTable.favoriteComics")}: {favoriteComics && favoriteComics.length} {t("searchForm.comicTable.favoritedComics")}</h1>
        <List comics={favoriteComics} listType={'favorites'} onClick={handleClick} />
      </div>
    </div>
  );
}

export default FavoriteComics;