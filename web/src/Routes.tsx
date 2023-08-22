import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout'
import HomeLayout from './layouts/HomeLayout/HomeLayout'
import AdminPage from './pages/AdminPage/AdminPage'
import DashboardListPage from './pages/DashboardListPage/DashboardListPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage'
import SignupPage from './pages/SignupPage/SignupPage'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/dashboard-list" page={DashboardListPage} name="dashboardList" />
      <Set private unauthenticated="home" roles={['ADMIN', 'SUPPORT']} wrap={AdminLayout}>
        <Set wrap={ScaffoldLayout} title="ListMemberships" titleTo="adminListMemberships" buttonLabel="New ListMembership" buttonTo="adminNewListMembership">
          <Route path="/admin/list-memberships/new" page={AdminListMembershipNewListMembershipPage} name="adminNewListMembership" />
          <Route path="/admin/list-memberships/{id:Int}/edit" page={AdminListMembershipEditListMembershipPage} name="adminEditListMembership" />
          <Route path="/admin/list-memberships/{id:Int}" page={AdminListMembershipListMembershipPage} name="adminListMembership" />
          <Route path="/admin/list-memberships" page={AdminListMembershipListMembershipsPage} name="adminListMemberships" />
        </Set>
        <Set wrap={ScaffoldLayout} title="PartnershipLinks" titleTo="adminPartnershipLinks" buttonLabel="New PartnershipLink" buttonTo="adminNewPartnershipLink">
          <Route path="/admin/partnership-links/new" page={AdminPartnershipLinkNewPartnershipLinkPage} name="adminNewPartnershipLink" />
          <Route path="/admin/partnership-links/{id}/edit" page={AdminPartnershipLinkEditPartnershipLinkPage} name="adminEditPartnershipLink" />
          <Route path="/admin/partnership-links/{id}" page={AdminPartnershipLinkPartnershipLinkPage} name="adminPartnershipLink" />
          <Route path="/admin/partnership-links" page={AdminPartnershipLinkPartnershipLinksPage} name="adminPartnershipLinks" />
        </Set>
        <Set wrap={ScaffoldLayout} title="PartnershipContacts" titleTo="adminPartnershipContacts" buttonLabel="New PartnershipContact" buttonTo="adminNewPartnershipContact">
          <Route path="/admin/partnership-contacts/new" page={AdminPartnershipContactNewPartnershipContactPage} name="adminNewPartnershipContact" />
          <Route path="/admin/partnership-contacts/{id:Int}/edit" page={AdminPartnershipContactEditPartnershipContactPage} name="adminEditPartnershipContact" />
          <Route path="/admin/partnership-contacts/{id:Int}" page={AdminPartnershipContactPartnershipContactPage} name="adminPartnershipContact" />
          <Route path="/admin/partnership-contacts" page={AdminPartnershipContactPartnershipContactsPage} name="adminPartnershipContacts" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Partnerships" titleTo="adminPartnerships" buttonLabel="New Partnership" buttonTo="adminNewPartnership">
          <Route path="/admin/partnerships/new" page={AdminPartnershipNewPartnershipPage} name="adminNewPartnership" />
          <Route path="/admin/partnerships/{id:Int}/edit" page={AdminPartnershipEditPartnershipPage} name="adminEditPartnership" />
          <Route path="/admin/partnerships/{id:Int}" page={AdminPartnershipPartnershipPage} name="adminPartnership" />
          <Route path="/admin/partnerships" page={AdminPartnershipPartnershipsPage} name="adminPartnerships" />
        </Set>
        <Set wrap={ScaffoldLayout} title="ListItems" titleTo="adminListItems" buttonLabel="New ListItem" buttonTo="adminNewListItem">
          <Route path="/admin/list-items/new" page={AdminListItemNewListItemPage} name="adminNewListItem" />
          <Route path="/admin/list-items/{id:Int}/edit" page={AdminListItemEditListItemPage} name="adminEditListItem" />
          <Route path="/admin/list-items/{id:Int}" page={AdminListItemListItemPage} name="adminListItem" />
          <Route path="/admin/list-items" page={AdminListItemListItemsPage} name="adminListItems" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Identifiers" titleTo="adminIdentifiers" buttonLabel="New Identifier" buttonTo="adminNewIdentifier">
          <Route path="/admin/identifiers/new" page={AdminIdentifierNewIdentifierPage} name="adminNewIdentifier" />
          <Route path="/admin/identifiers/{id}/edit" page={AdminIdentifierEditIdentifierPage} name="adminEditIdentifier" />
          <Route path="/admin/identifiers/{id}" page={AdminIdentifierIdentifierPage} name="adminIdentifier" />
          <Route path="/admin/identifiers" page={AdminIdentifierIdentifiersPage} name="adminIdentifiers" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Lists" titleTo="adminLists" buttonLabel="New List" buttonTo="adminNewList">
          <Route path="/admin/lists/new" page={AdminListNewListPage} name="adminNewList" />
          <Route path="/admin/lists/{id:Int}/edit" page={AdminListEditListPage} name="adminEditList" />
          <Route path="/admin/lists/{id:Int}" page={AdminListListPage} name="adminList" />
          <Route path="/admin/lists" page={AdminListListsPage} name="adminLists" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Users" titleTo="adminUsers" buttonLabel="New User" buttonTo="adminNewUser">
          <Route path="/admin/users/new" page={AdminUserNewUserPage} name="adminNewUser" />
          <Route path="/admin/users/{id:Int}/edit" page={AdminUserEditUserPage} name="adminEditUser" />
          <Route path="/admin/users/{id:Int}" page={AdminUserUserPage} name="adminUser" />
          <Route path="/admin/users" page={AdminUserUsersPage} name="adminUsers" />
        </Set>
        <Set wrap={ScaffoldLayout} title="People" titleTo="adminPeople" buttonLabel="New Person" buttonTo="adminNewPerson">
          <Route path="/admin/people/new" page={AdminPersonNewPersonPage} name="adminNewPerson" />
          <Route path="/admin/people/{id:Int}/edit" page={AdminPersonEditPersonPage} name="adminEditPerson" />
          <Route path="/admin/people/{id:Int}" page={AdminPersonPersonPage} name="adminPerson" />
          <Route path="/admin/people" page={AdminPersonPeoplePage} name="adminPeople" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Groups" titleTo="adminGroups" buttonLabel="New Group" buttonTo="adminNewGroup">
          <Route path="/admin/groups/new" page={AdminGroupNewGroupPage} name="adminNewGroup" />
          <Route path="/admin/groups/{id:Int}/edit" page={AdminGroupEditGroupPage} name="adminEditGroup" />
          <Route path="/admin/groups/{id:Int}" page={AdminGroupGroupPage} name="adminGroup" />
          <Route path="/admin/groups" page={AdminGroupGroupsPage} name="adminGroups" />
        </Set>
        <Route path="/admin" page={AdminPage} name="admin" />
      </Set>
      <Set wrap={DashboardLayout}>
        <Route path="/dashboard/groups" page={GroupsPage} name="groups" />
        <Route path="/dashboard/lists" page={ListsPage} name="lists" />
        <Route path="/dashboard/lists/{id:Int}" page={DashboardListPage} name="list" />
        <Route path="/dashboard/settings" page={SettingsPage} name="settings" />
        <Route path="/dashboard/profile" page={ProfilePage} name="profile" />
        <Route path="/dashboard" page={DashboardPage} name="dashboard" />
      </Set>

      <Set wrap={HomeLayout}>
        {/* */}
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        {/* TODO: prerender? */}
        <Route path="/{identifier}" page={IdentifierPage} name="identifier" />
        {/* TODO: prerender */}
        <Route path="/" page={HomePage} name="home" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
