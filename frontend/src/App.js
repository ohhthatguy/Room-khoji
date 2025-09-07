import {Routes, Route} from 'react-router-dom'
import { createPortal } from 'react-dom'
import { useContext } from 'react'
import { Toaster } from 'react-hot-toast';
// At the top of your App.js or Map component
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import Login from './components/Accounts/Login'
import Signup from './components/Accounts/Signup'
import TenantHome from './components/Home/TenantHome'
import LandLordHome from './components/Home/LandLordHome'
import ProductMarket from './components/Home/tenant/ProductMarket'
import BusinessTalk from './components/Home/tenant/BusinessTalk'
import FavroitProduct from './components/Home/tenant/FavroitProduct'
import Ecom from './components/Accounts/Ecom'
import Recommened from './components/Home/tenant/Recommened';

import LogOut from './components/Logout/LogOut'
import { DataContext } from './context/DataProvider'






const App = () => {

  const {openPortal, darkMode} = useContext(DataContext)
  const root = document.getElementById('root')
// 

  if(darkMode){
    root.style.background = '#232B2B';
  }else{
    root.style.background = '#F8F8FF';

  }

  return (<>

    
    { createPortal( openPortal && <LogOut />, root) }

   <Toaster position="top-right" reverseOrder={false} />

    <Routes>

      <Route path="/" element={<Login />} />

      {/* <Route path="/" element={<Ecom />} /> */}

      <Route path="/create/account" element={<Signup />} />

     <Route path="/tenantHome" element={<TenantHome darkMode={darkMode} />} />
     <Route path="/landlordHome" element={<LandLordHome darkMode={darkMode}/>} />
     <Route path='/tenant/productmarket/:Category' element={<ProductMarket darkMode={darkMode}/>} />
     <Route path='/tenant/BusinessTalk/:id' element={<BusinessTalk darkMode={darkMode}/>} />
     <Route path='/tenant/favroit' element={<FavroitProduct darkMode={darkMode}/>} />
     <Route path='/tenant/recommended/:Category' element={<Recommened darkMode={darkMode}/>} />


   



     
    </Routes>

    </>)
}

export default App