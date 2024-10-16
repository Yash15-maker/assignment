import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import Login from './components/Auth/Login.jsx';
import UserList from './components/Users/UserList.jsx';
import EditUser from './components/Users/EditUser.jsx';
import Header from './components/Layout/Header.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { Suspense } from 'react';

const App = () => {
  return (
    <Suspense fallback={<div className='spinner'></div>}>
      <AuthProvider>
        <UserProvider>
          <Router>
            <div className="min-h-screen bg-gray-100">
              <Header />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<RedirectToUsers />} />
                  <Route path="/users" element={<ProtectedRoute element={UserList} />} />
                  <Route path="/users/:id/edit" element={<ProtectedRoute element={EditUser} />} />
                </Routes>
              </main>
            </div>
          </Router>
        </UserProvider>
      </AuthProvider>
    </Suspense>
  );
};

const RedirectToUsers = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/users" replace /> : <Login />;
};

export default App;
