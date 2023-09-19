import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullName = `${firstName} ${lastName}`;
        const user = { name: fullName, email, password, gender, birthdate };
    
        setIsPending(true);
    
        fetch('/api/register', {
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
                <div>
                    <label>First Name:</label>
                    <input 
                        type="text"
                        required
                        value={ firstName }
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label>Last Name:</label>
                    <input 
                        type="text"
                        required
                        value={ lastName }
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <label>Email:</label>
                <input 
                    type="email"
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
                <label>Gender:</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <label>Birthdate:</label>
                <input 
                    type="date"
                    required
                    value={ birthdate }
                    onChange={(e) => setBirthdate(e.target.value)}
                />                
                { !isPending && <button>Add</button> }
                { isPending && <button disabled>Adding User...</button> }
            </form>
        </div>
     );
}

export default Signup;