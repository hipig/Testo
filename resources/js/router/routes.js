import MainLayout from '@/layout/MainLayout'
import BlankLayout from '@/layout/BlankLayout'

import Home from '@/views/Home'
import Subjects from '@/views/subjects/Index'
import SubjectsShow from '@/views/subjects/Show'
import ModelsExercise from '@/views/details/models/Exercise'
import ModelsTest from '@/views/details/models/Test'
import ModelsExam from '@/views/details/models/Exam'

import AuthLogin from '@/views/auth/Login'
import AuthRegister from '@/views/auth/Register'

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
        path: '/subjects/:sid/:ssid?',
        name: 'subjects.show',
        component: SubjectsShow
      },
      {
        path: '/exercise/:id',
        name: 'models.exercise',
        component: ModelsExercise
      },
      {
        path: '/test/:id',
        name: 'models.test',
        component: ModelsTest
      },
      {
        path: '/exam/:id',
        name: 'models.exam',
        component: ModelsExam
      },
      {
        path: '/auth/login',
        name: 'auth.login',
        component: AuthLogin
      },
      {
        path: '/auth/register',
        name: 'auth.register',
        component: AuthRegister
      }
    ]
  }
]
