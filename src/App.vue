<template>
  <v-app>
    <div>
      <nav class="navBar">
        <router-link to="/" class="white--text">Home</router-link> |
        <router-link to="/about" class="white--text">Create New</router-link>
      </nav>
    </div>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isUpdated: false,
    };
  },
  methods:{
    setUpdate(){
      console.log("running");
      this.isUpdated=!(this.isUpdated)
    },
    getUpdate(){
      return this.isUpdated
    }
  },
  provide() {
    return {
      Update:this.isUpdated,
      setUpdate:this.setUpdate,
      getUpdate:this.getUpdate,
    }
  },
};
</script>

<style scoped>
.navBar{
  width: 100%;
  height: 10vh;
  background-color: #444;
  padding: 18px 140px;
  margin-bottom: 10px;
  color: white !important;
  fill: white !important;
  font-size: large;
  text-decoration: none;
  
}
</style>