<template>
  <div>
<p>AIに愚痴って下さい
    <input type="text" name="example2" v-model="talk" v-on:change="ai"></p>
    <img v-if="this.panda == 0" src="../assets/panda3.jpg" width="500px">
    <img v-if="this.panda == 1" src="../assets/panda2.jpg" width="500px">
    <img v-if="this.panda == 2" src="../assets/panda.jpg" width="500px">    
    <p class="input-balloon">{{this.result}}</p>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'test',
  data () {
    return {
    talk:"",
		result:null,
		hasError: false,
    loading:true,
    panda:1
    }
  },
methods: {
  ai () {
(this.panda == 2)? this.panda = 0 : this.panda = this.panda + 1
let params = new FormData();
// 使うときはapikeyを入れてください
    params.append("apikey","");
    params.append("query",this.talk);
    axios.post('https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk',params)
    .then(response =>{
        const reply = response.data.results[0].reply;
            this.result =reply;
    }).catch(error => {
      console.log(error);
    });
  },
}
}
</script>

<style scoped>
p{
  font-size: 24px;
}
.input-balloon{
 	position: relative;
	display: inline-block;
 	margin: 1.5em 0;
	padding: 7px 10px;
	min-width: 120px;
 	max-width: 100%;
 	color: #555;
	font-size: 30px;
	background: #e0edff;
	border-radius: 15px;
}
</style>
