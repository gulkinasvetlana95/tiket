import Header from './components/header';
import Main from './components/main';
import Flights from "./components/Flights";

import './index.css';
import './styles/style.scss';
import { Routes, Route } from "react-router-dom";


function App() {
  
  return (
    <div className="wrapper">
      <Header />
       <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/Flights" element={<Flights />} />
      
    </Routes>
    </div>
  );
}

export default App;
