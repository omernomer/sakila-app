import { BrowserRouter, Route, Routes } from "react-router";
import MainPage from "./components/MainPage";
import Charts from "./containers/Charts";
import Users from "./containers/Users";

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
