<template>
  <el-container>
    <el-main>
      <el-row style="height: 200px; text-align: center">
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            <span>{{ book.bookName }}</span>
          </div>
          <el-col :span="9">
            <p>书籍作者：{{ book.bookWriter }}</p>
          </el-col>
          <el-col :span="9">
            <p>书记类型：{{ book.bookType }}</p>
          </el-col>
          <el-col :span="9">
            <p>点击次数：{{ book.bookClickCount }}</p>
          </el-col>
          <el-col :span="9">
            收藏：
            <!-- <a href="#"
               class="el-icon-star-off"
               style="font-size:40px"
               v-if="book.isFavorite == null || loging"></a>
            <a v-else
               style="font-size:40px"
               class="el-icon-star-on"></a> -->
            <div class="el-icon-star-off"
                 style="font-size:40px;cursor:pointer"
                 @click="handleFavorite()"
                 v-if="loging == false || book.isFavorite == null || book.isFavorite == false"></div>
            <div v-else
                 style="font-size:40px;cursor:pointer"
                 @click="handleFavorite()"
                 class="el-icon-star-on"><a href="#"></a></div>
          </el-col>
        </el-card>
      </el-row>
      <el-divider></el-divider>
      <el-row style="
          height: 400px;
          margin-top: 20px;
          padding-left: 10%;
          padding-right: 10%;
        ">
        <div v-if="book.chapters != null">
          <el-col :span="6"
                  v-for="chapter in book.chapters"
                  v-bind:key="chapter.id">
            <el-tag type="success">
              <el-link type="primary">
                <router-link :to="{
                    name: 'BookReader',
                    params: { bookId: chapter.boodId, chapterId: chapter.id },
                  }">{{ chapter.chapterName }}</router-link>
              </el-link>
            </el-tag>
          </el-col>
        </div>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  data() {
    return {
      book: {},
      loging: false,
    };
  },
  methods: {
    defaultMessage(id) {
      axios
        .get("/book-reader/book/bookDetail", { params: { bookId: id } })
        .then((res) => {
          if (res.data.code == 0) {
            console.log(res.data.data);
            this.book = res.data.data;
          }
        });
    },
    isLogin() {
      axios.get("/book-reader/login/isLogin").then((res) => {
        if (res.data.code == 0) {
          // console.log(res.data);
          if (res.data.data != null) {
            this.loging = true;
          }
        }
      });
    },
    handleFavorite() {
      if (this.loging == false) {
        this.$message({
          message: "请先登录",
          type: "error",
        });
        return;
      }
      console.log("1111");
      axios
        .get("/book-reader/favorite/addOrRemoveFavorite", {
          params: {
            bookId: this.book.id,
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            if (res.data.data == true) {
              this.defaultMessage(this.book.id);
            }
          }
        });
    },
  },
  created: function () {
    this.isLogin();
    this.defaultMessage(this.$route.params.bookId);
  },
};
</script>

<style scoped>
.el_row {
  margin-top: 20px;
}
</style>>
