<template>
  <el-container>
    <el-main>
      <el-row style="height: 200px">
        <h1>{{book.bookName}}</h1>
        <p>书籍作者：{{book.bookWriter}}</p>
        <p>书记类型：{{book.bookType}}</p>
        <p>点击次数：{{book.bookClickCount}}</p>
      </el-row>
      <el-row style="height: 400px">
        <div v-if="book.chapters != null">
          <el-col v-for="chapter in book.chapters"
                  v-bind:key="chapter.id">
            <router-link :to="{path:'/BookReader',params:{bookId:chapter.boodId,chapterId:chapter.id}}"
                         target="_blank">{{chapter.chapterName}}</router-link>
          </el-col>
        </div>

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
            console.log(res.data.data);
            this.book = res.data.data;
          }
        });
    },
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
.el_main {
  text-align: center;
}
</style>>
