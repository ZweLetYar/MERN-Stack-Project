import Layout from "../layout/Layout";
import Create from "../pages/Create";
import Home from "../pages/Home";
// import About from "../pages/About";
// import Contact from "../pages/Contact";
import { Route, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="create" element={<Create />} />
        <Route path="edit/:id" element={<Create />} />
        {/* <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} /> */}
      </Route>
    </Routes>
  );
}
