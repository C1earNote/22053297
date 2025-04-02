import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Users from "@/pages/Users";
import Posts from "@/pages/Posts";

const App = () => (
    <Router>
        <nav>
            <Link to="/">Users</Link>
            <Link to="/posts">Posts</Link>
        </nav>
        <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/posts" element={<Posts />} />
        </Routes>
    </Router>
);

export default App;
