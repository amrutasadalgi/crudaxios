<template>
  <v-form ref="form" @submit.prevent="handleSubmit" class="ma-16">
    <v-text-field
      v-model="state.name"
      label="enter name"
      required
    ></v-text-field>
    <v-text-field v-model.number="state.age" label="enter age" required></v-text-field>
    <v-text-field
      v-model.number="state.salary"
      label="enter salary"
      required
    ></v-text-field>
    <v-text-field
      v-model="state.designation"
      label="enter designation"
      required
    ></v-text-field>
    <v-btn color="gray white--text" class="mr-4" type="submit"> Submit </v-btn>
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
  inject: ["Update", "setUpdate"],
  methods: {
    async fetchdata() {
      try {
        await AxiosFetch.put(`/posts/${this.$route.params.id}`, this.state);
        this.$emit("newuser");
      } catch (err) {
        console.log(err);
      }
    },
    handleSubmit() {
      this.fetchdata();
      this.setUpdate();

      this.$router.push("/");
    },
    async getData() {
      let { data } = await AxiosFetch.get(`/posts/${this.$route.params.id}`);
      this.state = data;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
.gray{
background-color: #444 !important;
}</style>
