import { useEffect } from 'react'

import { themeChange } from 'theme-change'

import { Set, Router, Route, Private } from '@redwoodjs/router'

import { useAuth } from './auth'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import HomeLayout from './layouts/HomeLayout/HomeLayout'
import AdminPage from './pages/AdminPage/AdminPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage'
import SignupPage from './pages/SignupPage/SignupPage'

const Routes = () => {
  useEffect(() => {
    themeChange(false)
  }, [])

  return (
    <Router useAuth={useAuth}>
      <Set wrap={HomeLayout}>
        <Private unauthenticated="forbidden" roles={['admin', 'support']} wrap={AdminLayout}>
          <Route path="/admin" page={AdminPage} name="admin" />
        </Private>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        <Route path="/" page={HomePage} name="home" />
        <Route path="/forbidden" page={ForbiddenPage} name="forbidden" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
