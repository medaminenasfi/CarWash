// Mock data for the dashboard

export const dashboardStats = {
  totalUsers: 12847,
  activeReservations: 3254,
  totalCenters: 156,
  totalRevenue: 485230,
  usersGrowth: 12.5,
  reservationsGrowth: 8.3,
  centersGrowth: 3.2,
  revenueGrowth: 15.8,
};

export const revenueData = [
  { month: 'Jan', revenue: 35000, target: 40000 },
  { month: 'Feb', revenue: 42000, target: 40000 },
  { month: 'Mar', revenue: 38500, target: 40000 },
  { month: 'Apr', revenue: 51000, target: 45000 },
  { month: 'May', revenue: 48000, target: 45000 },
  { month: 'Jun', revenue: 62000, target: 50000 },
  { month: 'Jul', revenue: 58000, target: 50000 },
  { month: 'Aug', revenue: 65000, target: 55000 },
  { month: 'Sep', revenue: 72000, target: 60000 },
  { month: 'Oct', revenue: 81000, target: 65000 },
  { month: 'Nov', revenue: 89000, target: 70000 },
  { month: 'Dec', revenue: 95000, target: 75000 },
];

export const reservationsByStatus = [
  { name: 'Completed', value: 1842, fill: 'hsl(142, 76%, 36%)' },
  { name: 'Pending', value: 856, fill: 'hsl(38, 92%, 50%)' },
  { name: 'Cancelled', value: 324, fill: 'hsl(0, 84%, 60%)' },
  { name: 'No-show', value: 232, fill: 'hsl(217, 91%, 60%)' },
];

export const topCenters = [
  { id: '1', name: 'Downtown Premium Wash', city: 'New York', reservations: 1243, rating: 4.8 },
  { id: '2', name: 'Express Auto Care', city: 'Los Angeles', reservations: 1087, rating: 4.6 },
  { id: '3', name: 'Crystal Clean Center', city: 'Chicago', reservations: 945, rating: 4.7 },
  { id: '4', name: 'Quick Shine Station', city: 'Houston', reservations: 823, rating: 4.5 },
  { id: '5', name: 'Elite Car Wash Pro', city: 'Phoenix', reservations: 756, rating: 4.9 },
];

export const users = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah.j@email.com', type: 'Customer', status: 'Active', joinDate: '2024-01-15' },
  { id: '2', name: 'Michael Chen', email: 'mchen@email.com', type: 'Customer', status: 'Active', joinDate: '2024-02-20' },
  { id: '3', name: 'Emma Williams', email: 'emma.w@email.com', type: 'Center Owner', status: 'Active', joinDate: '2023-11-10' },
  { id: '4', name: 'James Martinez', email: 'j.martinez@email.com', type: 'Customer', status: 'Inactive', joinDate: '2023-08-05' },
  { id: '5', name: 'Lisa Anderson', email: 'l.anderson@email.com', type: 'Center Owner', status: 'Active', joinDate: '2023-12-01' },
  { id: '6', name: 'David Brown', email: 'dbrown@email.com', type: 'Customer', status: 'Active', joinDate: '2024-03-12' },
  { id: '7', name: 'Jennifer Lee', email: 'j.lee@email.com', type: 'Admin', status: 'Active', joinDate: '2023-06-15' },
  { id: '8', name: 'Robert Taylor', email: 'r.taylor@email.com', type: 'Customer', status: 'Active', joinDate: '2024-01-08' },
];

export const reservations = [
  { id: 'RES-001', center: 'Downtown Premium Wash', customer: 'Sarah Johnson', date: '2024-03-28', time: '10:30 AM', service: 'Premium Wash', status: 'Completed', amount: 65 },
  { id: 'RES-002', center: 'Express Auto Care', customer: 'Michael Chen', date: '2024-03-28', time: '02:15 PM', service: 'Basic Wash', status: 'Completed', amount: 35 },
  { id: 'RES-003', center: 'Crystal Clean Center', customer: 'Emma Wilson', date: '2024-03-28', time: '04:45 PM', service: 'Detailing', status: 'Pending', amount: 120 },
  { id: 'RES-004', center: 'Quick Shine Station', customer: 'John Davis', date: '2024-03-27', time: '11:00 AM', service: 'Premium Wash', status: 'Cancelled', amount: 65 },
  { id: 'RES-005', center: 'Elite Car Wash Pro', customer: 'Lisa Anderson', date: '2024-03-27', time: '03:30 PM', service: 'Interior Clean', status: 'Completed', amount: 45 },
];

export const carWashServices = [
  { id: '1', name: 'Basic Wash', price: 35, duration: 15, category: 'Wash' },
  { id: '2', name: 'Premium Wash', price: 65, duration: 25, category: 'Wash' },
  { id: '3', name: 'Deluxe Wash', price: 95, duration: 35, category: 'Wash' },
  { id: '4', name: 'Interior Clean', price: 45, duration: 20, category: 'Interior' },
  { id: '5', name: 'Detailing', price: 120, duration: 60, category: 'Detailing' },
  { id: '6', name: 'Wax Coating', price: 85, duration: 30, category: 'Protection' },
  { id: '7', name: 'Engine Wash', price: 55, duration: 25, category: 'Maintenance' },
];

export const analyticsData = {
  peakHours: [
    { hour: '8 AM', customers: 120 },
    { hour: '9 AM', customers: 180 },
    { hour: '10 AM', customers: 240 },
    { hour: '11 AM', customers: 210 },
    { hour: '12 PM', customers: 320 },
    { hour: '1 PM', customers: 280 },
    { hour: '2 PM', customers: 350 },
    { hour: '3 PM', customers: 290 },
    { hour: '4 PM', customers: 260 },
    { hour: '5 PM', customers: 240 },
  ],
  customerSatisfaction: [
    { rating: '5 Stars', count: 4200 },
    { rating: '4 Stars', count: 3100 },
    { rating: '3 Stars', count: 1800 },
    { rating: '2 Stars', count: 580 },
    { rating: '1 Star', count: 167 },
  ],
};
