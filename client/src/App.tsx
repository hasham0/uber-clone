import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SuspenseWrapper from "./components/suspense-wrapper";
import Layout from "./layout/Layout";
import QueryProvider from "./providers/query-provider";
import UserContext from "./context/user-context";
import StartScreen from "./pages/StartScreen";
import { Toaster } from "react-hot-toast";
import UserProtectedWrapper from "./protected/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainContext from "./context/captain-context";
import CaptainProtectedWrapper from "./protected/CaptainProtectedWrapper";
import CaptainLogout from "./pages/CaptainLogout";

const Riding = lazy(() => import("./pages/Riding"));
const CaptainLogin = lazy(() => import("./pages/CaptainLogin"));
const UserLogin = lazy(() => import("./pages/UserLogin"));
const UserRegister = lazy(() => import("./pages/UserSignup"));
const CaptainRegister = lazy(() => import("./pages/CaptainSignup"));
const CaptainHome = lazy(() => import("./pages/CaptainHome"));
const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <CaptainContext>
      <UserContext>
        <QueryProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<StartScreen />} />
                <Route
                  path="/home"
                  element={
                    <UserProtectedWrapper>
                      <SuspenseWrapper>
                        <Home />
                      </SuspenseWrapper>
                    </UserProtectedWrapper>
                  }
                />
                {/* <!-- user signup,login and logout --> */}
                <Route
                  path="/signup"
                  element={
                    <SuspenseWrapper>
                      <UserRegister />
                    </SuspenseWrapper>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <SuspenseWrapper>
                      <UserLogin />
                    </SuspenseWrapper>
                  }
                />{" "}
                <Route
                  path="/logout"
                  element={
                    <UserProtectedWrapper>
                      <SuspenseWrapper>
                        <UserLogout />
                      </SuspenseWrapper>
                    </UserProtectedWrapper>
                  }
                />{" "}
                <Route
                  path="/riding"
                  element={
                    <UserProtectedWrapper>
                      <SuspenseWrapper>
                        <Riding />
                      </SuspenseWrapper>
                    </UserProtectedWrapper>
                  }
                />
                {/* <!-- captain signup and login --> */}
                <Route
                  path="/captain-signup"
                  element={
                    <SuspenseWrapper>
                      <CaptainRegister />
                    </SuspenseWrapper>
                  }
                />
                <Route
                  path="/captain-login"
                  element={
                    <SuspenseWrapper>
                      <CaptainLogin />
                    </SuspenseWrapper>
                  }
                />{" "}
                <Route
                  path="/captain-logout"
                  element={
                    <CaptainProtectedWrapper>
                      <SuspenseWrapper>
                        <CaptainLogout />
                      </SuspenseWrapper>
                    </CaptainProtectedWrapper>
                  }
                />
                <Route
                  path="/captain-home"
                  element={
                    <CaptainProtectedWrapper>
                      <SuspenseWrapper>
                        <CaptainHome />
                      </SuspenseWrapper>
                    </CaptainProtectedWrapper>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryProvider>
        <Toaster position="top-right" reverseOrder={true} />
      </UserContext>
    </CaptainContext>
  );
}

export default App;
