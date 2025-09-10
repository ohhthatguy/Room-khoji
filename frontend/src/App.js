import { Routes, Route, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";
// At the top of your App.js or Map component
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Accounts/Login";
import Signup from "./components/Accounts/Signup";
import TenantHome from "./components/Home/TenantHome";
import LandLordHome from "./components/Home/LandLordHome";
import ProductMarket from "./components/Home/tenant/ProductMarket";
import BusinessTalk from "./components/Home/tenant/BusinessTalk";
import FavroitProduct from "./components/Home/tenant/FavroitProduct";
import Ecom from "./components/Accounts/Ecom";
import Recommened from "./components/Home/tenant/Recommened";
import Schedule from "./components/Home/Schedule";

import LogOut from "./components/Logout/LogOut";
import { DataContext } from "./context/DataProvider";

import { Modal, ModalBody, ModalFooter, ModalHeader , Button} from "reactstrap";

const App = () => {
  const { openPortal, setOpenPortal, darkMode } = useContext(DataContext);
  const root = document.getElementById("root");
  const navigate = useNavigate();
  //

  if (darkMode) {
    root.style.background = "#232B2B";
  } else {
    root.style.background = "#F8F8FF";
  }

  const handleLogOut1 =()=>{
        navigate('/')
        localStorage.clear() //clear data stored
        setOpenPortal(false)
    }

  return (
    <>
      {/* { createPortal( openPortal && <LogOut />, root) } */}

      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Login />} />

        {/* <Route path="/" element={<Ecom />} /> */}

        <Route path="/create/account" element={<Signup />} />
        <Route path="/myschedule" element={<Schedule darkMode={darkMode} />} />

        <Route
          path="/tenantHome"
          element={<TenantHome darkMode={darkMode} />}
        />
        <Route
          path="/landlordHome"
          element={<LandLordHome darkMode={darkMode} />}
        />
        <Route
          path="/tenant/productmarket/:Category"
          element={<ProductMarket darkMode={darkMode} />}
        />
        <Route
          path="/tenant/BusinessTalk/:id"
          element={<BusinessTalk darkMode={darkMode} />}
        />
        <Route
          path="/tenant/favroit"
          element={<FavroitProduct darkMode={darkMode} />}
        />
        <Route
          path="/tenant/recommended/:Category"
          element={<Recommened darkMode={darkMode} />}
        />
      </Routes>

      <Modal isOpen={openPortal} toggle={()=>setOpenPortal(prev=>!prev)} centered scrollable>
        <ModalHeader toggle={()=>setOpenPortal(prev=>!prev)}>Logout</ModalHeader>
        <ModalBody style={{ maxHeight: "60vh", overflowY: "auto" }}>
          You want to logout ? 
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={()=>setOpenPortal(false)}>
            Cancel
          </Button>

            <Button color="primary" onClick={handleLogOut1}>
            LogOut
          </Button>
          
        </ModalFooter>
      </Modal>
    </>
  );
};

export default App;
