import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Signup from './Signup';

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element= { <Home /> } />
            <Route path="/signup" element= { <Signup /> } />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App