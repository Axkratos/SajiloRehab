import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios to make API calls

const GoogleLogin = (props) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult.code) {
        // Send the authorization code to the backend to exchange for tokens
        const result = await axios.get('http://localhost:8000/api/v1/auth/google/callback', {
          params: { code: authResult.code }, // Pass the authorization code in query params
        });
  
        const { accessToken, refreshToken } = result.data;
  
        // Store tokens in localStorage or sessionStorage
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
  
        // Redirect or navigate to a protected page
        navigate('/dashboard');
      } else {
        throw new Error('Google login failed');
      }
    } catch (e) {
      console.error('Error during Google login:', e);
    }
  };
  

  // Google login button handler
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div className="App">
      <button onClick={googleLogin}>Sign in with Google</button>
    </div>
  );
};

export default GoogleLogin;
