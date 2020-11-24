import BlankLayout from "@/layout/BlankLayout"
import AdminLayout from "@/layout/AdminLayout"

function view (view) {
  return () => import(/* webpackChunkName: '' */ `@/admin/views/${view}.vue`).then(m => m.default || m)
}

const AdminLogin = view('auth/Login')
const AdminDashboard = view('dashboard/Index')
const AdminSubject = view('subject/Index')
const AdminSubjectForm = view('subject/Form')
const AdminBank = view('bank/Index')
const AdminBankForm = view('bank/Form')

export default [
  {
    path: '',
    name: 'admin',
    redirect: '/',
    component: AdminLayout,
    children: [
      {
        path: '/',
        name: 'admin.dashboard',
        component: AdminDashboard,
      },
      {
        path: 'subject',
        name: 'admin.subject',
        component: BlankLayout,
        children: [
          {
            path: '',
            name: 'admin.subject.index',
            component: AdminSubject,
          },
          {
            path: 'create',
            name: 'admin.subject.create',
            component: AdminSubjectForm,
          },
          {
            path: 'edit/:id',
            name: 'admin.subject.edit',
            component: AdminSubjectForm,
          }
        ]
      },
      {
        path: 'bank',
        name: 'admin.bank',
        component: BlankLayout,
        children: [
          {
            path: '',
            name: 'admin.bank.index',
            component: AdminBank,
          },
          {
            path: 'create',
            name: 'admin.bank.create',
            component: AdminBankForm,
          },
          {
            path: 'edit/:id',
            name: 'admin.bank.edit',
            component: AdminBankForm,
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'admin.login',
    component: AdminLogin
  }
]
