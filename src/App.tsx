import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import Stores from './pages/Stores';
import Favorites from './pages/Favorites';
import Contacts from './pages/Contacts';
import About from './pages/About';
import Cart from './pages/Cart';
export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="stores" element={<Stores />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="about" element={<About />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
