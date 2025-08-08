import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SearchCase, UploadDocuments, ViewAllCase } from "./components";
import CasePage from "./components/case/CasePage";
import SideBar from "./components/SideBar";
import { Dashboard, LoginPage, NotFound, SettingPage } from "./pages";
import { CreateCase } from "./pages/(admin)";
import { CreateCaseUser } from "./pages/(user)";
import { useAuth } from "./providers/AuthenticationContext";
import { CreateTemplatePage } from "./pages/(admin)/template";

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
                  <Route path="/cases/history/:id" element={<CasePage />} />
                  <Route path="/documents/generate" element={<CreateTemplatePage />} />
                </>
                :
                <>
                  <Route path="/cases/create" element={<CreateCaseUser />} />
                  <Route path="/cases" element={<ViewAllCase />} />
                  <Route path="/cases/:id" element={<CasePage />} />
                </>
              }
              <Route path="/documents/upload" element={<UploadDocuments />} />
              <Route path="/cases/search" element={<SearchCase />} />
              <Route path="/settings" element={<SettingPage />} />
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
