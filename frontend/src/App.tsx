import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainNavbar from './components/MainNavbar';
import Apartments from './Apartments';
import Home from './Home';

function App() {
  return (
    <>
      <MainNavbar />
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/apartments" element={<Apartments />} />

        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

export default App;
