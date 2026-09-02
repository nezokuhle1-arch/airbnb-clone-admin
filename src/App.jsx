import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ViewListings from './pages/ViewListings';
import CreateListings from './pages/CreateListings';
import UpdateListings from './pages/UpdateListings';
import Layout from './components/Layout';
import Reservations from './pages/Reservations';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="/listings" element={<ViewListings />} />
        <Route path="/create-listings" element={<CreateListings />} />
        <Route path="/update-listings/:id" element={<UpdateListings />} />
        <Route path="/reservations" element={<Reservations />} />
      </Route>
    </Routes>
  );
}

export default App;