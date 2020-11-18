<template>
  <el-container>
    <el-main class="read_main">
      <p v-for="(line, index) in chapter.lines"
         v-bind:key="index">
        {{ line.line }}
        <!-- <el-tag @click="handleComment(line.line, chapter.id)"></el-tag> -->
        <el-button @click="handleComment(line.line, chapter.id)"
                   type="primary"
                   style="margin-left: 16px"
                   size="small">
          {{line.commitNum}}
        </el-button>
      </p>

      <el-drawer title="我是标题"
                 :visible.sync="drawer"
                 :with-header="false">
        <p v-for="comment in comments"
           :key="comment.id">
          {{comment.content}}
        </p>
        <el-row>
          <el-col :span="20">
            <el-input style="margin:5px"
                      type="textarea"
                      :rows="2"
                      :placeholder="inputPlaceholder"
                      :disabled="inputDisabled"
                      v-model="textarea">
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button style="margin:10px"
                       type="success"
                       icon="el-icon-check"
                       circle></el-button>
          </el-col>
        </el-row>
      </el-drawer>
    </el-main>
    <!-- <el-aside style="width:40%;background-color:green;">
        <p v-for="comment in comments"
           :key="comment.id">
          {{comment.content}}
        </p>
    </el-aside> -->
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      chapter: {},
      comments: [],
      drawer: false,
      textarea: "",
      inputDisabled: true,
      inputPlaceholder: "请输入内容",
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
      this.drawer = true;
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
    var userId = sessionStorage.getItem("userId");
    console.log(userId);
    if (userId != null) {
      this.inputDisabled = false;
      this.inputPlaceholder = "请先登录！";
    }
  },
};
</script>

<style scoped>
.read_main {
  /* width: 50%; */
  background-color: #ffffcc;
  margin: 10%;
}
</style>>