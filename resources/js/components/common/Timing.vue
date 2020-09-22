<template>
  <div class="inline-flex">
    {{ timingText }}
  </div>
</template>

<script>
  export default {
    name: "Timing",
    props: {
      minute: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        timer: null,
        hour: 0,
        minutes: 0,
        seconds: 0
      }
    },
    created() {
      this.initTime()
      this.initTimer()
    },
    destroyed () {
      clearInterval(this.timer)
    },
    computed: {
      isTiming() {
        return this.minute === 0
      },
      timingText() {
        let hour = this.formatTime(this.hour)
        let minutes = this.formatTime(this.minutes)
        let seconds = this.formatTime(this.seconds)

        return hour + ':' + minutes + ':' + seconds
      }
    },
    methods: {
      initTime() {
        if (this.isTiming) return false

        this.hour = Math.floor(this.minute / 60)
        this.minutes = Math.floor(this.minute % 60)
      },
      initTimer() {
        console.log(this.isTiming)
        if (this.isTiming) {
          this.timer = setInterval(this.startTime, 1000)
        } else {
          clearInterval(this.timer)
          this.timer = setInterval(this.countdownTime, 1000)
        }
      },
      startTime() {
        this.seconds++
        if (this.seconds >= 60) {
          this.seconds = 0
          this.minutes++
        }

        if (this.minutes >= 60) {
          this.minutes = 0
          this.hour++
        }
      },
      countdownTime() {
        this.seconds--
        if (this.seconds <= 0) {
          this.seconds = 59
          this.minutes--
        }

        if (this.minutes <= 0) {
          if (this.hour > 0) {
            this.minutes = 59
            this.hour--
          } else {
            this.minute = 0
          }
        }

        if (this.hour <= 0) {
          this.hour = 0
        }
      },
      formatTime(time) {
        if (time < 10)  time = '0' + time
        return time
      }
    }
  }
</script>
