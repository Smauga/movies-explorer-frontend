import React from 'react';
import { Redirect } from "react-router-dom";
import { useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children, loggedIn }) => {
  const location = useLocation();
  
  // Редирект на /movies, если зайти авторизованным на страницы авторизации/регистрации
  if(location.pathname === '/signup' || location.pathname === '/signin') {
    if(loggedIn) return <Redirect to="/movies" />;
    else return children;
  }
  
  // Редирект на главную страницу, если зайти на защищенный роут неавторизованным
  if(loggedIn) return children;
  else return <Redirect to="/" />;
}

export default ProtectedRoute;