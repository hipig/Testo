export default {
  data () {
    return {
      questionTypes: {
        1: {
          name: '单选题',
          desc: '每小题的备选项中，只有一个符合题意',
        },
        2: {
          name: '多选题',
          desc: '每小题的备选项中，有两个或两个以上符合题意，多选,少选，错选,不选均不得分',
        },
        3: {
          name: '判断题',
          desc: '每小题答对得分，错误不得分',
        },
        4: {
          name: '填空题',
          desc: '有两个或两个以上的空时，少填，错填,不填均不得分',
        },
        5: {
          name: '问答题',
          desc: '主观题仅提供作答，默认得分。',
        },
      }
    }
  },
  methods: {
    getQuestionTypeClasses(type) {
      let classes = {
        1: 'text-green-500 border-green-500',
        2: 'text-orange-500 border-orange-500',
        3: 'text-yellow-500 border-yellow-500',
        4: 'text-pink-500 border-pink-500',
        5: 'text-indigo-500 border-indigo-500'
      }
      return classes[parseInt(type)] || 'text-teal-500 border-teal-500'
    }
  }
}
