import React, { useState } from 'react';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);


  const buttonActiveClasses = 'w-1/2 py-2 px-4 rounded-md text-sm font-medium text-gray-800 bg-white shadow-sm ring-1 ring-gray-200';
  const buttonInactiveClasses = 'w-1/2 py-2 px-4 rounded-md text-sm font-medium text-gray-500 bg-gray-50 hover:bg-gray-100';
  const inputClasses = 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm';
  const labelClasses = 'block text-sm font-medium text-gray-700 text-left';
  const primaryButtonClasses = 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';



  const Header = () => (
    <div>
      <h2 className="mt-6 text-left text-3xl font-bold text-gray-900">
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h2>
      <p className="mt-2 text-left text-sm text-gray-600">
        {isLogin ? 'Sign in to access your dashboard' : 'Register to get started'}
      </p>
    </div>
  );

  const LoginView = () => (
    <>
      <div>
        <label htmlFor="email" className={labelClasses}>
          Email
        </label>
        <div className="mt-1">
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClasses}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className={labelClasses}>
          Password
        </label>
        <div className="mt-1">
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={inputClasses}
            placeholder="••••••••"
            
          />
        </div>
      </div>
      
      <div>
        <button type="submit" className={primaryButtonClasses}>
          Sign In
        </button>
      </div>
    </>
  );

  const RegisterView = () => (
    <>
      <div>
        <label htmlFor="fullname" className={labelClasses}>
          Full Name
        </label>
        <div className="mt-1">
          <input
            id="fullname"
            name="fullname"
            type="text"
            required
            className={inputClasses}
            placeholder="John Doe"
          />
        </div>
      </div>

      <div>
        <label htmlFor="register-email" className={labelClasses}>
          Email
        </label>
        <div className="mt-1">
          <input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClasses}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="register-password" className={labelClasses}>
          Password
        </label>
        <div className="mt-1">
          <input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className={inputClasses}
            placeholder="••••••••"
           
          />
        </div>
      </div>

      <div>
        <label htmlFor="role" className={labelClasses}>
          Role
        </label>
        <div className="mt-1">
          <select
            id="role"
            name="role"
            required
            className={`${inputClasses} appearance-none pr-10`}
            defaultValue="employee"
          >
            <option value="user">User</option>
          
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
      
      <div>
        <button type="submit" className={primaryButtonClasses}>
          Create Account
        </button>
      </div>
    </>
  );



  return (
    <div className="min-h-screen  bg-gradient-to-br from-slate-100 via-blue-100 to-slate-200  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">
        
        <Header />
        
        <div className="mt-8">
          <div className="flex bg-gray-50 p-1 rounded-lg mb-8">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={isLogin ? buttonActiveClasses : buttonInactiveClasses}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={!isLogin ? buttonActiveClasses : buttonInactiveClasses}
            >
              Register
            </button>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {isLogin ? <LoginView /> : <RegisterView />}
          </form>
        </div>

      </div>
    </div>
  );
};

export default AuthForm;





