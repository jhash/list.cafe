import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import AdminLayout from './layouts/AdminLayout/AdminLayout'
import DashboardLayout, { DashboardLoading } from './layouts/DashboardLayout/DashboardLayout'
import HomeLayout from './layouts/HomeLayout/HomeLayout'
import AdminPage from './pages/AdminPage/AdminPage'
import DashboardListPage from './pages/DashboardListPage/DashboardListPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage'
import SignupPage from './pages/SignupPage/SignupPage'

const Routes = ({ useAuth }) => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/person" page={PersonPage} name="person" />
      <Set private unauthenticated="home" roles={['ADMIN', 'SUPPORT']} wrap={AdminLayout}>
        <Set wrap={ScaffoldLayout} title="ListGroupMemberships" titleTo="adminListGroupMemberships" buttonLabel="New ListGroupMembership" buttonTo="adminNewListGroupMembership">
          <Route path="/admin/list-group-memberships/new" page={AdminListGroupMembershipNewListGroupMembershipPage} name="adminNewListGroupMembership" />
          <Route path="/admin/list-group-memberships/{id:Int}/edit" page={AdminListGroupMembershipEditListGroupMembershipPage} name="adminEditListGroupMembership" />
          <Route path="/admin/list-group-memberships/{id:Int}" page={AdminListGroupMembershipListGroupMembershipPage} name="adminListGroupMembership" />
          <Route path="/admin/list-group-memberships" page={AdminListGroupMembershipListGroupMembershipsPage} name="adminListGroupMemberships" />
        </Set>
        <Set wrap={ScaffoldLayout} title="GroupMemberships" titleTo="adminGroupMemberships" buttonLabel="New GroupMembership" buttonTo="adminNewGroupMembership">
          <Route path="/admin/group-memberships/new" page={AdminGroupMembershipNewGroupMembershipPage} name="adminNewGroupMembership" />
          <Route path="/admin/group-memberships/{id:Int}/edit" page={AdminGroupMembershipEditGroupMembershipPage} name="adminEditGroupMembership" />
          <Route path="/admin/group-memberships/{id:Int}" page={AdminGroupMembershipGroupMembershipPage} name="adminGroupMembership" />
          <Route path="/admin/group-memberships" page={AdminGroupMembershipGroupMembershipsPage} name="adminGroupMemberships" />
        </Set>
        <Set wrap={ScaffoldLayout} title="ListMemberships" titleTo="adminListMemberships" buttonLabel="New ListMembership" buttonTo="adminNewListMembership">
          <Route path="/admin/list-memberships/new" page={AdminListMembershipNewListMembershipPage} name="adminNewListMembership" />
          <Route path="/admin/list-memberships/{id:Int}/edit" page={AdminListMembershipEditListMembershipPage} name="adminEditListMembership" />
          <Route path="/admin/list-memberships/{id:Int}" page={AdminListMembershipListMembershipPage} name="adminListMembership" />
          <Route path="/admin/list-memberships" page={AdminListMembershipListMembershipsPage} name="adminListMemberships" />
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
      <Set wrap={DashboardLayout} private whileLoadingAuth={DashboardLoading} unauthenticated="home">
        <Route path="/dashboard/groups" page={GroupsPage} name="groups" />
        <Route path="/dashboard/groups/new" page={DashboardGroupPage} name="newGroup" />
        <Route path="/dashboard/groups/{id:Int}" page={DashboardGroupPage} name="group" />
        <Route path="/dashboard/lists" page={ListsPage} name="lists" />
        <Route path="/dashboard/lists/new" page={DashboardListPage} name="newList" />
        <Route path="/dashboard/lists/{id:Int}/settings" page={ListSettingsPage} name="listSettings" />
        <Route path="/dashboard/lists/{id:Int}/members" page={ListMembersPage} name="listMembers" />
        <Route path="/dashboard/lists/{id:Int}" page={DashboardListPage} name="list" />
        <Route path="/dashboard/settings" page={SettingsPage} name="settings" />
        <Route path="/profile-settings" page={ProfileSettingsPage} name="profileSettings" />
        <Route path="/dashboard/profile" page={ProfilePage} name="profile" />
        <Route path="/dashboard" page={DashboardPage} name="dashboard" prerender />
      </Set>

      <Set wrap={HomeLayout} prerender>
        {/* */}
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        <Route path="/draft" page={ListDraftPage} name="listDraft" />
        <Route path="/explore" page={ExplorePage} name="explore" />
        <Route path="/404" page={NotFoundPage} prerender name="404" />
        {/* TODO: prerender? */}
        <Route path="/{identifier}" page={IdentifierPage} name="identifier" />
        <Route path="/" page={HomePage} name="home" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
