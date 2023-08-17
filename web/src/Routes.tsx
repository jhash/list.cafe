// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import HomeLayout from './layouts/HomeLayout/HomeLayout'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage'
import SignupPage from './pages/SignupPage/SignupPage'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={HomeLayout}>
        <Private unauthenticated="forbidden" roles={['admin', 'support']} wrap={AdminLayout}>
          <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
            <Route path="/admin/users/new" page={UserNewUserPage} name="newUser" />
            <Route path="/admin/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
            <Route path="/admin/users/{id:Int}" page={UserUserPage} name="user" />
            <Route path="/admin/users" page={UserUsersPage} name="users" />
          </Set>
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
