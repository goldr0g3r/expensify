export enum Roles {
  // User
  SUPER_USER = 'SUPER_USER',
  ADMIN = 'ADMIN',
  BANNED = 'BANNED',
  SUSPENDED = 'SUSPENDED',
  MEMBER = 'MEMBER',

  ACCESS_PROFILE = 'ACCESS_PROFILE',
  VIEW_DEVICES = 'VIEW_DEVICES',
  REMOVE_DEVICES = 'REMOVE_DEVICES',
  LOGIN = 'LOGIN',

  // Currency
  CREATE_CURRENCY = 'CREATE_CURRENCY',
  READ_CURRENCY = 'READ_CURRENCY',
  UPDATE_CURRENCY = 'UPDATE_CURRENCY',
  DELETE_CURRENCY = 'DELETE_CURRENCY',
  USE_CURRENCY = 'USE_CURRENCY',

  // Expense
  CREATE_EXPENSE = 'CREATE_EXPENSE',
  READ_EXPENSE = 'READ_EXPENSE',
  UPDATE_EXPENSE = 'UPDATE_EXPENSE',
  DELETE_EXPENSE = 'DELETE_EXPENSE',
  APPROVE_EXPENSE = 'APPROVE_EXPENSE',
  REJECT_EXPENSE = 'REJECT_EXPENSE',

  // Budget
  CREATE_BUDGET = 'CREATE_BUDGET',
  READ_BUDGET = 'READ_BUDGET',
  UPDATE_BUDGET = 'UPDATE_BUDGET',
  DELETE_BUDGET = 'DELETE_BUDGET',
  MONITOR_BUDGET = 'MONITOR_BUDGET',

  // Reports
  GENERATE_REPORTS = 'GENERATE_REPORTS',
  READ_REPORTS = 'READ_REPORTS',
  DOWNLOAD_REPORTS = 'DOWNLOAD_REPORTS',

  // Roles and Permissions
  ASSIGN_ROLES = 'ASSIGN_ROLES',
  MANAGE_PERMISSIONS = 'MANAGE_PERMISSIONS',

  // Audit
  VIEW_AUDIT_LOGS = 'VIEW_AUDIT_LOGS',
  PERFORM_AUDIT = 'PERFORM_AUDIT',

  // Subscription and Billing
  MANAGE_SUBSCRIPTION = 'MANAGE_SUBSCRIPTION',
  VIEW_BILLING_DETAILS = 'VIEW_BILLING_DETAILS',

  // Teams
  MANAGE_TEAMS = 'MANAGE_TEAMS',
  VIEW_TEAM_EXPENSES = 'VIEW_TEAM_EXPENSES',
  APPROVE_TEAM_EXPENSES = 'APPROVE_TEAM_EXPENSES',
  REJECT_TEAM_EXPENSES = 'REJECT_TEAM_EXPENSES',

  // API Access
  ACCESS_API = 'ACCESS_API',
  FETCH_API_DATA = 'FETCH_API_DATA',
  SUBMIT_API_DATA = 'SUBMIT_API_DATA',
}

export const DefaultRoles = [
  // User type
  Roles.MEMBER,

  // User
  Roles.ACCESS_PROFILE,
  Roles.VIEW_DEVICES,
  Roles.LOGIN,
  Roles.REMOVE_DEVICES,

  // Currency
  Roles.READ_CURRENCY,
  Roles.USE_CURRENCY,

  // Expense
  Roles.READ_EXPENSE,
  Roles.CREATE_EXPENSE,
  Roles.UPDATE_EXPENSE,
  Roles.DELETE_EXPENSE,

  // Budget
  Roles.READ_BUDGET,
  Roles.CREATE_BUDGET,
  Roles.UPDATE_BUDGET,
  Roles.DELETE_BUDGET,
  Roles.MONITOR_BUDGET,

  // Reports
  Roles.READ_REPORTS,
];

export const SuperUserRoles = Roles.SUPER_USER;

