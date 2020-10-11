import MainLayout from '@/layout/MainLayout'
import BlankLayout from '@/layout/BlankLayout'
import MyLayout from "@/layout/MyLayout"


import Home from '@/views/Home'
import Subjects from '@/views/subjects/Index'
import SubjectsShow from '@/views/subjects/Show'
import ModelsExercise from '@/views/details/models/Exercise'
import ModelsTest from '@/views/details/models/Test'
import ModelsExam from '@/views/details/models/Exam'

import AuthLogin from '@/views/auth/Login'
import AuthRegister from '@/views/auth/Register'

import MyIndex from "@/views/my/info/Index"
import MyChangePassword from "@/views/my/info/ChangePassword"
import MyLearn from "@/views/my/learn/Index"

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
      },
      {
        path: '/my',
        name: 'my',
        redirect: '/',
        component: MyLayout,
        children: [
          {
            path: '/',
            name: 'my.index',
            component: MyIndex
          },
          {
            path: 'change-password',
            name: 'my.change.password',
            component: MyChangePassword
          },
          {
            path: 'learn',
            name: 'my.learn',
            component: MyLearn
          }
        ]
      }
    ]
  }
]
