import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';
import '../style/Loginstyle.css';
import  { BASE_URL }  from   './axiosService.js' ;
import Clock from "./Clock.js"; 

function Login() {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const [showRegistrationContent, setShowRegistrationContent] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () => {
    axios.post(BASE_URL + 'Login/login', formData,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        const token = response.data.token;
        const isAdmin = response.data.isAdmin;
        const userId = response.data.userId;
        localStorage.setItem('token', token);
        localStorage.setItem('isAdmin',isAdmin)
        localStorage.setItem('userId',userId)
        if (token){
            navigate('/urlpage', { replace: true });
        }
        if (token && isAdmin) {
          navigate('/dataFromDb', { replace: true });
          }
        else {
          setError('Incorrect username or password');
        }
      })
      .catch((error) => {
        console.error(error);
        setError('Error during login');
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="form-group-login">
        <label>Username</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group-login">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <button onClick={handleLogin} id = "login">Login</button>
      {error && <div className="error-message">{error}</div>}
        <p>
          Don't have an account? 
       </p>
          <Link id='link' to="/registration" onClick={() => setShowRegistrationContent(true)}>
            <p>Register here</p>
          </Link>
          {showRegistrationContent && (
      <div id="registration">
        <h2>Registration Content</h2>
        <p>Somethink</p>
      </div>
    )}
        <Clock />
    </div>
    
  );
}

export default Login;