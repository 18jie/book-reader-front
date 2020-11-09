<template>
  <div v-if="bookMainList != null">
    <el-row style="height:40px"
            v-for="book in bookMainList"
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
  name: "bookMain",
  data() {
    return {
      bookMainList: books == null ? null : books.content,
    };
  },
};

</script>

<style>
</style>