
import './App.css'
import { Routes, Route, useNavigate } from "react-router-dom";
import MyAssets from './officerPages/my Assets/MyAssets';
import Single from './officerPages/singlePage/single';
// import Auction from './officerPages/auction/Auction';
import AssetsView from './officerPages/my Assets/AssetsView';
import AddAsset from './officerPages/add new asset/AddAsset';
import Profilepage from './officerPages/profilePage/ProfilePage';
import Profile2 from './officerPages/profile Settings/Profile2';
import Dashboard from './officerPages/dashboard/dashboard';
import { useContext, useEffect} from 'react';
import { AppContext } from './context/context';
import axios from 'axios';
// import ChangePassword from './officerPages/ChangePassword';
import SignIn from './dashComponent/SignIn/SignIn';

// import PropertyDetailsForm from './dashComponent/nAsset Forms/PropertyDetailForm';
// import AddressDetailsForm from './dashComponent/nAsset Forms/AddressForm';
// import AuctionDetailsForm from './dashComponent/nAsset Forms/AuctionForm';


function App() {
  const {serverUrl, isAuthenticated, setIsAuthenticated} = useContext(AppContext)
  const navigate = useNavigate()

    // useEffect(() => {
    //   !isAuthenticated && navigate('login')
    // }, [])

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(serverUrl + "/api/v1/bank-user/check-auth", {
          withCredentials: true, 
        });
        console.log(response)
        if (response.data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        console.log(isAuthenticated)
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // Prevent rendering until authentication status is determined
  if (isAuthenticated === null) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  return (
    
      <Routes>
        {/* {true ? ( */}
          <>
            <Route path="/" element={<Profilepage />} />
            <Route path="/myAssets" element={<MyAssets />} />
            <Route path="/profile" element={<Profile2 />} />
            <Route path="/view" element={<AssetsView />} />
            <Route path="/property/:id" element={<Single />} />
            <Route path="/addNew" element={<AddAsset />} />
            <Route path="/dashboard" element={<Dashboard />} />

            
    {/* <Route path="/property-details" element={<PropertyDetailsForm />} />
    //    <Route path="/address-details" element={<AddressDetailsForm/> } />
    //   <Route path="/auction-details" element={<AuctionDetailsForm />} />  */}
          </>
        {/* ) : (
          <>
            {window.location.href = import.meta.env.VITE_CLIENT_URL + '/sign-up'}
          </>
        )} */}
      </Routes>
  )
}

export default App
