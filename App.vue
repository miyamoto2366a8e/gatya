<template>
  <div id="app">
    <header>
    <!-- <img src="./assets/logo.png" width="50px"> -->
    <img src="./assets/logo3.png" height="70px">
    <div>
    <!-- <div class="button" @click="signcheck"><g-button-wave color="primary" size="button--size-m">サインチェック</g-button-wave></div> -->
    <div class="button" @click="signOut"><g-button-wave color="primary" size="button--size-m">サインアウト</g-button-wave></div>
    <div class="button" @click="signIn"><g-button-wave color="primary" size="button--size-m">googleサインイン</g-button-wave></div>
        <div class="button" @click="touroku"><g-button-wave color="primary" size="button--size-m">新規登録</g-button-wave></div>
                <div class="button" @click="mailsignin"><g-button-wave color="primary" size="button--size-m">登録IDでサインイン</g-button-wave></div>
    <!-- <h2 class="clear" v-if="this.helloflag == 1" key="input-email">ログイン中</h2>
    <h2 class="clear" v-else-if="this.helloflag == 2" key="input-email">ログアウトしました</h2>
    <h2 class="clear" v-else>errar</h2> -->
    <h2>{{this.hello}}</h2><p><h2>{{this.helloflag}}</h2></p>
    </div>
    <ul class="clear">
      <!-- firefoxではボタンの中でルーターを動作させることができない。どうしよう -->
      <li><button><router-link to="/">入力フォーム</router-link></button></li>
      <li><button><router-link to="/page2">結果A(当選確率)</router-link></button></li>
      <li><button><router-link to="/page1">電卓</router-link></button></li>
      <li><button><router-link to="/page3">AIに愚痴る</router-link></button></li>
    </ul>
    <div class="clear"></div>
    </header>
    <router-view/>
  </div>
</template>

<script>
// import {db} from './plugins/firebase';
import firebase from 'firebase'

export default {
    data () {
    return {
      user:'hello',
      hello:"ようこそ",
      helloflag:0,
      email:"hogehoge@gmail.commmm",
      password:"123456"
    }
  },
  methods: {
  signIn () {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider),
firebase.auth().onAuthStateChanged(user => {
  // ログイン状態ならuserが取得できる
  this.user = user ? user : {},
  this.$store.commit('setuid', this.user['uid']),
  this.$router.push('HelloWorldB'),
  this.hello = "ようこそ" + this.user['email'] + "さん",
  this.helloflag = 1
  // this.$store.commit('setmyset', db.collection('test').doc(this.user.uid))
})
},
signOut () {
  this.$router.push('/')
  this.user = null,
  this.hello = null,
  this.hello = "サインアウトしました",
  this.$store.commit('setuid', null),
  vm.$forceUpdate();
  this.helloflag = 2,
  console.log(this.hello)
  firebase.auth().signOut()
},
touroku () {
  this.$router.push('touroku')
// firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
//         .then(user => {
//           alert('Create account: ', user.email)
//         })
//         .catch(error => {
//           alert(error.message)
//         })
},
    mailsignin: function () {
        this.$router.push('sign')

    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=M+PLUS+1p');

html,body,div,span,applet,object,iframe,
h1,h2,h3,h4,h5,h6,p,blockquote,pre,
a,abbr,acronym,address,big,cite,code,
del,dfn,em,img,ins,kbd,q,s,samp,
small,strike,strong,sub,sup,tt,var,
b,u,i,center,
dl,dt,dd,ol,ul,li,
fieldset,form,label,legend,
table,caption,tbody,tfoot,thead,tr,th,td,
article,aside,canvas,details,embed,
figure,figcaption,footer,header,main,
menu,nav,output,ruby,section,summary,
time,mark,audio,video,button{
margin: 0;
padding: 0;
border: 0;
}
#app{
  width: 100%;
  padding: 8px;
}
img{
    float:left;
}
h1{
  font-family: 'M PLUS 1p', sans-serif;
  color:white;
  width:40%;
  float:left;
}
h2{
color:white;
  text-align: right;
  font-size:16px;
  margin-top:8px;
}
ul,ol{
  list-style-type:none;
}
ul{
  width:100%;
  padding-left:0px;
}
li{
  width:25%;
  float:left;
  border:1px solid black;
  display:block;
}
header{
    background-color:#31425F;
    padding:1px;
}
button{
  width:100%;
}
.button{
  float:right;
  margin:3px;
}
.clear{
  clear:both;
}
</style>
