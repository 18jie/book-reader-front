<template>
  <!-- <el-aside width="200px"> -->
    <!-- <el-table-column prop="date"
                       label="日期"
                       width="180">
      </el-table-column>
      <el-table-column prop="name"
                       label="姓名"
                       width="180">
      </el-table-column>
      <el-table-column prop="address"
                       label="地址">
      </el-table-column> -->
    <div v-if="bookSiteList != null">
      <el-row style="height:40px"
              v-for="book in bookSiteList"
              :key="book.id">
        <el-col :span="12">
          <el-image style="width: 100px; height: 100px"
                    :src="item.bookImgUrl"
                    :fit="fit"></el-image>
        </el-col>
        <el-row style="height:20px">
          {{book.writer}}
        </el-row>
      </el-row>
    </div>
  <!-- </el-aside> -->
</template>

<script>
import axios from "axios";
var books = null;
// axios.get("http://localhost:8080/books").then((res) => {
//   if (res.status == 1) {
//     books = res;
//   }
// });
export default {
  name: "bookSide",
  data() {
    return {
      bookSiteList: books == null ? null : books.content,
    };
  },
};
</script>

<style>
</style>