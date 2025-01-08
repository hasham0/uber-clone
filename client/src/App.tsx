import { lazy } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SuspenseWrapper from "./components/suspense-wrapper";
import Layout from "./layout/Layout";
import QueryProvider from "./providers/query-provider";
import UserContext from "./context/user-context";
const CaptainLogin = lazy(() => import("./pages/CaptainLogin"));
const UserLogin = lazy(() => import("./pages/UserLogin"));
const UserRegister = lazy(() => import("./pages/UserRegister"));
const CaptainRegister = lazy(() => import("./pages/CaptainRegister"));

function App() {
  return (
    <UserContext>
      <QueryProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
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
              />
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
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryProvider>
    </UserContext>
  );
}

export default App;
