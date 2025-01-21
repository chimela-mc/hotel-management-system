'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () =>  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
    console.log('Form submitted');
    console.log('Email:', email);
    console.log('Password:', password);

    try {
      // Sending the login request to the backend
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),  // Send email and password
        credentials: 'include', // ensures cookies are sent with the request
      });

      const data = await response.json();
      console.log('Fetch data:', data);

      if (response.ok) {
        console.log('login succesful');  // Log access token
        // localStorage.setItem("token", data.access);
        router.push('/dashboard');
      } else {
        console.error('Login error:', data);
        setErrors(data);  // Handle error response
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ non_field_errors: ['An unexpected error occurred. Please try again.'] });
    }
  };

  // const fetchData = async () => {
  //   const token = localStorage.getItem('token');
  //   const response = await fetch('http://127.0.0.1:8000/api/protected-endpoint/', {
  //     method: 'GET',
  //     headers: { 'Authorization': `Bearer ${token}` },
  //   });
  
  //   if (response.status === 401) {
  //     // Token has expired, refresh it
  //     const refreshToken = localStorage.getItem('refresh_token');
  //     const refreshResponse = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ refresh: refreshToken }),
  //     });
  
  //     if (refreshResponse.ok) {
  //       const { access } = await refreshResponse.json();
  //       localStorage.setItem('token', access);
  //       // Retry the original request
  //       return fetchData();
  //     } else {
  //       // Handle case where refresh fails
  //       console.error('Token refresh failed');
  //     }
  //   }
  
  //   const data = await response.json();
  //   return data;
  // };
  
  
  

  // const handleGoogleLogin = async () => {
  //   // Perform Google login logic here, e.g., redirect to Google auth page
  //   window.location.href = '/api/google-login';
  // };

  return (
    <div className="container mx-auto p-4 w-full max-w-sm">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      {errors.non_field_errors && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          {errors.non_field_errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
      {/* <div className="mt-4">
        <p className="text-gray-600 text-center">
          or login with Google
        </p>
        <button
          onClick={handleGoogleLogin}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Google Login
        </button>
      </div> */}
      <div className="mt-4">
        <p className="text-gray-600 text-center">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;