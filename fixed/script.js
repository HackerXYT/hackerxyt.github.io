new Vue({
  el: '#app',
  data() {
    return {
      gamepad: null,
      magnitude: 0,
      go: false
    }
  },
  created() {
    const pollGamepads = setInterval(() => {
      const gamepad = navigator.getGamepads()[0]
      console.log(gamepad)
      if(gamepad) {
        this.gamepad = gamepad
        clearInterval(pollGamepads)
      }
    }, 400)
  },
  methods: {

    toggleGo() {
      this.go = !this.go;
      if(this.go) this.vibrate();
    },

    vibrate() {
      this.gamepad.vibrationActuator.playEffect('dual-rumble', {
        duration: 100,
        strongMagnitude: this.magnitude/100,
        weakMagnitude: this.magnitude/100
      })
        .then(() => {
          if(this.go) this.vibrate();
        })
        .catch(err => console.log(err))
    }
  },
  computed: {

    button() {
      return this.go ? 'Stop' : 'Go'
    }
  }
});