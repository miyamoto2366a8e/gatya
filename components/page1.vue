<template>
<div>
    <div id="calculator">
  <div id="result">
    <span>{{ valueDisplayed }}</span>
  </div>
  <div id="pad">
    <div class="btn" id="clear" @click="clear">C</div>
    <div class="btn" @click="handleOp('/')">/</div>
    <div class="btn" @click="handleDigit(7)">7</div>
    <div class="btn" @click="handleDigit(8)">8</div>
    <div class="btn" @click="handleDigit(9)">9</div>
    <div class="btn" @click="handleOp('x')">x</div>
    <div class="btn" @click="handleDigit(4)">4</div>
    <div class="btn" @click="handleDigit(5)">5</div>
    <div class="btn" @click="handleDigit(6)">6</div>
    <div class="btn" @click="handleOp('-')">-</div>
    <div class="btn" @click="handleDigit(1)">1</div>
    <div class="btn" @click="handleDigit(2)">2</div>
    <div class="btn" @click="handleDigit(3)">3</div>
    <div class="btn" @click="handleOp('+')">+</div>
    <div id="zero" class="btn" @click="handleDigit(0)">0</div>
    <div id="equal" class="btn" @click="handleOp('=')">=</div>
  </div>
</div>
<div class="set">
<div class="button" @click="kingaku"><g-button-wave color="primary" size="button--size-m">値を軍資金に設定</g-button-wave></div>
<div class="button" @click="tanka"><g-button-wave color="primary" size="button--size-m">値を単価に設定</g-button-wave></div><br>
<div class="button" @click="free"><g-button-wave color="primary" size="button--size-m">値を無料で回せる回数に設定</g-button-wave></div><br>
<div class="button" @click="pu1"><g-button-wave color="primary" size="button--size-m">値を本命の当選率に設定</g-button-wave></div><br>
<div class="button" @click="pu2"><g-button-wave color="primary" size="button--size-m">値を次点の当選率に設定</g-button-wave></div><br>
<div class="button" @click="pu3"><g-button-wave color="primary" size="button--size-m">値を妥協の当選率に設定</g-button-wave></div><br>
  </div>
  </div>
</template>

<script>
export default {
data () {
    return {
      currentValue: 0,
      savedValue: false,
      currentOp: false
    }
  },
  methods: {
    clear () {
      this.currentValue = 0
      this.savedValue = false
      this.currentOp = false
    },
    handleDigit (digit) {
      if (this.currentOp === '=') {
        this.savedValue = false
      }
      this.currentValue = this.currentValue * 10 + digit
    },
    handleOp (op){
      if (this.currentOp) {
         this.process()
      }
      else {
        this.savedValue = this.currentValue
      }
      this.currentValue = 0
      this.currentOp = op      
    },
    process() {
      if (this.currentOp === '+') {
        this.savedValue += this.currentValue
      }
      else if (this.currentOp === '-') {
        this.savedValue -= this.currentValue
      }
      else if (this.currentOp === 'x') {
        this.savedValue *= this.currentValue
      }
      else if (this.currentOp === '/') {
        this.savedValue /= this.currentValue
      }
      else if (this.currentOp === '=' && this.currentValue) {
        this.savedValue = this.currentValue
      }
      this.currentValue = 0
      this.currentOp = false
    },
    kingaku () {
      this.$store.commit('setKingaku', this.savedValue),
      console.log("test"),
      console.log(this.$store.state.kingaku)
    },
        tanka(){
      this.$store.commit('setTanka', this.savedValue)
    },
        free(){
      this.$store.commit('setFree', this.savedValue)
    },
        pu1(){
      this.$store.commit('setPu1', this.savedValue)
    },
        pu2(){
      this.$store.commit('setPu2', this.savedValue)
    },
        pu3(){
      this.$store.commit('setPu3', this.savedValue)
    }
  },
  computed: {
     valueDisplayed () {
      return this.savedValue ? 
        this.currentValue ? 
        this.currentValue : this.savedValue
        : this.currentValue
    }
  }
}
</script>

// scopedをつけることでCSSをこのコンポーネントのみに適用することができる
<style scoped>
html{
  background: #CCC;
  font-family: sans-serif;}
body{
  display: grid;
  justify-items: center;
  align-items: center;
  height: 100vh;}
#calculator{
  margin:auto;
  margin-top:30px;
  border: 2px solid #222;
  border-radius: 4px;
  max-width: 350px;}
#result{
  font-size: 42px;
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  display: grid;
  padding: 10px;
  justify-items: end;
  align-items: center;
  border-bottom: 2px solid #222;}
#pad{
  display: grid;
  grid-template-columns: repeat(4, minmax(60px, 1fr));
  grid-gap: 10px;
  padding: 15px;}
.btn{
  cursor: pointer;
  font-size: 20px;
  display: grid;
  padding: 15px 10px;
  justify-items: center;
  align-items: center;
  color: #FAFAFA;
  border: 1px solid #222;
  border-radius: 4px;
  background: #777;}
#clear{
  background: steelblue;
  grid-column: 1/4;}
#zero{
  grid-column: 1/4;}
#equal{
  background: seagreen;}
.set {
  float:left;
}
</style>
