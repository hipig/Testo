import MainLayout from '@/layout/MainLayout'
import BlankLayout from '@/layout/BlankLayout'

import Home from '@/views/Home'
import Subjects from '@/views/subjects/Index'
import SubjectsShow from '@/views/subjects/Show'

export default [
  {
    path: '',
    name: 'main',
    component: MainLayout,
    redirect: '/',
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/subjects',
        name: 'subjects',
        component: Subjects
      },
      {
        path: '/subjects/:sid/:id?',
        name: 'subjects.show',
        component: SubjectsShow
      },
    ]
  }
]
