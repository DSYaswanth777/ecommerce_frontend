import Header from "./components/Header/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import Login from "./pages/LoginPage";
import PosterSlider from "./components/PosterSlider/PosterSlider";
import Signup from "./components/SignUp/Signup";
import Home from "./pages/HomePage";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Categories from "./components/Categories/Categories";
import PublicRoutes from "./Routes/PublicRoutes";

function App() {
  return (
    <>
{/* <Home/> */}
{/* <Login/> */}
{/* <Signup/> */}
{/* <ForgotPassword/> */}
{/* <ResetPassword/> */}
{/* <AddProduct/> */}
<PublicRoutes/>
    </>
  );
}

export default App;
