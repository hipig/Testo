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
      doneSecond: {
        type: Number,
        default: 0
      },
      isCountdown: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      isTiming() {
        return this.second === 0
      },
      timingText() {
        let time = this.doneSecond
        if (this.isCountdown) time = this.second - this.doneSecond

        let hour = this.formatTime(Math.floor(time / 3600))
        let minutes = this.formatTime(Math.floor(time % 3600 / 60))
        let seconds = this.formatTime(Math.floor(time % 60))

        return hour + ':' + minutes + ':' + seconds
      }
    },
    methods: {
      formatTime(time) {
        if (time < 10)  time = '0' + time
        return time
      }
    }
  }
</script>
