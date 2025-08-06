const constants = {
  // base_url: 'http://10.0.0.68:3000/api',            //self
  // base_url: "http://192.168.1.35:3000/api", //local
  // base_url: 'http://10.0.0.14:3000/api',      //Aashir
  // base_url: "http://10.0.1.20:3000/api",     //Noor
  base_url:"http://localhost:3002/api", //Hamad
  // base_url: "http://40.120.107.176/new/api",
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
  individual_leaderboard: "/individual_leaderboard_by_class_activity_id",
  group_leaderboard: "/group_leaderboard_by_class_activity_id",
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
  get_task_management_dashboard_data: "/task/management/dashboard",
  //Graph Data
  get_graph_data:"/graph/data",
    //Task Performance Graph Data
    get_task_performance_graph_data:"/task/performance/graph/data",
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
comments:'/comments',
  // Tasks
  tasks: "/tasks",
  tempCrud:"/temp",
  dueTasks:'/due/tasks',
  unassginedTasks:'/unassigned/tasks',
  completedbymeTasks:'/completedbyme/task',

  assginedbymeTasks:'/assign/by/me',//here i represent the tasks assgined by me
  assignCompleted:'/assign/completed',
  requests:'/requests',
  RequestsInventory:'/requests/inventory',
  RequestsItem:'/requests/item',
  reviewTask:'/reviewtask',

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
  get_admission_dashboard_data: "/admission/dashboard",
  get_scrutinizer_dashboard_data: "/scrutinizer/dashboard",
  get_test_scheduler_dashboard_data: "/test/scheduler/dashboard",
  get_main_admin_dashboard_data: "/main/admin/dashboard",
};

export default constants;
