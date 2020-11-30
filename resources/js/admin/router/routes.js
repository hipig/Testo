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
const AdminBankItemForm = view('bank/ItemForm')
const AdminQuestion = view('question/Index')
const AdminQuestionForm = view('question/Form')

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
          },
          {
            path: 'edit/:id/item',
            name: 'admin.bank.item.edit',
            component: AdminBankItemForm,
          }
        ]
      },
      {
        path: 'question',
        component: BlankLayout,
        children: [
          {
            path: '',
            name: 'admin.question.index',
            component: AdminQuestion,
          },
          {
            path: 'create',
            name: 'admin.question.create',
            component: AdminQuestionForm,
          },
          {
            path: 'edit/:id',
            name: 'admin.question.edit',
            component: AdminQuestionForm,
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
