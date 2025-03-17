import { useState, useEffect } from "react";
import { Route, Routes, useLocation , useNavigate,Navigate, replace} from "react-router";
import Public from "./pages/PublicPage.jsx";
import Private from "./pages/PrivatePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import Sidebar from "./components/Sidebar.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { ensureAuthenticated } from "./store/auth.store.js";

function App() {
  const systemTheme = localStorage.getItem("theme") || "dark";
  const [colormode, setColormode] = useState(systemTheme);
  const location = useLocation();
  const {getAuthStatus} = ensureAuthenticated();
  const navigate = useNavigate();

  function toggleColormode() {
    setColormode((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme",newTheme);
      return newTheme;
  });
    return colormode == 'dark' ? 'light' : 'dark';
  }

  useEffect(() => {
    localStorage.setItem("theme", colormode);
  }, [colormode]);

  useEffect(()=>{
    async function checkAuth(){
    await getAuthStatus();
    if(getAuthStatus==true && location.pathname === '/login'){
      navigate('/',{replace : true});
    }
  }
  checkAuth();
  },[getAuthStatus,location.pathname,navigate]);

  return (
    <div className={`${colormode} transition-colors duration-300`}>
      <div className={location.pathname!=='/login' ? "flex min-h-screen dark:bg-gray-900 bg-white dark:text-gray-200 text-gray-900 transition-colors duration-300" : ""}>
        {location.pathname!== '/login' && <Sidebar toggleColormode={toggleColormode} colormode={colormode}/>}
        <div className={location.pathname!=='/login' ? "flex-grow p-6 lg:p-8": ""}>
          <Routes>
            <Route path="/login" element={<LoginPage/>}></Route>  
            <Route element={<ProtectedRoute/>}>
            <Route path="/" element={<Public />} />
            <Route path="/private" element={<Private />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="*" element={<Public/>}/>
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
