import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ViewListings from './pages/ViewListings';
import CreateListings from './pages/CreateListings';
import UpdateListings from './pages/UpdateListings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/listings" element={<ViewListings />} />
      <Route path="/create-listings" element={<CreateListings />} />
      <Route path="/update-listings/:id" element={<UpdateListings />} />
    </Routes>
  );
}

export default App;