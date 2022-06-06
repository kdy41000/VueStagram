<template>
<div style="padding : 10px">
  <h4>팔로워</h4>
  <input placeholder="?" @input="putVal($event.target.value)" />
  <div class="post-header" v-for="(a,index) in follower" :key="index">
    <div class="profile" :style="`background-image:url(${a.image})`"></div>
    <span class="profile-name">{{a.name}}</span>
  </div>
</div>
</template>

<script>
import { computed, onMounted, ref, toRefs } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

export default {
    name : 'my-page',
    props : {
        one : Number
    }, 
    // Composition API
    setup(props) {  // watch, computed등 기능이 많아지면 코드가 복잡해지므로, setup기능으로 간결하게 사용 가능, created hook과 비슷한 라이프 사이클
        
        // 실시간 반영을 위해서 reference data type으로 사용
        let follower = ref([]);   // ref: 보통 숫자, 문자, 배열 타입을 대입
        let followerOriginal = ref([]);

        //let test1 = reactive({ name : 'kim' });   // reactive: 보통 Object타입을 대입
        let { one } = toRefs(props);  // toRefs : props로 전달받은 데이터를 실시간 반영하기위해 사용
        console.log(one.value);

        let result = computed(()=> { return follower.value.length })
        console.log("result:", result);

        let store = useStore();  // Composition API에서의 store기능(mapState등 사용불가)
        console.log("store:", store.state.name);

        onMounted(() => {  // setup함수 안에서는 mounted등 앞에 on을 붙여야함
            axios.get(window.location.href + 'follower.json')
            .then(res => { 
                follower.value = res.data;  // 데이터 조작 시, "변수명.value" 형태로 사용해야함
                followerOriginal.value = [...res.data];
            })
            .catch(err => {
                console.log(err);
            })

        })

        function putVal(param) {
            let newFollower = followerOriginal.value.filter((a) => {
                return a.name.indexOf(param) != -1
            });
            follower.value = [...newFollower];
        }

        return {follower, putVal}
    },
    data() {
        return {

        }
    }
}
</script>

<style>

</style>