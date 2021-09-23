<template>
  <div>
    <div class="timer">
        <p>{{ remainingTime }}</p>
    </div>
    <div class="traffic-light">
        <light
          color="red"
          :currentColor="setColor"
          :flicking="flicking"/>
        <light
          color="yellow"
          :currentColor="setColor"
          :flicking="flicking"/>
        <light
          color="green"
          :currentColor="setColor"
          :flicking="flicking"/>
    </div>
</div>
</template>

<script>
import light from './Light.vue'
export default {
  components: { light },
  data () {
    return {
      colors: {
        'red': {
          defaultTime: 10,
          nextColor: 'yellow'
        },
        'yellow': {
          defaultTime: 3,
          nextColor: 'green'
        },
        'green': {
          defaultTime: 15,
          nextColor: 'yellow'
        }
      },
      remainingTime: 0,
      flicking: false
    }
  },
  computed: {
    currentColor () {
      return this.$route.params.color
    },
    setColor () {
      if (this.currentColor !== localStorage.getItem('color')) {
        localStorage.setItem('remainingTime', this.defaultTime)
      }
      localStorage.setItem('color', this.$route.params.color)
      return this.$route.params.color
    },
    defaultTime () {
      return this.colors[this.currentColor].defaultTime
    },
    nextColor () {
      return this.colors[this.currentColor].nextColor
    }
  },
  watch: {
    remainingTime (value) {
      localStorage.setItem('remainingTime', value)
      if (value < 1) {
        this.$router.push(`/${this.nextColor}`)
        if (['red', 'green'].includes(this.currentColor)) {
          this.colors.yellow.nextColor = (this.colors.yellow.nextColor === 'red') ? 'green' : 'red'
        }
        this.remainingTime = this.defaultTime
        this.flicking = false
      } else if (value < 4) {
        this.flicking = true
      }
    }
  },
  mounted () {
    this.remainingTime = localStorage.getItem('remainingTime') || this.defaultTime
    setInterval(() => { this.remainingTime-- }, 1000)
  }
}
</script>

<style>
.traffic-light {
    border-radius: 0 0 20px 20px;
    border: 1px solid black;
    width: 120px;
    margin: auto;
    background-color: rgb(29, 29, 29);
}
.timer {
    border-radius: 20px 20px 0 0;
    border: 1px solid black;
    width: 120px;
    margin: 100px auto 0;
    color: rgb(224, 224, 224);
    font-weight: bold;
    background-color: rgb(29, 29, 29);
}
</style>
