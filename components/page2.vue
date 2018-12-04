<template>
  <div class="main">
    <div class="chartbox">
<PieChart :data="this.pieChartData" :options="this.options" :plugins="this.plugins"></PieChart>
</div>
    <div class="chartbox">
<PieChart :data="this.pieChartData2" :options="this.options" :plugins="this.plugins"></PieChart>
</div>
<div class="result">
    <p>どれか１つ当選する確率＝<B>約{{this.result.total}}%</B></p>
    <p>
      <span v-if="this.totalyo.safekaisu > 0">どれか１つを{{this.border}}%の確率で入手するにはあと<B>{{this.totalyo.safekaisu}}回</B>のガチャ、=約{{this.totalyo.safekingaku}}円必要</span>
      <span v-if="this.totalyo.safekaisu <= 0">{{this.border}}%を安全とする場合、<B>{{this.totalyo.safekaisu * -1}}</B>回分の余力があります</span>
      </P>
    <p>目的Aの当選率＝<B>約{{this.c1}}%</B></p>
    <p>
      <span v-if="this.pu1yo.safekaisu > 0">目的Aを{{this.border}}%の確率で入手するにはあと<B>{{this.pu1yo.safekaisu}}回</B>のガチャ、=約{{this.pu1yo.safekingaku}}円必要</span></P>
      <span v-if="this.pu1yo.safekaisu <= 0">{{this.border}}%を安全とする場合、<B>{{this.pu1yo.safekaisu * -1}}</B>回分の余力があります</span>
    <p>目的Bの当選率＝<B>約{{this.pu2kitaiti}}{{this.c2}}%</B></p>
    <p>
      <span v-if="this.pu2yo.safekaisu > 0">目的Bを{{this.border}}%の確率で入手するにはあと<B>{{this.pu2yo.safekaisu}}回</B>のガチャ、=約{{this.pu2yo.safekingaku}}円必要</span></P>
      <span v-if="this.pu2yo.safekaisu <= 0">{{this.border}}%を安全とする場合、<B>{{this.pu2yo.safekaisu * -1}}</B>回分の余力があります</span>
    <p>目的Cの当選率＝<B>約{{this.pu3kitaiti}}{{this.c3}}%</B></p>
    <p>
      <span v-if="this.pu3yo.safekaisu > 0">目的Cを{{this.border}}%の確率で入手するにはあと<B>{{this.pu3yo.safekaisu}}回</B>のガチャ、=約{{this.pu3yo.safekingaku}}円必要</span></P>
      <span v-if="this.pu3yo.safekaisu <= 0">{{this.border}}%を安全とする場合、<B>{{this.pu3yo.safekaisu * -1}}</B>回分の余力があります</span>
    <br>
    <p v-if="this.totalyo.safekingaku > 3000">
      {{this.totalyo.safekingaku}}円あれば買えるもの</p>

    {{this.url}}{{this.a}}{{this.test.a}}
    </div>
          <div class="afi">
      <img src="../assets/MHW.jpg" width="200px" v-if="this.totalyo.safekingaku < 30000 && this.totalyo.safekingaku >3000"><br>
      <img src="../assets/ps4.jpg" width="800px" v-if="this.totalyo.safekingaku > 30000"><br>
            </div>
            <div class="result2">
                 <div v-if="this.sure == 0" class="button" @click="download"><g-button-wave color="primary" size="button--size-m">結果をCSVでダウンロード</g-button-wave></div>
    <a id="downloader" v-bind:href="this.url"><g-button-wave v-if="this.sure == 1" color="primary" size="button--size-m">ダウンロードします。よろしいですか？</g-button-wave></a>
        <div class="clipcopy" v-bind:data-clipboard-text="this.result.crip"><g-button-wave color="primary" size="button--size-m">Crip</g-button-wave></div>
    {{Bakusi}}
  </div>
  </div>
</template>

