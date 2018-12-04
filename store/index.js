import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 単純なテキストデータ
    // message: '初期メッセージ',
    kingaku: 0,
    tanka: 100,
    free: 0,
    pu1: 0.01,
    pu2: 0.00,
    pu3: 0.00,
    border: 90,
    uid: null,
    myset:[],
    signflag: 0
  },
  // 直接ステートを変更するメソッド。非同期処理を含めることはできない。
  // ミューテーションやアクションはイベントとイベントハンドラと似たような概念で、このメソッドを直接使用することはなくコミットなどを使用して呼び出します。
  mutations: {
    // メッセージの書き換え
    setMessage (state, payload) {
      state.message = payload
    },
    // ただ足す場合などは第二引数payloadは不要。
    setKingaku (state, payload) {
      state.kingaku = payload
    },
    setTanka (state, payload) {
      state.tanka = payload
    },
    setPu1 (state, payload) {
      state.pu1 = payload
    },
    // ただ足す場合などは第二引数payloadは不要。
    setPu2 (state, payload) {
      state.pu2 = payload
    },
    setPu3 (state, payload) {
      state.pu3 = payload
    },
    setBorder (state, payload) {
      state.border = payload
    },
    setFree (state, payload) {
      state.free = payload
    },
    setuid (state, payload) {
      state.uid = payload
    },
    setmyset (state, payload) {
      state.myset = payload
    },
    setSignflag (state, payload) {
      state.signflag = payload
    }
  }
})
