<template>
  <v-form ref="form" @submit.prevent="handleSubmit" class="ma-16">
    <v-text-field v-model="state.name" label="enter name" required></v-text-field>
    <v-text-field v-model.number="state.age" label="enter age" required></v-text-field>
     <v-text-field v-model.number="state.salary" label="enter salary" required></v-text-field>
    <v-text-field v-model="state.designation" label="enter designation" required></v-text-field>
    <v-btn class="mr-4 bt" type="submit"> Submit </v-btn>
  </v-form>
</template>

<script>
import AxiosFetch from "./apis/AxiosFetch.js";
export default {
  data() {
    return {
     state: { name: "", age: "", salary: "", designation: "" },
    };
  },
 methods: {
    async fetchdata() {
      try {
        await AxiosFetch.post("/posts",this.state);
      } catch (err) {
        console.log(err);
      }
    },
    handleSubmit(){
      this.fetchdata();
      this.$router.push("/");
      this.$vToastify.success("successfully created")
    }
  },
};
</script>

<style scoped>
.bt{
  background-color:#444 !important;
  color: white;
}

</style>
