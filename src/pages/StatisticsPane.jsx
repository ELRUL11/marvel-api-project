import { useState, useEffect } from 'react';
import axios from 'axios'
import md5 from 'crypto-js/md5'
import useTranslation from "../hooks/useTranslation";

import IndicatorBox from "../components/IndicatorBox";
import { MARVEL_API_URL, MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY, MARVEL_TS } from '../utils-api';


function StatisticsPane(props) {
  const marvelMd5 = md5(MARVEL_TS + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY);
  const [totalComics, setTotalComics] = useState(0);
  const [totalCharacters, setTotalCharacters] = useState(0);

  const [totalComicsSpiderman, setTotalComicsSpiderman] = useState(0);
  const [totalComicsThor, setTotalComicsThor] = useState(0);
  const [totalComicsHulk, setTotalComicsHulk] = useState(0);
  const [totalComicsIronman, setTotalComicsIronman] = useState(0);
  const [totalComicsDeadpool, setTotalComicsDeadpool] = useState(0);

  const [totalComicsYear1990, setTotalComicsYear1990] = useState(0);
  const [totalComicsYear2000, setTotalComicsYear2000] = useState(0);
  const [totalComicsYear2010, setTotalComicsYear2010] = useState(0);
  const [totalComicsYear2020, setTotalComicsYear2020] = useState(0);
  const [totalComicsYear2022, setTotalComicsYear2022] = useState(0);


  // Translation
  const { t } = useTranslation();

  const  getTotalComics = async () => {
    const comicUrl =`${MARVEL_API_URL}/comics?ts=${MARVEL_TS}&apikey=${MARVEL_PUBLIC_KEY}&hash=${marvelMd5}`;
    const response = await axios.get(comicUrl);
    setTotalComics(response.data.data.total);
  }

  const getTotalCharacters = async () => {
    const characterUrl =`${MARVEL_API_URL}/characters?ts=${MARVEL_TS}&apikey=${MARVEL_PUBLIC_KEY}&hash=${marvelMd5}`;
    const response = await axios.get(characterUrl);
    setTotalCharacters(response.data.data.total);
  }

  // List of the number of comics for every character -> Spider-Man,
    const getTotalComicsSpiderman = async () => {
      let totalSpidermanComics = `${MARVEL_API_URL}/comics?ts=${MARVEL_TS}&apikey=${MARVEL_PUBLIC_KEY}&hash=${marvelMd5}&characters=1009610`;
      let response = await axios.get(totalSpidermanComics);
      setTotalComicsSpiderman(response.data.data.total)
    }
    const getTotalComicsThor = async () => {
      let totalThorComics = `${MARVEL_API_URL}/comics?ts=${MARVEL_TS}&apikey=${MARVEL_PUBLIC_KEY}&hash=${marvelMd5}&characters=1009664`;
      let response = await axios.get(totalThorComics);
      setTotalComicsThor(response.data.data.total)
    }
    const getTotalComicsHulk = async () => {
      let totalHulkComics = `${MARVEL_API_URL}/comics?ts=${MARVEL_TS}&apikey=${MARVEL_PUBLIC_KEY}&hash=${marvelMd5}&characters=1009351`;
      let response = await axios.get(totalHulkComics);
      setTotalComicsHulk(response.data.data.total)
    }
    const getTotalComicsIronman = async () => {
      let totalIronmanComics = `${MARVEL_API_URL}/comics?ts=${MARVEL_TS}&apikey=${MARVEL_PUBLIC_KEY}&hash=${marvelMd5}&characters=1009368`;
      let response = await axios.get(totalIronmanComics);
      setTotalComicsIronman(response.data.data.total)
    }
    const getTotalComicsDeadpool = async () => {
      let totalDeadpoolComics = `${MARVEL_API_URL}/comics?ts=${MARVEL_TS}&apikey=${MARVEL_PUBLIC_KEY}&hash=${marvelMd5}&characters=1009268`;
      let response = await axios.get(totalDeadpoolComics);
      setTotalComicsDeadpool(response.data.data.total)
    }
    
    //Lis of the number of comics in that year
    const getYear1990 = async () => {
      let totalYear1990Comics = `${MARVEL_API_URL}/comics?ts=${MARVEL_TS}&apikey=${MARVEL_PUBLIC_KEY}&hash=${marvelMd5}&dateRange=1990-01-01%2C1990-12-31`;
      let response = await axios.get(totalYear1990Comics);
      setTotalComicsYear1990(response.data.data.total)
    }
    const getYear2000 = async () => {
      let totalYear2000Comics = `${MARVEL_API_URL}/comics?ts=${MARVEL_TS}&apikey=${MARVEL_PUBLIC_KEY}&hash=${marvelMd5}&dateRange=2000-01-01%2C2000-12-31`;
      let response = await axios.get(totalYear2000Comics);
      setTotalComicsYear2000(response.data.data.total)
    }
    const getYear2010 = async () => {
      let totalYear2010Comics = `${MARVEL_API_URL}/comics?ts=${MARVEL_TS}&apikey=${MARVEL_PUBLIC_KEY}&hash=${marvelMd5}&dateRange=2010-01-01%2C2010-12-31`;
      let response = await axios.get(totalYear2010Comics);
      setTotalComicsYear2010(response.data.data.total)
    }
    const getYear2020 = async () => {
      let totalYear2020Comics = `${MARVEL_API_URL}/comics?ts=${MARVEL_TS}&apikey=${MARVEL_PUBLIC_KEY}&hash=${marvelMd5}&dateRange=2020-01-01%2C2020-12-31`;
      let response = await axios.get(totalYear2020Comics);
      setTotalComicsYear2020(response.data.data.total)
    }
    const getYear2022 = async () => {
      let totalYear2022Comics = `${MARVEL_API_URL}/comics?ts=${MARVEL_TS}&apikey=${MARVEL_PUBLIC_KEY}&hash=${marvelMd5}&dateRange=2022-01-01%2C2022-12-31`;
      let response = await axios.get(totalYear2022Comics);
      setTotalComicsYear2022(response.data.data.total)
    }

    

  useEffect(() => {
    getTotalComics();
    getTotalCharacters();
    getTotalComicsSpiderman();
    getTotalComicsThor();
    getTotalComicsHulk();
    getTotalComicsIronman();
    getTotalComicsDeadpool();
    getYear1990();
    getYear2000();
    getYear2010();
    getYear2020();
    getYear2022();
  }, []);

  return (
    <>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'center'
        }}>
        <IndicatorBox text={t("statisticPaneBoxes.totalComics")} value={totalComics} />
        <IndicatorBox text={t("statisticPaneBoxes.totalCharacters")} value={totalCharacters} />
      </div>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'center'
        }}>
      <IndicatorBox text={"Comics For Characters"} value={
        <ul className="tableStyle">
          <li>Spider Man: {totalComicsSpiderman}</li>
          <li>Thor: {totalComicsThor}</li>
          <li>Hulk: {totalComicsHulk}</li>
          <li>Iron Man: {totalComicsIronman}</li>
          <li>Deadpool: {totalComicsDeadpool}</li>
        </ul>
      }
     />
      <IndicatorBox text={"Comics For Years"} value={        
      <ul className="tableStyle">
          <li>1990: {totalComicsYear1990} </li>
          <li>2000: {totalComicsYear2000} </li>
          <li>2010: {totalComicsYear2010} </li>
          <li>2020: {totalComicsYear2020}</li>
          <li>2022: {totalComicsYear2022}</li>
        </ul>} />
      </div>
    </>
  );
}

export default StatisticsPane;