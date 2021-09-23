<template>
    <div class="light" :class="[color, isActive() ? 'active' : '']"></div>
</template>

<script>
export default {
  name: 'light',
  props: {
    color: {
      type: String,
      required: true
    },
    currentColor: {
      type: String,
      required: true
    },
    flicking: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      lightOn: true
    }
  },
  mounted () {
    setInterval(() => {
      if (this.flicking) {
        this.lightOn = !this.lightOn
      }
    }, 500)
  },
  methods: {
    isActive () {
      return (this.currentColor === this.color && this.lightOn)
    }
  }
}
</script>

<style>
.light {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    border: 1px solid rgb(0, 0, 0);
    margin: 10px auto;
    opacity: 0.3;
}
.active {
  opacity: 1;
}
.red {
  background-color: red;
}
.yellow {
  background-color: yellow;
}
.green {
  background-color: green;
}
</style>
