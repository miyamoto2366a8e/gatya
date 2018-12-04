<template>
  <div>
<p>メールアドレスを入力してください</p>
    <input type="text" name="example2" v-model="email">
    <p>パスワードを入力してください</p>
        <input type="text" name="example2" v-model="password">
            <p>パスワードを再入力してください</p>
        <input type="text" name="example2" v-model="password2" v-on:change="onchange">
            <div v-if="this.check == 1" @click="kanryo"><g-button-wave color="primary" size="button--size-m">この内容で登録する</g-button-wave></div>
  </div>

</template>

<script>
import firebase from 'firebase'
export default {
  name: 'touroku',
  data () {
    return {
    email:"",
    password:"",
    password2:"",
    check:0
    }
  },
methods: {
    onchange () {
      (this.password == this.password2)? this.check =  1: alert("パスワードが間違っています")
  },
  kanryo () {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          alert('Create account: ', user.email)
        })
        .catch(error => {
          alert(error.message)
        })
  },
}
}
</script>

<style scoped>
</style>
