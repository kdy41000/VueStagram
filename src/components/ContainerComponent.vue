<template>
  <div>
      <div v-if="step == 0">
        <PostComponent 
          v-for="v in lists" 
          :key="v" 
          :data="v"
        />
      </div>

      <div v-else-if="step == 1">
        <!-- 필터선택페이지 -->
        <div :class="selectedFilter + ' filter-item'" class="upload-image" :style="`background-image:url(${uploadedImage})`"></div>
        <div class="filters">
          <FilterBox 
            v-for="v in filterArr" 
            :key="v" 
            :uploadedImage="uploadedImage"
            :filter="v"
          >
          {{v}}  <!-- 태그와 태그사이에 값 대입으로 부모 -> 자식 컴포넌트 slot부분에 값 전달 -->
          <!-- <template slot:a>데이터1</template> 부모(name정의) -> 자식 slot name바인딩으로 여러개 전달방법 -->
          <!-- <template v-slot:default="param">{{param.msg}}</template> 자식 -> 부모 slot으로 값 전달 받은 후 출력방법 -->
          </FilterBox>
        </div>
      </div>

      <div v-else-if="step == 2">
        <!-- 글작성페이지 -->
        <div :class="selectedFilter + ' filter-item'" class="upload-image" :style="`background-image:url(${uploadedImage})`"></div>
        <div class="write">
          <textarea @input="$emit('write',$event.target.value)" class="write-box">write!</textarea>
        </div>
      </div>

      <div v-else-if="step == 3">
        <MyPage :one="1" />
      </div>
  </div>
</template>

<script>
import PostComponent from './PostComponent.vue';
import FilterBox from './FilterBox.vue';
import MyPage from './MyPage.vue';

export default {
    name: 'container-component',
    data(){
      return {
        filterArr: [ "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson", 
                     "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua", 
                     "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"]
      }
    },
    components: {
      PostComponent,
      FilterBox,
      MyPage
    },
    props: {
      lists: Array,
      step: Number,
      uploadedImage: String,
      selectedFilter: String
    }
}
</script>

<style>

</style>