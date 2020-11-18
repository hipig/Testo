import MainLayout from "@/layout/MainLayout"
import BlankLayout from "@/layout/BlankLayout"
import MyLayout from "@/layout/MyLayout"

function view (view) {
  return () => import(/* webpackChunkName: '' */ `@/views/${view}.vue`).then(m => m.default || m)
}

const Home = view('Home')
const Subjects = view('subject/Index')
const SubjectsShow = view('subject/Show')

const QuizModeExercise = view('quiz/mode/Exercise')
const QuizModeTest = view('quiz/mode/Test')
const QuizModeExam = view('quiz/mode/Exam')
const QuizResult = view('quiz/Result')
const QuizResultDetail = view('quiz/ResultDetail')
const QuizItems = view('quiz/Items')

const Articles = view('article/Index')

const About = view('about/Index')

const AuthLogin = view('auth/Login')
const AuthRegister = view('auth/Register')

const MyIndex = view('my/info/Index')
const MyChangePassword = view('my/info/ChangePassword')
const MyLearn = view('my/learn/Index')
const MyExam = view('my/learn/Exam')
const MyNote = view('my/learn/Note')
const MyCollect = view('my/learn/Collect')

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
        redirect: '/subjects/',
        component: BlankLayout,
        children: [
          {
            path: '/',
            name: 'subjects.index',
            component: Subjects
          },
          {
            path: ':pid/:id?',
            name: 'subjects.show',
            component: SubjectsShow
          }
        ]
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
          },
          {
            path: 'items/:type',
            name: 'quiz.items',
            component: QuizItems
          }
        ]
      },
      {
        path: '/articles',
        name: 'articles',
        redirect: '/articles/',
        component: BlankLayout,
        children: [
          {
            path: '/',
            name: 'articles.index',
            component: Articles
          }
        ]
      },
      {
        path: '/about/:name?',
        name: 'about.index',
        component: About,
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
            path: 'note',
            name: 'my.note',
            component: MyNote
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