<script>
import clipboard from 'clipboard';
import PieChart from '@/components/chart.vue'
export default {
  components: {
    PieChart
  },
  data () {
    return {
      test : {
        a : null,
        b : null
      },
      kaisu: 0,
      totalyo : {
        kitaiti : 0,
        safe : 0,
        safekaisu : 0,
        safekingaku : 0
      },
            pu1yo : {
        kitaiti : 0,
        safe : 0,
        safekaisu : 0,
        safekingaku : 0
      },
            pu2yo : {
        kitaiti : 0,
        safe : 0,
        safekaisu : 0,
        safekingaku : 0
      },
            pu3yo : {
        kitaiti : 0,
        safe : 0,
        safekaisu : 0,
        safekingaku : 0
      },
      pu1nokori: 0,
      pu2nokori: 0,
      pu3nokori: 0,
      totalnokori: 0,
      border: 80,
      // 当選率合計算出
      goukei: 0,
      settotal:0,
      //clip操作
      clipBoard: null,
      sampleText: "testaaaa",
      // csv出力用
      result : {
        total : 0,
        pu1 : 0,
        pu2 : 0,
        pu3 : 0,
        crip : "",
        chart : 0,
        bakusi : 0
      },
      c1: 0,
      c2: 0,
      c3: 0,
      bakusi: 0,
      //csvダウンロード用aタグ
      a:null,
      sure:0,
      pieChartData : {
          // ラベル
          labels: ["勝利", "爆死"],
          // データ詳細
          datasets: [{
              label: '爆死円グラフ',
              // data: [1, 2, 3, 4],
              data: [1, 2],
              backgroundColor: [
                 'gold',
                 '#CC1414',
              ]
          }]
      },
      pieChartData2 : {
          // ラベル
          labels: ["本命入手", "爆死"],
          // データ詳細
          datasets: [{
              label: '爆死円グラフ',
              // data: [1, 2, 3, 4],
              data: [1, 2],
              backgroundColor: [
                 'gold',
                 '#CC1414',
              ]
          }]
      },
      options : {
          title: {
              display: true,
              text: '爆死円グラフ'
          },
      },
                plugins: [{
              afterDatasetsDraw: function (chart, easing) {
        var ctx = chart.ctx;
        chart.data.datasets.forEach(function (dataset, i) {
            var meta = chart.getDatasetMeta(i);
            if (!meta.hidden) {
                meta.data.forEach(function (element, index) {
                    ctx.fillStyle = 'rgb(0, 0, 0)';
 
                    var fontSize = 20;
                    var fontStyle = 'normal';
                    var fontFamily = 'Helvetica Neue';
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
 
                    var dataString = chart.data.labels[index]+' : '+dataset.data[index].toString() + "%";
 
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
 
                    var padding = 5;
                    var position = element.tooltipPosition();
                    ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                })
            }
        })
    }
          }]
}
},
  created: function () {
    this.border = this.$store.state.border
    this.kaisu = Math.floor(this.$store.state.kingaku / this.$store.state.tanka) + this.$store.state.free
    this.goukei = this.$store.state.pu1 + this.$store.state.pu2 + this.$store.state.pu3
    this.totalyo.kitaiti = Math.floor((1 - ((1 - this.goukei) ** this.kaisu))*100)
      // 80%入手計算
    for(var i = 1,x = 1 - this.goukei,y = 0.99; y > 1 - this.border / 100; i++) {
        y = x ** i;
   this.totalnokori = i;
}
   this.totalyo.safekaisu = Math.floor(this.totalnokori - this.kaisu)
   this.totalyo.safekingaku = Math.floor(this.totalyo.safekaisu * this.$store.state.tanka)
         // 目的A
      this.c1 = Math.floor((1 - ((1 - this.$store.state.pu1) ** this.kaisu))*100)
      // 80%入手計算
      for(var i = 1,x = 1 - this.$store.state.pu1,y = 0.99; y > 1 - this.border / 100; i++) {
        y = x ** i;
   this.pu1nokori = i;
}
      this.pu1yo.safekaisu = Math.floor(this.pu1nokori -this.kaisu)
      this.pu1yo.safekingaku = Math.floor(this.pu1yo.safekaisu * this.$store.state.tanka)
      // 目的B
      if(this.$store.state.pu2 === 0){ this.c2 = this.pu2nokori = this.pu2yo.safekaisu = this.pu2yo.safekingaku = 0}else{
      this.c2 = Math.floor((1 - ((1 - this.$store.state.pu2) ** this.kaisu))*100)
      // 80%入手計算
      for(var i = 1,x = 1 - this.$store.state.pu2,y = 0.99; y > 1 - this.border / 100; i++) {
        y = x ** i;
   this.pu2nokori = i;
}
      this.pu2yo.safekaisu = Math.floor(this.pu2nokori - this.kaisu)
      this.pu2yo.safekingaku = Math.floor(this.pu2yo.safekaisu * this.$store.state.tanka)}
                     // 目的C
      if(this.$store.state.pu3 === 0){ this.c3 = this.pu3nokori = this.pu3yo.safekaisu = this.pu3yo.safekingaku = 0}else{
      this.c3 = Math.floor((1 - ((1 - this.$store.state.pu3) ** this.kaisu))*100)
      // 80%入手計算
      for(var i = 1,x = 1 - this.$store.state.pu3,y = 0.99; y > 1 - this.border / 100; i++) {
        y = x ** i;
   this.pu3nokori = i;
}
      this.pu3yo.safekaisu = Math.floor(this.pu3nokori - this.kaisu)
      this.pu3yo.safekingaku = Math.floor(this.pu3yo.safekaisu * this.$store.state.tanka)}
      this.result.total = (1 - ((1 - this.c1 / 100) * (1 - this.c2 / 100) * (1 - this.c3 / 100))) * 100
      //チャート用
      // this.pieChartData.datasets[0].data[3] = Math.round((100 - this.result.total) * 100) / 100
      // this.pieChartData.datasets[0].data[0] = Math.round(((100 - this.pieChartData.datasets[0].data[3]) * (this.c1 / (this.c1 + this.c2 + this.c3))/100)*100 * 100)/100
      // this.pieChartData.datasets[0].data[1] = Math.round(((100 - this.pieChartData.datasets[0].data[3]) * (this.c2 / (this.c1 + this.c2 + this.c3))/100)*100 * 100)/100
      // this.pieChartData.datasets[0].data[2] = Math.round(((100 - this.pieChartData.datasets[0].data[3]) * (this.c3 / (this.c1 + this.c2 + this.c3))/100)*100 * 100)/100
      this.result.crip = "合計当選率は" + this.totalyo.kitaiti + "%です。" + this.border + "%の確率で引くにはあと" + this.totalyo.safekaisu + "回のガチャが必要です"
      this.pieChartData.datasets[0].data[0] = 100 - ((100 - this.c1) *  (100 - this.c2) / 100 * (100 - this.c3) /100)
      this.pieChartData.datasets[0].data[1] = (100 - this.c1) *  (100 - this.c2) / 100 * (100 - this.c3) /100
      this.pieChartData2.datasets[0].data[0] = this.c1
      this.pieChartData2.datasets[0].data[1] = 100-this.c1
  },
  computed: {
      },
  methods: {
    download () {
      
    this.sure = 1
          var array_data = [['どれか１つ当選する確率',this.result.total + "%"],['目的A当選率',this.c1　+ "%"],['目的B当選率',this.c2　+ "%"]];

    // BOM の用意（文字化け対策）
    var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);

    // CSV データの用意
    var csv_data = array_data.map(function(l){return l.join(',')}).join('\r\n');

    var blob = new Blob([bom, csv_data], { type: 'text/csv' });

    this.url = (window.URL || window.webkitURL).createObjectURL(blob);

    this.a = document.getElementById('downloader');
    this.a.download = 'data.csv';
    // $('#downloader')[0].click();
    }
  },
    mounted : function(){
    // -- クリップボード設定
    this.clipBoard = new clipboard('.clipcopy');
    this.clipBoard.on('success', function(e) {
      alert( 'クリップボードにコピーしました' ) ;
      console.info('Action:', e.action);
      console.info('Text:', e.text);
      console.info('Trigger:', e.trigger);
      
      e.clearSelection();
    });
    this.clipBoard.on('error', function(e) {
      alert( 'コピー失敗' ) ;
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
    });
    // -- クリップボード設定ここまで
  }
}
</script>
<style scoped>
/* .main{
  display: grid;
  height:1000px;
	grid-template-rows: repeat(25,4%);
	grid-template-columns: repeat(20,5%);
}
.result{
    grid-row:9/20;
    grid-column: 2/20;
}
.afi{
    grid-row:15/20;
    grid-column: 2/20;
} */
.chartbox{
  width:300px;
  height:auto;
  float:left;
}
.result{
  clear:both;
}
</style>
