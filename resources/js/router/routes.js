import MainLayout from '@/layout/MainLayout'
import BlankLayout from '@/layout/BlankLayout'
import MyLayout from "@/layout/MyLayout"


import Home from '@/views/Home'
import Subjects from '@/views/subjects/Index'
import SubjectsShow from '@/views/subjects/Show'

import QuizModeExercise from '@/views/quiz/mode/Exercise'
import QuizModeTest from '@/views/quiz/mode/Test'
import QuizModeExam from '@/views/quiz/mode/Exam'
import QuizResult from '@/views/quiz/Result'

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
        path: '/quiz',
        name: 'quiz',
        component: BlankLayout,
        children: [
          {
            path: 'mode/:id/exercise',
            name: 'mode.exercise',
            component: QuizModeExercise
          },
          {
            path: 'mode/:id/test',
            name: 'mode.test',
            component: QuizModeTest
          },
          {
            path: 'mode/:id/exam',
            name: 'mode.exam',
            component: QuizModeExam
          },
          {
            path: 'result/:id',
            name: 'quiz.result',
            component: QuizResult
          }
        ]
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
