/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Tổng quan', // name that appear in Sidebar
  },
  {
    path: '/admins',
    icon: 'AdminIcon',
    name: 'Admins',
  },
  {
    path: '/mentors',
    icon: 'MentorIcon',
    name: 'Mentors',
  },
  {
    path: '/mentees',
    icon: 'PeopleIcon',
    name: 'Mentees',
  },
  {
    path: '/skills',
    icon: 'SkillIcon',
    name: 'Kỹ năng',
  },
  {
    path: '/categories',
    icon: 'CategoryIcon',
    name: 'Lĩnh vực',
  },
  {
    path: '/giftcodes',
    icon: 'GiftIcon',
    name: 'Mã quà tặng',
  },
  {
    path: '/orders',
    icon: 'MoneyIcon',
    name: 'Yêu cầu giao dịch',
  },
  {
    path: '/transactions',
    icon: 'MoneyIcon',
    name: 'Giao dịch',
  },
  {
    path: '/account',
    icon: 'AdminIcon',
    name: 'Tài khoản',
  },
]

export default routes
