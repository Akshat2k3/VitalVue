import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [fruit,setFruit] = useState('');
    const [isPending,setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { name, fruit };

        setIsPending(true);

        fetch('/api/users/', {
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
        <div className="signup">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input 
                    type="text"
                    required
                    value={ name }
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Fruit:</label>
                <select 
                required
                value={ fruit }
                onChange={(e) => setFruit(e.target.value)}
                >
                    <option value="Apple">Apple</option>
                    <option value="Banana">Banana</option>
                    <option value="Orange">Orange</option>
                    <option value="Peach">Peach</option>
                </select>
                { !isPending && <button>Add</button> }
                { isPending && <button disabled>Adding User...</button> }
            </form>
        </div>
     );
}

export default Signup;
