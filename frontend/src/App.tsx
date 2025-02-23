import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Charts from "./Charts";
import Users from "./Users";
import MainPage from "./components/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/charts" element={<Charts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
