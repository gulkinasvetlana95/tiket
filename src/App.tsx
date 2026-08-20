import Header from './components/header';
import Main from './components/main';
import Flights from "./components/Flights";
import ReviewBooking from './components/ReviewBooking';
import Payment from './components/Payment';

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
      <Route path="/ReviewBooking" element={<ReviewBooking/>}/>
      <Route path="/Payment" element={<Payment/>} />
      
    </Routes>
    </div>
  );
}

export default App;
