import { Route, Routes } from 'react-router-dom';
import MainNavbar from './components/MainNavbar';
import Apartments from './Apartments';
import Home from './Home';
import ProtectedRoute from './pages/ProtectedPage';
import useAuth from './hooks/useAuth';
import CategoryStep from './steps/CategoryStep';
import LocationStep from './steps/LocationStep';
import DetailsStep from './steps/DetailsStep';
import PriceStep from './steps/PriceStep';
import Dashboard from './pages/dashboard';

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 mt-7">
      <MainNavbar />
      <Routes>
        <Route index element={<Home />} />

        <Route
          path="/apartments"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Apartments />
            </ProtectedRoute>
          }
        ></Route>

        <Route path="category" element={<CategoryStep />} />
        <Route path="location" element={<LocationStep />} />
        <Route path="details" element={<DetailsStep />} />
        <Route path="price" element={<PriceStep />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/*</Routes> <Route index element={<Listings />} /> 
          <Route path="listings" element={<Listings />} />
          <Route path="listings/add" element={<AddListing />} />
          <Route path="listings/edit/:id" element={<EditListing />} />*/}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