export const RoleDetails = {
  SUPERUSER: {
    description: 'Has unrestricted access to all features',
    active: true,
  },
  ADMIN: {
    description: 'Has access to most features',
    active: true,
  },
  BANNED: {
    description: 'Has no access to any feature',
    active: true,
  },
  SUSPENDED: {
    description: 'Has limited access to features',
    active: true,
  },
  MEMBER: {
    description: 'Has access to basic features',
    active: true,
  },
  ACCESS_PROFILE: {
    description: 'Allows access to user profile',
    active: true,
  },
  VIEW_DEVICES: {
    description: 'Allows viewing of devices',
    active: true,
  },
  REMOVE_DEVICES: {
    description: 'Allows removal of devices',
    active: true,
  },
  LOGIN: {
    description: 'Allows user to login',
    active: true,
  },
  CREATE_CURRENCY: {
    description: 'Allows creation of currency',
    active: true,
  },
  READ_CURRENCY: {
    description: 'Allows reading of currency',
    active: true,
  },
  UPDATE_CURRENCY: {
    description: 'Allows updating of currency',
    active: true,
  },
  DELETE_CURRENCY: {
    description: 'Allows deletion of currency',
    active: true,
  },
  USE_CURRENCY: {
    description: 'Allows usage of currency',
    active: true,
  },
  CREATE_EXPENSE: {
    description: 'Allows creation of expense',
    active: true,
  },
  READ_EXPENSE: {
    description: 'Allows reading of expense',
    active: true,
  },
  UPDATE_EXPENSE: {
    description: 'Allows updating of expense',
    active: true,
  },
  DELETE_EXPENSE: {
    description: 'Allows deletion of expense',
    active: true,
  },
  APPROVE_EXPENSE: {
    description: 'Allows approval of expense',
    active: true,
  },
  REJECT_EXPENSE: {
    description: 'Allows rejection of expense',
    active: true,
  },
  CREATE_BUDGET: {
    description: 'Allows creation of budget',
    active: true,
  },
  READ_BUDGET: {
    description: 'Allows reading of budget',
    active: true,
  },
  UPDATE_BUDGET: {
    description: 'Allows updating of budget',
    active: true,
  },
  DELETE_BUDGET: {
    description: 'Allows deletion of budget',
    active: true,
  },
  MONITOR_BUDGET: {
    description: 'Allows monitoring of budget',
    active: true,
  },
  GENERATE_REPORTS: {
    description: 'Allows generation of reports',
    active: true,
  },
  READ_REPORTS: {
    description: 'Allows reading of reports',
    active: true,
  },
  DOWNLOAD_REPORTS: {
    description: 'Allows downloading of reports',
    active: true,
  },
  ASSIGN_ROLES: {
    description: 'Allows assigning of roles',
    active: true,
  },
  MANAGE_PERMISSIONS: {
    description: 'Allows management of permissions',
    active: true,
  },
  VIEW_AUDIT_LOGS: {
    description: 'Allows viewing of audit logs',
    active: true,
  },
  PERFORM_AUDIT: {
    description: 'Allows performing of audits',
    active: true,
  },
  MANAGE_SUBSCRIPTION: {
    description: 'Allows management of subscription',
    active: true,
  },
  VIEW_BILLING_DETAILS: {
    description: 'Allows viewing of billing details',
    active: true,
  },
  MANAGE_TEAMS: {
    description: 'Allows management of teams',
    active: true,
  },
  VIEW_TEAM_EXPENSES: {
    description: 'Allows viewing of team expenses',
    active: true,
  },
  APPROVE_TEAM_EXPENSES: {
    description: 'Allows approval of team expenses',
    active: true,
  },
  REJECT_TEAM_EXPENSES: {
    description: 'Allows rejection of team expenses',
    active: true,
  },
  ACCESS_API: {
    description: 'Allows access to API',
    active: true,
  },
  FETCH_API_DATA: {
    description: 'Allows fetching of API data',
    active: true,
  },
  SUBMIT_API_DATA: {
    description: 'Allows submission of API data',
    active: true,
  },
};
