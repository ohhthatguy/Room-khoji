import {Routes, Route} from 'react-router-dom'
import Login from './components/Accounts/Login'
import Signup from './components/Accounts/Signup'
import TenantHome from './components/Home/TenantHome'
import LandLordHome from './components/Home/LandLordHome'
import ProductMarket from './components/Home/tenant/ProductMarket'



const App = () => {
  return (<>
    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/create/account" element={<Signup />} />

     <Route path="/tenantHome" element={<TenantHome />} />
     <Route path="/landlordHome" element={<LandLordHome />} />
     <Route path='/tenant/productmarket/:Category' element={<ProductMarket />} />


     
    </Routes>

    </>)
}

export default App