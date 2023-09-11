import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { name, email, comment };

        setIsPending(true);

        fetch('/api/information', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(() => {
            console.log("New User Added");
            setIsPending(false);
            navigate('/');
        })
    }

    return ( 
        <div className="logon">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input 
                    type="text"
                    required
                    value={ name }
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Email:</label>
                <input 
                    type="text"
                    required
                    value={ email }
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Comment:</label>
                <input 
                    type="text"
                    required
                    value={ comment }
                    onChange={(e) => setComment(e.target.value)}
                />                
                { !isPending && <button>Add</button> }
                { isPending && <button disabled>Adding User...</button> }
            </form>
        </div>
     );
}

export default Signup;
