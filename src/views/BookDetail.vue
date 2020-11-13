<template>
  <el-container>
    <el-main>
      <el-row style="height: 200px">
        <h1>sss</h1>
      </el-row>
      <el-row style="height: 400px">
        <p>sss</p>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      book: {},
    };
  },
  methods: {
    defaultMessage(id) {
      axios
        .get("/api/book-reader/book/bookDetail", { params: { bookId: id } })
        .then((res) => {
          if (res.data.code == 0) {
            this.book = res.data.data;
          }
        });
    },
  },
  mounted: function () {
    // console.log(this.$route);
  },
  created: function () {
    this.defaultMessage(this.$route.params.bookId);
  },
};
</script>

<style scoped>
.el_container {
  padding-left: 5%;
  padding-right: 5%;
}
</style>>
