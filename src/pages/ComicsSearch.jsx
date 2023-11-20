import { useState } from 'react'
import axios from 'axios'
import md5 from 'crypto-js/md5'

import List from '../components/List';
import useTranslation from "../hooks/useTranslation";
import { getKey, saveKeyValue } from '../libs/session-storage';

import { MARVEL_API_URL, MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY, MARVEL_TS } from '../utils-api';

function ComicsSearch(props) {
  const [selected, setSelected] = useState(
    getKey('selected') && getKey('selected').length > 0 ? getKey('selected') : []
  );
  const [searchCharacterInput, setSearchCharacterInput] = useState("");
  const [searchedCharacters, setSearchedCharacters] = useState([]);
  const [selectedCharacterInput, setSelectedCharacterInput] = useState("0");
  const [searchedComics, setSearchedComics] = useState(
    getKey('searchedComics') && getKey('searchedComics').length > 0 ? getKey('searchedComics') : []
  );
  const [isSimpleSearch, setIsSimpleSearch] = useState(true);
  const [selectedTypeInput, setSelectedTypeInput]= useState("0");
  const [selectedFormatInput, setSelectedFormatInput]= useState("0");
  const [dateRangeStart, setDateRangeStart]= useState("");
  const [dateRangeEnd, setDateRangeEnd]= useState("");
  const [titleStartsWith, setTitleStartsWith]= useState("");
  const [hasDigitalIssue, setHasDigitalIssue]= useState(false);

  // Translation
  const { t } = useTranslation();


  const handleSelection = (comicId) => {
    if (selected.includes(comicId)) {
        setSelected(selected.filter(value => value !== comicId));
    }
    else { 
      setSelected(selected.concat(comicId));
    
    }
  }

  // Get characters with name starting with nameStartsWith and limit 100
  async function getCharacters(nameStartsWith) {
    try {
      const baseUrl =`${MARVEL_API_URL}/characters?ts=${MARVEL_TS}&apikey=${MARVEL_PUBLIC_KEY}&hash=${marvelMd5}&limit=100`
      let characterUrl = baseUrl;
      
      // Check characters parameter
        if (nameStartsWith !=="") { 
         characterUrl += `&nameStartsWith=${nameStartsWith}`;
        }
      
      const response = await axios.get(characterUrl);
      setSearchedCharacters(response.data.data.results.map(result => { return { id: result.id, name: result.name }}));    
    } catch (error) {
      console.error(error);
    }
  }
  // Get comics limited to 10, checking if any applicable parameter has to be included into the final URL
  async function getComics() {
    try {
      
      const baseUrl =`${MARVEL_API_URL}/comics?ts=${MARVEL_TS}&apikey=${MARVEL_PUBLIC_KEY}&hash=${marvelMd5}&limit=100`;
      let comicUrl = baseUrl;

      // Check characters parameter
      if (selectedCharacterInput !=='0') { 
        comicUrl += `&characters=${selectedCharacterInput}`;
      } 

      // Check formatType parameter
      if (selectedTypeInput !=='0') { 
        comicUrl += `&formatType=${selectedTypeInput}`;
      }
 
       // Check format parameter
      if (selectedFormatInput !=='0') { 
        comicUrl += `&format=${selectedFormatInput}`;
      }
    
      // Check dateRange parameter
       if (dateRangeStart && dateRangeStart.length === 10 && dateRangeEnd && dateRangeEnd.length === 10) { 
        const dateRange = dateRangeStart + "," + dateRangeEnd
        comicUrl += `&dateRange=${dateRange}`;
      }
      
      // Check titleStartsWith parameter
      if (titleStartsWith && titleStartsWith.length >= 1) { 
        comicUrl += `&titleStartsWith=${titleStartsWith}`;
      }
      
      // Check hasDigitalIssue parameter
      comicUrl += `&hasDigitalIssue=${hasDigitalIssue}`;
      
      
      const response = await axios.get(comicUrl);
      setSearchedComics(response.data.data.results.map(result => { return {
        id: result.id,
        title: result.title,
        issueNumber: result.issueNumber,
        pageCount: result.pageCount,
        dates: result.dates,
        prices: result.prices,
        thumbnail: result.thumbnail
    }}));
    } catch (error) {
      console.error(error);
    }
  }


  // TODO #1
  const handleChange = ({event, origin}) => {
    
    switch (origin) {
      case 'input1':
        setSearchCharacterInput(event.target.value);
        break;
      case 'select1':
        setSelectedCharacterInput(event.target.value);
        break;
      case 'selectedTypeInput':
        setSelectedTypeInput(event.target.value);
        break;
      case 'selectedFormatInput':
        setSelectedFormatInput(event.target.value);
        break;
      case 'dateRangeStart':
        setDateRangeStart(event.target.value);
        break;
      case 'dateRangeEnd':
        setDateRangeEnd(event.target.value);
        break;
      case 'titleStartsWith':
        setTitleStartsWith(event.target.value);
        break;
      case 'hasDigitalIssue':
        setHasDigitalIssue(!hasDigitalIssue);
        break;
      default:
        break;
    
      } 
      
  }

  //This Handles the clicks on "Search characters!" button
  const handleClick = ({origin}) => {
    getCharacters(searchCharacterInput);
    switch (origin) {
      case 'button1':
        getCharacters(searchCharacterInput);
        break;
      case 'button2':
        getComics();
        break;
      case 'searchTypeButton':
        setIsSimpleSearch(!isSimpleSearch);
        break;
      default:
        break;
    
      } 
  }

  // Add to "searchedComics" a "selected" flag per comic, if "comic.id" is present in selected array.
  const searchedComicsWithSelectedFlag = searchedComics.map(comic => {
    return {...comic, selected: selected.includes(comic.id) };
    });

  const selectedComics = searchedComics.filter(comic => selected.includes(comic.id));
  const marvelMd5 = md5(MARVEL_TS + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY);

  // Save data in session storage
  saveKeyValue('searchedComics', searchedComics);
  saveKeyValue('selectedComics', selectedComics);
  saveKeyValue('selected', selected);

  return (
      <div>
          <div className="search">
          <button className="searchButton" onClick={() => handleClick({origin:'searchTypeButton'})}>{isSimpleSearch ?  t("searchForm.simpleAdvancedButton.simpleSearch") : t("searchForm.simpleAdvancedButton.advancedSearch") }</button>
          <span className="fontWeight">{t("searchForm.characters.introText")}: </span> 
          <input type="text" value={searchCharacterInput} onChange={(event) => handleChange({event, origin: 'input1'})} placeholder={t("searchForm.characters.typeHere")} />
          <button className="buttons" onClick={() => handleClick({origin:'button1'})}>{t("searchForm.characters.buttonText")}</button>
          <span></span>
          <br />
          <span className="fontWeight">{t("searchForm.characters.selectCharacter")}: </span>
          
          <select className="input-margin" value={selectedCharacterInput} onChange={(event) => handleChange({event, origin: 'select1'})}>
            <option value="0">{t("searchForm.characters.searchCharacters")}</option>
            {searchedCharacters.map(character=> <option value={character.id} key={character.id}>{character.name}</option>)}
          </select>
          {!isSimpleSearch ? (
          <>
            <br />
            <span className="fontWeight">{t("searchForm.comics.comicType")}: </span>
            <select className="input-margin" value={selectedTypeInput} onChange={(event) => handleChange({event, origin: 'selectedTypeInput'})}>
            <option value="0">{t("searchForm.comics.chooseComicType")}</option>
            <option value="comic">Comic</option>
            <option value="collection">{t("searchForm.comics.comicTypeCollection")}</option>
          </select>
          <br />
          <span className="fontWeight">{t("searchForm.comics.comicFormat")}: </span>
            <select className="input-margin" value={selectedFormatInput} onChange={(event) => handleChange({event, origin: 'selectedFormatInput'})}>
            <option value="0">{t("searchForm.comics.chooseComicFormat")}</option>
            <option value="comic">Comic</option>
            <option value="magazine">{t("searchForm.comics.comicMagazine")}</option>
            <option value="trade paperback">{t("searchForm.comics.comicTradePaperback")}</option>
            <option value="hardcover">{t("searchForm.comics.comicHardcover")}</option>
            <option value="digest">{t("searchForm.comics.comicDigest")}</option>
            <option value="graphic novel">{t("searchForm.comics.comicGraphicNovel")}</option>
            <option value="digital comic">{t("searchForm.comics.comicDigital")}</option>
            <option value="infinite comic">{t("searchForm.comics.comicInfinite")}</option>
          </select>
          <br />
          <span className="fontWeight">{t("searchForm.comics.comicStartDate")}: </span>
          <input className="input-margin" type="text" value={dateRangeStart} placeholder={t("searchForm.date.fromDate")} onChange={(event) => handleChange({event, origin: 'dateRangeStart'})}/>
          <span></span>
          <input className="input-margin" type="text" value={dateRangeEnd} placeholder={t("searchForm.date.toDate")} onChange={(event) => handleChange({event, origin: 'dateRangeEnd'})}/>
          <br />
            <span className="fontWeight">{t("searchForm.comics.comicTitle")}: </span>
            <input className="input-margin" type="text" value={titleStartsWith} onChange={(event) => handleChange({event, origin: 'titleStartsWith'})}/>
            <br />
            <span className="fontWeight">{t("searchForm.comics.comicDigitalIssue")}: </span>
            <input className="input-margin" type="checkbox" checked={hasDigitalIssue} onChange={(event) => handleChange({event, origin: 'hasDigitalIssue'})} /> 
          </>
          ): null}
          <button className="searchButton" onClick={() => handleClick({origin:'button2'})}>{t("searchForm.comics.searchComics")}</button>
        </div>
        <div className="store-container">
          <h1>{t("searchForm.comicTable.allComics")}: {searchedComicsWithSelectedFlag.length} {t("searchForm.comicTable.availableComics")}</h1>
          <List comics={searchedComicsWithSelectedFlag} onSelect={handleSelection} listType={'search'} />
        </div>
      </div>
  );
}

export default ComicsSearch;