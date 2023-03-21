import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('pages/Dashboard'))
const AdminPage = lazy(() => import('pages/AdminPage'))
const CreateAdmin = lazy(() => import('pages/CreateAdmin'))
const SkillPage = lazy(() => import('pages/SkillPage'))
const SkillCreate = lazy(() => import('pages/SkillCreate'))
const EditSkill = lazy(() => import('pages/EditSkill'))
const CategoryPage = lazy(() => import('pages/CategoryPage'))
const EditCategory = lazy(() => import('pages/EditCategory'))
const AdminDetail = lazy(() => import('pages/AdminDetail'))
const MentorPage = lazy(() => import('pages/MentorPage'))
const GiftCard = lazy(() => import('pages/GiftCardPage'))
const CreateGiffCodedPage = lazy(() => import('pages/CreateGiftCodePage'))
const MentorDetail = lazy(() => import('pages/MentorDetail'))
const MentorCandidates = lazy(() => import('pages/MentorCandidates'))
const MenteePage = lazy(() => import('pages/MenteePage'))
const OrderPage = lazy(() => import('pages/OrderPage'))
const TransactionPage = lazy(() => import('pages/TransactionPage'))
const CreateCategory = lazy(() => import('pages/CreateCategoryPage'))
const AccountPage = lazy(() => import('pages/AccountPage'))
const MenteeDetailPage = lazy(() => import('pages/MenteeDetailPage'))
// const UsersPage = lazy(() => import('../pages/UsersPage'));
// const ClassPage = lazy(() => import('../pages/ClassPage'));
// const UserDetail = lazy(() => import('../pages/UserDetail'));
// const ClassDetail = lazy(() => import('../pages/ClassDetail'));

const routes = [
  {
    path: 'dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: 'admins', // the url
    component: AdminPage, // view rendered
  },
  {
    path: 'admins/:id', // the url
    component: AdminDetail, // view rendered
  },
  {
    path: 'admins/create', // the url
    component: CreateAdmin,
  },
  {
    path: 'mentors', // the url
    component: MentorPage,
  },
  {
    path: 'skills',
    component: SkillPage,
  },
  {
    path: 'skills/create',
    component: SkillCreate,
  },
  {
    path: 'skills/:id',
    component: EditSkill,
  },
  {
    path: 'categories',
    component: CategoryPage,
  },
  {
    path: 'categories/:id',
    component: EditCategory,
  },
  {
    path: 'categories/create',
    component: CreateCategory,
  },
  {
    path: 'giftcodes',
    component: GiftCard,
  },
  {
    path: 'giftcodes/create',
    component: CreateGiffCodedPage,
  },
  {
    path: 'mentors',
    component: MentorPage,
  },
  {
    path: 'mentors/:id',
    component: MentorDetail,
  },
  {
    path: 'mentors/candidates',
    component: MentorCandidates,
  },
  {
    path: 'mentees',
    component: MenteePage,
  },
  {
    path: 'mentees/:id',
    component: MenteeDetailPage,
  },
  {
    path: 'orders',
    component: OrderPage,
  },
  {
    path: 'transactions',
    component: TransactionPage,
  },
  {
    path: 'account',
    component: AccountPage,
  },
  // {
  //   path: 'admins/:id', // the url
  //   component: AdminDetail, // view rendered
  // },
  // {
  //   path: 'users', // the url
  //   component: UsersPage, // view rendered
  // },
  // {
  //   path: 'users/:id',
  //   component: UserDetail,
  // },
  // {
  //   path: 'classes', // the url
  //   component: ClassPage, // view rendered
  // },
  // {
  //   path: 'classes/:id',
  //   component: ClassDetail,
  // },
]

export default routes
