import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home';
import Products from './components/products';
import NewProduct from './components/NewProduct';
import { Link } from'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [currentRoute, setCurrentRoute] = useState();
  useEffect(() =>{
    const  path = window.location.pathname;
    setCurrentRoute(path.slice(0, path.length ));
  }, []);
  return (
    <BrowserRouter>
      <nav className='m-1 p-1 border border-info'>
        <ul className='nav na-pills'>

          <li ><Link onClick={()=> setCurrentRoute('Home')} className={currentRoute === 'Home'? 'btn btn-info ms-1' : 'btn btn-outline-info ms-1'} to='/Home'>Home</Link></li>
          <li ><Link onClick={() =>setCurrentRoute('Products')} className={currentRoute === 'Products'? 'btn btn-info ms-1 ' : 'btn btn-outline-info ms-1'} to='/Products'>Products</Link></li>
          <li><Link onClick={()=> setCurrentRoute('NewProduct')} className={currentRoute === 'NewProduct'? 'btn btn-info ms-1': 'btn btn-outline-info ms-1'} to='/newProduct'>New Product</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/Products" element={<Products />}></Route>
        <Route path="/NewProduct" element={<NewProduct />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
