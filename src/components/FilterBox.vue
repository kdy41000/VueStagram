<template>
    <div
        :class="filter + ' filter-item'" 
        :style="`background-image:url(${uploadedImage})`"
    >
        <slot></slot>  <!-- 부모 -> 자식 부모 컴포넌트 태그 사이의 값을 전달받아 출력 -->
        <!-- <slot name="a"></slot>
        <slot name="b"></slot> 부모 -> 자식으로 전달 -->
        <!-- <slot :msg="msg"></slot> 자식 -> 부모로 전달 -->
        <button @click="fire">적용</button>
    </div>
</template>

<script>
export default {
    name: 'filter-box',
    data(){
        return {
            msg: 'hello'
        }
    },
    props: {
        uploadedImage: String,
        filter: String
    },
    methods: {
        fire:function() {
            this.emitter.emit('fire',this.filter);
        }
    }
}
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color : white;
  background-size: cover;
  background-position : center;
}
</style>