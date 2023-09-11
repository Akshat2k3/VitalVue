import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/"> <h1>Vital Vue</h1> </Link>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/signup">Sign-up</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
}

export default Navbar;