import './App.css';
import {store} from "./app/store";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import {Provider} from "react-redux";
import React from "react";
import HomeView from "./views/HomeView";
import DashboardView from "./views/DashboardView";

function App() {
  return (
      <Provider store={store}>
        <Router>
          <Header/>
          <Routes>
            <Route path="/">
              <Route index element={<HomeView />} />
                <Route path="dashboard" element={<DashboardView />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
  );
}

export default App;
