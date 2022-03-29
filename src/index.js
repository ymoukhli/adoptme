import { render } from "react-dom";
import { StrictMode } from "react/cjs/react.production.min";
import SearchParams from "./SearchParams";
import {  Routes, Route, BrowserRouter,Link} from "react-router-dom";
import Details from './Details'
import ThemeContext from "./ThemeContext";
import {useState} from 'react'
const App = () => {
  const theme = useState()
  return (
      <div
          className="p-0 m-0"
      style={{
        background: "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
      }}>
        <ThemeContext.Provider value={theme}>
          <header className="w-full mb-10 text-center p-7 bg-gradient-to-b from-purple-400 via-pink-500 to-red-500">
            <Link to="/">
              <h1>Adopt Me!</h1>
            </Link>
          </header>
            
          <Routes>
            <Route path="/details/:id" element={<Details />}/>
            <Route path="/" element={<SearchParams />}/>
          </Routes>
        </ThemeContext.Provider>
      </div>
  );
};

render(
    <BrowserRouter>
    <App />
    </BrowserRouter>, document.getElementById("root"));