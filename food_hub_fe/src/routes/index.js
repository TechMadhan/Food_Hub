import React from "react";
import {
  Route,
  Navigate,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
  Outlet,
} from "react-router-dom";
import MenuItem from "../components/MenuItems";
import WelcomeScreen from "../components/WelcomeScreen";
import ScanQR from "../components/ScanQR";
import ThankYou from "../components/Thankyou";
import { createBrowserHistory } from "history";
import { useAuth } from "../store/hooks";
import { useMenu } from "../store/hooks/menu";

const history = createBrowserHistory({ window });

export const UIRoute = () => {
  const auth = useAuth();
  const { menuItems } = useMenu();
  return (
    <HistoryRouter history={history}>
      <Routes>
        {auth.user ? (
          <>
            <Route
              path="/menu"
              exact
              element={
                <MenuItem history={history} auth={auth} menuItems={menuItems} />
              }
            />
            <Route path="*" element={<Navigate to="/menu" />} />
          </>
        ) : (
          <>
            <Route
              path="/welcome/:tableID"
              element={<WelcomeScreen history={history} />}
            />
            <Route path="/scan-qr" element={<ScanQR />} />
            <Route path="*" element={<Navigate to="/scan-qr" />} />
          </>
        )}
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<Navigate to="/thank-you" />} />
      </Routes>
    </HistoryRouter>
  );
};
