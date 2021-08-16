import Vue from 'vue'
import VueRouter from 'vue-router'

const LatestCreation = () => import('../views/LatestCreation.vue')
const MyCreation = () => import('../views/MyCreation.vue')
const CreationRecord = () => import('../views/CreationRecord.vue')
const Question = () => import('../views/Question.vue')
const Answer = () => import('../views/Answer.vue')
const Message = () => import('../views/Message.vue')
const Search = () => import('../views/Search.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/new'
  },
  {
    path: '/new',
    component: LatestCreation
  },
  {
    path: '/mycreation',
    component: MyCreation
  },
  {
    path: '/record',
    component: CreationRecord
  },
  {
    path: '/question',
    component: Question
  },
  {
    path: '/answer',
    component: Answer
  },
  {
    path: '/message',
    component: Message
  },
  {
    path: '/search',
    component: Search
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router