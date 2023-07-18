// npm i react-router-dom axios redux react-redux redux-thunk antd
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ItemPage from './pages/ItemPage.js';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/items" element={<ItemPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
