import NavBar from "./Nav";
import "./App.css";
import Blog from "./Blog";
import { Routes, Route } from "react-router-dom";
import BlogCreate from "./BlogCreate";
import BlogUpdate from "./BlogUpdate";
import Draft from './Draft'
import Blogpublish from './Blogpublish'

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="draft" element={<Draft />} />
        <Route path="create" element={<BlogCreate />} />
        <Route path="update/:id" element={<BlogUpdate />} />
        <Route path="publish/:id" element={<Blogpublish />} />
      </Routes>
    </div>
  );
}

export default App;
