import { Toaster } from "react-hot-toast";
import Routes from "./Routes/Routes";

function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          // Define default options
          className: "",
          duration: 1000,
          // Default options for specific types
          success: {
            duration: 1000,
          },
        }}
        position="top-right"
        reverseOrder={false}
      />
      <Routes />
    </>
  );
}

export default App;
