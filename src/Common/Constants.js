const constants = {
  // base_url: 'http://10.0.0.68:3000/api',            //self
  base_url: "http://localhost:3000/api", //local
  // base_url: 'http://10.0.0.14:3000/api',      //Aashir
  // base_url: "http://10.0.1.20:3000/api",     //Noor
  // base_url:"http://10.0.0.14:3000/api", //Hamad
  step1: "&step=1",
  step2: "&step=2",
  version: "?version=1.0",
  all: "/all",
  list: "/list",
  update: "/update",
  add: "/add",
  delete: "/delete",
  dropDown: "/dropdown",
  groups: "/groups",
  errors: "/errors",
  get: "/get",

  email: "/email",
  log: "/log",
  api_documentation: "/documentation",

  get_otp: "/login?version=1.0&step=1",
  verify_otp: "/login?version=1.0&step=2",
  users_role_info: "/users_role_info",
  //login
  login: "/login",
  info: "/info",
  crud: "/crud",

  // Users
  users: "/users",
  groups: "/groups",

  // Admin Dashboard
  get_admin_dashboard_data: "/admin/dashboard",

  // User Devices
  user_devices: "devices",

  // Attachments
  attachments: "/attachments",

  // Chatting Group Members
  chatting_group_members: "/chatting_group_members",

  // Chatting Groups
  chatting_groups: "/chatting_groups",

  // Departments
  departments: "/departments",

  // Designations
  designations: "/designations",

  // Messages
  messages: "/messages",

  // Notifications
  notifications: "/notifications",

  // Permission Groups
  permission_groups: "/permission_groups",

  // Permission Groups Permissions
  permission_groups_permissions: "/permission_groups_permissions",

  // Permissions
  permissions: "/permissions",

  // Platform Versions
  platform_versions: "/platform_versions",

  // Platforms
  platforms: "/platforms",

  // Roles
  roles: "/roles",

  // Roles Designations Department
  roles_designations_department: "/roles_designations_department",

  // Task Flow Steps
  task_flow_steps: "/task_flow_steps",

  // Task Flows
  task_flows: "/task_flows",

  // Task History
  task_history: "/task_history",

  // Tasks
  tasks: "/tasks",

  // Templates
  templates: "/templates",

  // User Device Notifications
  user_device_notifications: "/user_device_notifications",

  // User Devices
  luser_devices: "/user_devices",

  // User Role Designation Permissions
  user_role_designation_permissions: "/user_role_designation_permissions",

  // User Roles Designations Department
  user_roles_designations_department: "/user_roles_designations_department",
};

export default constants;
