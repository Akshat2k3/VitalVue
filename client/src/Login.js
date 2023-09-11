import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { email, password };

        setIsPending(true);

        fetch('/???/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(() => {
            console.log("User Logged In");
            setIsPending(false);
            navigate('/');
        })
    }

    return ( 
        <div className="logon">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input 
                    type="text"
                    required
                    value={ email }
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password:</label>
                <input 
                    type="password"
                    required
                    value={ password }
                    onChange={(e) => setPassword(e.target.value)}
                />
                { !isPending && <button>Add</button> }
                { isPending && <button disabled>Adding User...</button> }
            </form>
        </div>
     );
}
 
export default Login;