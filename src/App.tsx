import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/index.tsx';
import Context from './context';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss';

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  return (
    <Context.Provider value={{ searchValue, setSearchValue }}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    </Context.Provider>
  );
}

// https://iventeye.github.io/react-pizza/

export default App;
