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
        <!-- <div v-for="comment in comments"
           :key="comment.id">
          {{comment.content}}
        </div> -->
        <el-card v-for="comment in comments"
                 :key="comment.id"
                 class="box-card">
          <div slot="header"
               class="clearfix">
            <span>{{comment.userName}}</span>
            <el-button style="float: right; padding: 3px 0"
                       type="text">{{comment.createTime}}</el-button>
          </div>
          <p>{{comment.content}}</p>
        </el-card>
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
                       @click="submitComment"
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
axios.defaults.withCredentials = true;
export default {
  data() {
    return {
      chapter: {},
      comments: [],
      drawer: false,
      textarea: "",
      inputDisabled: true,
      inputPlaceholder: "请输入内容",
      currentLine: "",
      // commentData: null,
    };
  },
  methods: {
    dateFormat(time) {
      console.log(time);
      var date = new Date(time);
      var year = date.getFullYear();
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },
    getChapter(id) {
      axios
        .get("/book-reader/chapter/chapterDetail", {
          params: { chapterId: id },
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.chapter = res.data.data;
            console.log(this.chapter);
          }
        });
    },
    handleComment(line, id) {
      this.currentLine = line;
      this.drawer = true;
      // console.log(line, id);
      axios
        .get("/book-reader/barrage/listBarrage", {
          params: { chapterId: id, comment: line },
        })
        .then((res) => {
          if (res.data.code == 0) {
            // console.log(res.data.data.records);
            this.comments = res.data.data.records;
            this.comments.forEach((item, index) => {
              item.createTime = this.dateFormat(item.createTime);
            });
            // console.log(this.comments);
          }
        });
    },
    isLogin() {
      axios.get("/book-reader/login/isLogin").then((res) => {
        if (res.data.code == 0) {
          // console.log(res.data);
          if (res.data.data != null) {
            this.inputDisabled = false;
          }
        }
      });
    },
    submitComment() {
      // console.log("submitComment" + this.textarea);
      axios
        .post("/book-reader/barrage/saveBarrage", {
          bookId: this.chapter.bookId,
          chapterId: this.chapter.id,
          contentCode: this.currentLine,
          content: this.textarea,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.textarea = "";
            this.handleComment(this.currentLine, this.chapter.id);
          }
        });
    },
  },
  created: function () {
    // console.log(this.$route.params);
    this.getChapter(this.$route.params.chapterId);
    this.isLogin();
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