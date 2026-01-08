import { useState } from "react";
import { Navigate } from "react-router-dom";

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation

        if (!username || !password || !confirmPassword) {
            alert("All fields are required");
            return;
        }
        if (username.length < 4) {
            alert("Username must be at least 4 characters long");
            return;
        }
        if (password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Send registration request to backend

        const response =await fetch('http://localhost:3000/user/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })    
        });
        if (response.status === 201) {
            alert("Registration successful! Go to Sign In page to log in.");
            setRedirect(true);
        } else {
            alert("Registration failed. Please try again.");
        }

        // Clear form fields
        setUsername("");
        setPassword("");
        setConfirmPassword("");

        if (redirect) {
            return <Navigate to="/signin" />;
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="mx-8 rounded-md border border-gray-50 p-3 bg-gray-200">
                <div className="text-center mb-4 font-bold">
                     <h1>Register Page</h1>
                </div>
                <div>
                    <input type="text" 
                            placeholder="Username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                            className="w-full border border-gray-300 rounded-md my-2 p-2"/>
                    <input type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full border border-gray-300 rounded-md my-2 p-2"/>
                    <input type="password" 
                            placeholder="Confirm Password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            className="w-full border border-gray-300 rounded-md my-2 p-2"/>
                    <button type="submit" className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md">Sign Up</button>
                </div>
            </form>
        </>
    );
}

export default SignUp;