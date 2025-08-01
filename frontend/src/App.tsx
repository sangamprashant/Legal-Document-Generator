import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SideBar from "./components/SideBar";
import { AnalyticsPage, Dashboard, LoginPage, NotFound, SettingPage } from "./pages";
import { CreateCase } from "./pages/(admin)";
import { CreateCaseUser } from "./pages/(user)";
import { useAuth } from "./providers/AuthenticationContext";
import { SearchCase, ViewAllCase } from "./components";

function App() {
  const { user } = useAuth()
  return (
    <>
      {user ?
        <SideBar>
          <Routes>
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {user.role === "advocate"
                ?
                <>
                  <Route path="/cases/create" element={<CreateCase />} />
                  <Route path="/cases/history" element={<ViewAllCase />} />
                </>
                :
                <>
                  <Route path="/cases/create" element={<CreateCaseUser />} />
                  <Route path="/cases" element={<ViewAllCase />} />
                </>
              }
              <Route path="/cases/search" element={<SearchCase />} />
              <Route path="/settings" element={<SettingPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="*" element={<NotFound />} />
            </>
          </Routes>
        </SideBar>
        :
        <LoginPage />
      }
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  )
}

export default App
