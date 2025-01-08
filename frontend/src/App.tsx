import { Route, Routes } from 'react-router-dom';
import MainNavbar from './components/MainNavbar';
import Apartments from './Apartments';
import Home from './Home';
import ProtectedRoute from './pages/ProtectedPage';
import useAuth from './hooks/useAuth';

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 mt-7">
      <MainNavbar />
      <Routes>
        <Route index element={<Home />}></Route>
        <Route
          path="/apartments"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Apartments />
            </ProtectedRoute>
          }
        />

        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

export default App;
