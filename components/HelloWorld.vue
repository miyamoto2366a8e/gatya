<template>
  <div class="main">
    <!-- <div class="button" @click="myset1"><g-button-wave color="primary" size="button--size-m">設定を読み込む</g-button-wave></div>
    <div class="button" @click="addmyset"><g-button-wave color="primary" size="button--size-m">登録</g-button-wave></div> -->
    <!-- <div class="button" @click="signcheck"><g-button-wave color="primary" size="button--size-m">サインチェック</g-button-wave></div> -->
    <p class="clear">予算を入力してください</p>
    <input type="number" pattern="^[0-9]+" name="example1" v-model.number="kingaku" v-on:change="onchange" class="input">
    現在値：{{this.$store.state.kingaku}}円
    <p>ガチャ一回の値段を入力して下さい</p>
    <input type="number" name="example2" v-model.number="tanka" v-on:change="onchangeTanka">
    現在値：{{this.$store.state.tanka}}円
    <p>無料で回せる回数を入力して下さい</p>
        <input type="number" name="example2" v-model.number="free" v-on:change="onchangeFree">
    現在値：{{this.$store.state.free}}回
    <p>目的Aの当選確率を入力して下さい(「%」記号の入力は不要です)</p>
    <input type="number" name="example2" v-model.number="pu1" v-on:change="onchangePu1">
    現在値：{{Math.round(this.$store.state.pu1 * 10000)/100}}％
        <p>目的Bの当選確率を入力して下さい</p>
    <input type="number" name="example2" v-model.number="pu2" v-on:change="onchangePu2">
    現在値：{{Math.round(this.$store.state.pu2 * 10000)/100}}％
    <p>目的Cの当選確率を入力して下さい。</p>
    <input type="number" name="example2" v-model.number="pu3" v-on:change="onchangePu3">
    現在値：{{Math.round(this.$store.state.pu3 * 10000)/100}}％
    <p>安全とする確率を入力して下さい。（任意入力）</p><p>※入力後Enterキーを押すと自動で結果ページにジャンプします</p>
    <input type="number" name="example2" v-model.number="border" v-on:change="onchangeBorder" @keyup.enter="keyjump">現在値：{{this.$store.state.border}}%
    <div @click="keyjump"><g-button-wave color="primary" size="button--size-m">入力完了</g-button-wave></div>
    <input type="text" name="example2" v-model.number="test" v-on:change="onchangetest">
    {{this.test}}
        <div @click="onchangetest"><g-button-wave color="primary" size="button--size-m">全角変換テスト</g-button-wave></div>
  </div>
</template>

<script>
import {db} from '../plugins/firebase';
import firebase from 'firebase'
// import Router from 'vue-router'
export default {
  name: 'HelloWorld',
  data () {
    return {
      kingaku: null,
      tanka: null,
      pu1: null,
      pu2: null,
      pu3: null,
      free: null,
      myset: [],
      border: null,
      user:'hello',
      test: 0
    }
  },
      firestore() {
      return {
        myset: db.collection('test').doc(this.$store.state.uid)
      }
    },
      created() {
    // サインイン後のページを直接表示された場合、サインアウト状態の入力フォームへと飛ばす
      // (this.$store.state.uid == null)? this.$router.push('/') : console.log("サインイン中です")
  },
  methods: {
        onchangetest () {
 this.test = this.test.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => {
  return String.fromCharCode(s.charCodeAt(0) - 65248);
 });
},
    onchange () {
      // (this.kingaku.match(/[Ａ-Ｚａ-ｚ０-９]/))? console.log("全角") : console.log("半角")
       (this.kingaku < 0)? alert('値が不正です。0以上の値を半角で入力してください。') : this.$store.commit('setKingaku', this.kingaku)
    },
    onchangeTanka () {
      (this.tanka <= 0)? alert('値が不正です。0を超える値を半角で入力してください。') : this.$store.commit('setTanka', this.tanka)
    },
    onchangePu1 () {
      (this.pu1 <= 0 || this.pu1 >= 100)? alert('値が不正です。100未満かつ0を超える値を半角で入力してください。') : this.$store.commit('setPu1', this.pu1 / 100)
    },
    onchangePu2 () {
      (this.pu2 < 0 || this.pu2 >= 100)? alert('値が不正です。100未満かつ0以上の値を半角で入力してください。') : this.$store.commit('setPu2', this.pu2 / 100)
    },
    onchangePu3 () {
      (this.pu3 < 0 || this.pu3 >= 100)? alert('値が不正です。100未満かつ0以上値を半角で入力してください。') : this.$store.commit('setPu3', this.pu3 / 100)
    },
        onchangeFree () {
      (this.free < 0)? alert('値が不正です。0以上の値を半角で入力してください。') : this.$store.commit('setFree', this.free)
    },
    onchangeBorder () {
      (this.border <= 0 || this.border >= 100)? alert('値が不正です。100未満で0を超える値を半角で入力してください。') : this.$store.commit('setBorder', this.border)
    },
    myset1 () {
      // const myset = db.collection('test').doc(this.$store.state.uid)
      // this.myset = db.collection('test').doc(this.$store.state.uid)
      // this.kingaku = this.myset['kingaku'],
      // this.$store.commit('setmyset', this.myset),
      // this.kingaku = this.myset['kingaku'],
      console.log(this.myset)
    },
    addmyset() {
        const myset = new Date()
        // コメントをFirestoreへ登録
        db.collection('test').doc(this.$store.state.uid).set({
          kingaku: this.$store.state.kingaku,
          tanka: this.$store.state.tanka,
          pu1: this.$store.state.pu1,
          pu2: this.$store.state.pu2,
          pu3: this.$store.state.pu3,
          free: this.$store.state.free,
        })
      },
signcheck(){
firebase.auth().onAuthStateChanged(user => {
  // ログイン状態ならuserが取得できる
  this.user = user ? user : {}
})
},
  keyjump () {
    this.$router.push('page2')
  }
  }
  }
</script>

<style scoped>
  .button{
    float:left;
    margin:3px;
  }
  .clear{
    clear:both;
  }
  .input{
    ime-mode: inactive;
  }
</style>
