import react from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
  Outlet,
} from "react-router-dom";
import MenuItem from "../components/MenuItems";
import WelcomeScreen from "../components/WelcomeScreen";
import { createBrowserHistory } from "history";

const history = createBrowserHistory({ window });

function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  if (isAuthenticated === "false") return <Navigate to={"/welcome/45"} />;

  return <Outlet />;
}

export const UIRoute = () => {
  return (
    <HistoryRouter history={history}>
      {/* <Router> */}
      <Routes>
        <Route
          path="/welcome/:tableID"
          element={<WelcomeScreen history={history} />}
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/menu" exact element={<MenuItem history={history} />} />
        </Route>
      </Routes>
      {/* </Router> */}
    </HistoryRouter>
  );
};
