import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import Home from './scenes/home/Home';
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import Navbar from "./scenes/global/Navbar";
import CartMenu from "./scenes/global/CartMenu";
import Footer from "./scenes/global/Footer";
import Denied from './scenes/checkout/Denied';
import ErrorPage from './scenes/global/ErrorPage';


function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='item/:itemId' element={<ItemDetails />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='checkout/success' element={<Confirmation />} />
        <Route path='checkout/error' element={<Denied />} />
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
      <CartMenu/>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
