<template>
  <div>
<p>メールアドレスを入力してください</p>
    <input type="text" name="example2" v-model="email">
    <p>パスワードを入力してください</p>
        <input type="text" name="example2" v-model="password">
            <!-- <p>パスワードを再入力してください</p>
        <input type="text" name="example2" v-model="password2" v-on:change="onchange"> -->
            <div @click="kanryo"><g-button-wave color="primary" size="button--size-m">ログイン</g-button-wave></div>
{{this.$store.state.user}}<P>ユーザー{{this.user}}</p>
  </div>

</template>

<script>
import firebase from 'firebase'
export default {
  name: 'sign',
  data () {
    return {
    email:"",
    password:"",
    password2:"",
    check:0,
    user:'test'
    }
  },
methods: {
    onchange () {
      (this.password == this.password2)? this.check =  1: alert("パスワードが間違っています")
  },
  test(){
    console.log("test")
      this.$store.commit('setuid', this.user['user']['uid'])
    this.$router.push('HelloWorldB')
  },
  kanryo () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        user => {
          alert('ログインしました')
            this.user = user ? user : {}
  // this.$router.push('HelloWorldB')
  window.setTimeout( this.test, 2000 );
          // this.user = user ? user : {}
        },
        err => {
          alert(err.message)
        },
      )
  },
}
}
</script>

<style scoped>
</style>
