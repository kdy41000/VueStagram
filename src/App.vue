<template>
  <div class="header">
    <ul class="header-button-left">
      <li v-if="step != 0" @click="step = 0">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 0" @click="step = 3">팔로워</li>
      <li v-if="step == 1" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish">발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <!-- store(vuex) -->
  <h4>이름: {{ name }}</h4>
  <button @click="reviseName()">버튼</button>

  <h4>나이: {{ age }}</h4>
  <button @click="ascAge(10)">버튼</button>
  <!-- // -->

  <p>{{now}}</p>
  <hr/>

  <ContainerComponent 
    :lists="data" 
    :step="step"
    :uploadedImage="uploadedImage" 
    :selectedFilter="selectedFilter"
    @write="writeText = $event"
  />

  <button 
    v-if="moreCnt < 2 && step == 0"
    @click="moreBtnHandler">
    더보기
  </button>

  <div class="footer" v-if="step == 0">
    <ul class="footer-button-plus">
      <input @change="uploadImage" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>

</template>

<script>
import { mapMutations, mapState } from 'vuex';
import ContainerComponent from './components/ContainerComponent.vue';

export default {
  name: 'App',
  data() {
    return {
      data: this.$store.state.data,
      moreCnt: 0,
      step: 0,
      uploadedImage: "",
      writeText: "",
      selectedFilter: ""
    }
  },
  components: {
    ContainerComponent
  },
  computed : {
    now() {
      return new Date()
    },
    /*name() {
      return this.$store.state.name;
    },
    age() {
      return this.$store.state.age;
    }*/
    ...mapState(['name','age'])  // 위의 주석부분 처럼 name, age 따로 computed함수로 선언하기 번거로우므로 한번에 state가져오는 기능
  },
  methods: {
    /*reviseName:function() {
      this.$store.commit('reviseName');
    },
    ascAge:function(param) {
      this.$store.commit('ascAge',param);
    }*/
    ...mapMutations(['reviseName','ascAge']),  // 위의 주석부분 처럼 따로 mutations함수를 한번에 가져와서 등록하는 기능
    moreBtnHandler:async function() {
      if(this.moreCnt < 2) {
        this.$store.dispatch('getData', this.moreCnt);  // store(actions -> mutations)
        this.moreCnt++;
      }
    },
    uploadImage:function(e) {
      let file = e.target.files;

      if(file[0].type !== 'image/jpeg') {
        alert("jpg 파일만 선택해주세요.");
        return;
      }
      let url = URL.createObjectURL(file[0]);
      console.log("url:",url);
      this.uploadedImage = url;
      this.step++;
    },
    publish:function() {
      let myVal = {
        no : this.data[0].no + 1,
        name: "Kim Hyun",
        userImage: "https://placeimg.com/100/100/arch",  // 입력받은 값 
        postImage: this.uploadedImage,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.writeText,  // 입력받은 값 
        filter: this.selectedFilter
      };

      this.data.unshift(myVal);
      this.step = 0;
      this.filter = "";
    }
  },
  mounted() {
    this.emitter.on('fire', (a) => {
      this.selectedFilter = a;
    })
  }
}
</script>

<style>
@import 'style.css';
</style>
