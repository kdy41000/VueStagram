<template>
  <div class="post">
    <div class="post-header">
      <div class="profile" :style="{'background-image':'url('+ data.userImage +')'}"></div>
      <span class="profile-name">{{data.name}}</span>
    </div>
    <div :class="data.filter" class="post-body" :style="{'background-image':'url('+ data.postImage +')'}" @click="likeFunc(data.no)"></div>
    <div class="post-content">
      <p :class="{'liked_font': data.liked}">{{data.likes}} Likes</p>
      <p><strong>{{data.name}}</strong> {{data.content}}</p>
      <p class="date">{{data.date}}</p>
    </div>
</div> 
</template>

<script>
export default {
    name: 'post-component',
    props: {
        data: Object
    },
    methods: {
      likeFunc:function(param) {
        this.$store.commit('likeHandler',param); // store(mutations)
      }
    }
}
</script>

<style>
.liked_font {
  color: red;
}
</style>