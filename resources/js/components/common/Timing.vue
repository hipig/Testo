<template>
  <div class="inline-flex">
    {{ timingText }}
  </div>
</template>

<script>
  export default {
    name: "Timing",
    props: {
      second: {
        type: Number,
        default: 0
      },
      usedTime: {
        type: Number,
        default: 0
      },
      isPause: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        timer: null,
        timeLeft: this.usedTime
      }
    },
    created() {
      this.timer = setInterval(this.intervalEvent, 1000)
    },
    destroyed () {
      clearInterval(this.timer)
    },
    computed: {
      isTiming() {
        return this.second === 0
      },
      timingText() {
        let time = this.timeLeft
        if (!this.isTiming) time = this.second - this.timeLeft

        let hour = this.formatTime(Math.floor(time / 3600))
        let minutes = this.formatTime(Math.floor(time % 3600 / 60))
        let seconds = this.formatTime(Math.floor(time % 60))

        return hour + ':' + minutes + ':' + seconds
      }
    },
    methods: {
      intervalEvent() {
        if (!this.isPause) this.timeLeft++
        this.$emit('timer', this.timeLeft)
        if (!this.isTiming && this.timeLeft >= this.second) {
          clearInterval(this.timer)
          this.$emit('countdownEnd')
        }
      },
      formatTime(time) {
        if (time < 10)  time = '0' + time
        return time
      }
    }
  }
</script>
