import { getKey, saveKeyValue } from '../libs/session-storage';
import { useState} from 'react';
import useTranslation from "../hooks/useTranslation";

import List from '../components/List';

function MyComics(props) {
    const [favoriteComics, setFavoriteComics] = useState(
      getKey('favoriteComics') && getKey('favoriteComics').length > 0 ? getKey('favoriteComics') : []
    );
    const [selectedComics, setSelectedComics] = useState(
      getKey('selectedComics') && getKey('selectedComics').length > 0 ? getKey('selectedComics') : []
    );
  
    // Translation
    const { t } = useTranslation();

      const selected = getKey('selected');

    const handleClick = ({ comicId, origin }) => {
      // Add comic to favoriteComics
      if (origin === 'star') {

        // Obtain the starredComic from the selectedComics
        const starredComic = selectedComics.filter(comic => comic.id === comicId);
        
        // Add the starredComic to favoriteComics if the starredComic is not already included
       const starredComicsAlreadyFavorite = favoriteComics.filter(comic => comic.id === comicId);
       if (starredComicsAlreadyFavorite && starredComicsAlreadyFavorite.length === 0 ) {
          setFavoriteComics([...favoriteComics, ...starredComic]);
        }
      }
      
      // Delete comics from selectedComics and favoriteComics
      if (origin === 'trash') {
        
        // Obtain the new favoriteComics removing the one "trashed"
        const newFavoriteComics = favoriteComics.filter(comic => comic.id !== comicId);
        setFavoriteComics(newFavoriteComics);
        
        
        // Obtain the new selectedComics removing the one "trashed"
        const newSelectedComics = selectedComics.filter(comic => comic.id !== comicId);
        setSelectedComics(newSelectedComics);

        // Obtain and save the new "selected" array, removing the "trashed" comicId
        const newSelected = selected.filter(selectedComicId => selectedComicId !== comicId);
        saveKeyValue('selected', newSelected);
      }
    }

    // Save data to Session Storage
    saveKeyValue('favoriteComics', favoriteComics);
    saveKeyValue('selectedComics', selectedComics);
  

    
  return (
      <div>
        <div className="owned-container">
          <h1>{t("searchForm.comicTable.myComics")}: {selectedComics && selectedComics.length} {t("searchForm.comicTable.selectedComics")}</h1>
          <List comics={selectedComics} listType={'myComics'} onClick={handleClick} />
        </div>
      </div>
  );
}

export default MyComics;