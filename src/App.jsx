import marvelLogo from './assets/marvel-logo.png';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import './App.css'
import StatisticsPane from './pages/StatisticsPane';
import ComicsSearch from './pages/ComicsSearch';
import MyComics from './pages/MyComics';
import FavoriteComics from './pages/FavoriteComics';
import NavMenu from './components/NavMenu';

function App() {

return (
    <Router>
      <NavMenu />
        <Routes>
          <Route exact path="/" element={<StatisticsPane />} />
          <Route path="/comics-search" element={<ComicsSearch />} />
          <Route path="/my-comics" element={<MyComics />} />
          <Route path="/favorite-comics" element={<FavoriteComics />} />
        </Routes>
    </Router> 
  )
}

export default App
