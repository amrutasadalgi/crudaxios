<template>
  <div>
    <v-simple-table class="ma-5 tab">
      <tr class="header">
        <td @click="order">
          ID<v-icon class="rotate arrow">fa-thin fa-arrow-down</v-icon>
        </td>
        <td @click="order">
          NAME<v-icon class="rotate arrow">fa-thin fa-arrow-down</v-icon>
        </td>
        <td @click="order">
          AGE<v-icon class="rotate arrow">fa-thin fa-arrow-down</v-icon>
        </td>
        <td @click="order">
          SALARY<v-icon class="rotate arrow">fa-thin fa-arrow-down</v-icon>
        </td>
        <td>DESIGNATION</td>
        <td>EDIT</td>
        <td>DELETE</td>
      </tr>
      <tr v-for="items in pagi" :key="items.id" class="pa-2">
        <td>{{ items.id }}</td>
        <td>{{ items.name }}</td>
        <td>{{ items.age }}</td>
        <td>{{ items.salary }}</td>
        <td>{{ items.designation }}</td>
        <td class="py-2">
          <v-btn color="success" class="mr-2" @click="handleEdit(items.id)">
            Edit
          </v-btn>
        </td>
        <td class="p-y">
          <v-btn
            color="red white--text"
            @click="handleDelete(items.id)"
          >
            Delete
          </v-btn>
        </td>
      </tr>
    </v-simple-table>
    <v-main class="pageLimit">
      <template>
        <div class="text-center d-flex">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <p class="pa-2">Enter the limit</p>
              <v-btn color="#444" dark v-bind="attrs" v-on="on">
                {{ rowLimit }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index">
                <v-list-item-title @click="rowLimit = item">{{
                  item
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn dark class="gray mx-1" @click="prePage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn dark  class="gray mx-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </template>
    </v-main>
    <div class="pageLimit">
      <v-btn @click="pagination" class="gray white--text mx-2"
        >ALL</v-btn
      >
      <v-btn @click="pagination" class="gray white--text mx-2"
        >1</v-btn
      >
      <v-btn @click="pagination" class="gray white--text mx-2"
        >2</v-btn
      >
      <v-btn @click="pagination" class="gray white--text mx-2"
        >3</v-btn
      >
      <v-btn @click="pagination" class="gray white--text mx-2"
        >4</v-btn
      >
      <v-btn @click="pagination" class="gray white--text mx-2"
        >5</v-btn
      >
    </div>
  </div>
</template>

<script>
import AxiosFetch from "./apis/AxiosFetch.js";
export default {
  name: "GetApi",
  data() {
    return {
      task: [],
      pagi: [],
      currentPage: 1,
      items: [5, 10, 15],
      rowLimit: 5,
    };
  },
  methods: {
    async fetchdata() {
      try {
        let { data } = await AxiosFetch.get("/posts");
        this.task = data;
        this.pagi = data;
      } catch (err) {
        console.log(err);
      }
    },
    async handleDelete(id) {
      await AxiosFetch.delete(`/posts/${id}`);
      this.$vToastify.success("successfully deleted")
      this.fetchdata();
    },
    async handleEdit(id) {
      this.$router.push(`/edit/${id}`);
    },

    pagination(e) {
      let page = e.target.innerText;
      if (page == "ALL") {
        this.pagi = this.task;
        return;
      } else if (page == 1) {
        this.pagi = this.task.slice(0, this.rowLimit);
        return;
      }
      let start = page * this.rowLimit - this.rowLimit;
      let end = page * this.rowLimit;
      this.pagi = this.task.slice(start, end);
    },
    nextPage() {
      if (this.currentPage == 4) return;
      this.currentPage++;
      let start = this.currentPage * this.rowLimit - this.rowLimit;
      let end = this.currentPage * this.rowLimit;
      this.pagi = this.task.slice(start, end);
    },
    prePage() {
      if (this.currentPage == 1) return;
      this.currentPage--;
      let start = this.currentPage * this.rowLimit - this.rowLimit;
      let end = this.currentPage * this.rowLimit;
      this.pagi = this.task.slice(start, end);
    },
    order(e) {
      let content = e.target.innerText.trim().toLowerCase();
      let arrow = e.target.children[0];
      function sortList(a, b) {
        if (arrow.classList.contains("rotate"))
          return a[content] < b[content] ? 1 : -1;
        return a[content] > b[content] ? 1 : -1;
      }
      this.pagi.sort(sortList);
      arrow.classList.toggle("rotate");
    },
  },
  created() {
    this.fetchdata();
  },
};
</script>

<style scoped>
.tab {
  width: 80%;
  margin: 0 auto !important;
}
.tab tr td{
  text-align: center;
  padding: 4px;
  height: 20px !important;
  width: 100px !important;
}
.tab tr:nth-child(even){
background-color: rgba(153, 153, 153, 0.397);
}

.rotate {
  transform: rotate(180deg);
}
.arrow {
  font-size: 16px !important;
  color: white !important;
  margin-left: 3px;
  text-align: center !important;
}
.header {
  font-weight: bold;
  background-color: #444;
  color: #fff;
  
}
.header td{
padding: 10px !important  ;
}
.pageLimit {
  width: 80%;
  margin: 25px auto !important;
  
}
.gray{
background-color: #444 !important;
}
</style>
