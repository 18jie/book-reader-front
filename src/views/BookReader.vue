<template>
  <el-container>
    <el-main style="width: 50%;background-color:yellow;">
      <p v-for="(line,index) in chapter.lines"
         v-bind:key="index">
        {{line.line}}<el-tag @click="handleComment(line.line,chapter.id)">{{line.commitNum}}</el-tag>
      </p>
    </el-main>
    <el-aside style="width:40%;background-color:green;">
        <p v-for="comment in comments"
           :key="comment.id">
          {{comment.content}}
        </p>
    </el-aside>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      chapter: {},
      comments: [],
      // commentData: null,
    };
  },
  methods: {
    getChapter(id) {
      axios
        .get("/api/book-reader/chapter/chapterDetail", {
          params: { chapterId: id },
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.chapter = res.data.data;
          }
        });
    },
    handleComment(line, id) {
      console.log(line, id);
      axios
        .get("/api/book-reader/barrage/listBarrage", {
          params: { chapterId: id, comment: line },
        })
        .then((res) => {
          if (res.data.code == 0) {
            console.log(res.data.data.records);
            this.comments = res.data.data.records;
            console.log(this.comments);
          }
        });
    },
  },
  created: function () {
    console.log(this.$route.params);
    this.getChapter(this.$route.params.chapterId);
  },
};
</script>

<style scoped>
</style>>