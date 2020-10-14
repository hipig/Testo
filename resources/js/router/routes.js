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
import QuizResultDetail from '@/views/quiz/ResultDetail'

import AuthLogin from '@/views/auth/Login'
import AuthRegister from '@/views/auth/Register'

import MyIndex from "@/views/my/info/Index"
import MyChangePassword from "@/views/my/info/ChangePassword"
import MyLearn from "@/views/my/learn/Index"
import MyExam from "@/views/my/learn/Exam"
import MyCollect from "@/views/my/learn/Collect"

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
        path: '/subjects/:pid/:id?',
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
          },
          {
            path: 'result/:id/detail',
            name: 'quiz.result.detail',
            component: QuizResultDetail
          }
        ]
      },
      {
        path: '/auth',
        name: 'auth',
        component: BlankLayout,
        children: [
          {
            path: 'login',
            name: 'auth.login',
            component: AuthLogin
          },
          {
            path: 'register',
            name: 'auth.register',
            component: AuthRegister
          },
        ]
      },
      {
        path: '/my',
        name: 'my',
        redirect: '/my/',
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
          },
          {
            path: 'exam',
            name: 'my.exam',
            component: MyExam
          },
          {
            path: 'collect',
            name: 'my.collect',
            component: MyCollect
          }
        ]
      }
    ]
  }
]
