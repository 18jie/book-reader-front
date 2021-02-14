<template>
  <div class="book_favorite" v-if="bookMainList != null">
    <el-table :data="bookMainList"
              style="width: 100%"
              @row-click="handleRowClick">
      <el-table-column prop="bookName"
                       label="书籍名称"
                       width="180">
      </el-table-column>
      <el-table-column prop="bookType"
                       label="书籍类型"
                       width="180">
      </el-table-column>
      <el-table-column prop="bookWriter"
                       label="作者"
                       width="180">
      </el-table-column>
      <el-table-column prop="bookUpdateTime"
                       label="更新时间"
                       width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      bookMainList: null,
    };
  },
  methods: {
    getBooks() {
      axios.get("/book-reader/favorite/list").then((res) => {
        if (res.data.code == 0) {
          this.bookMainList = res.data.data;
        }
      });
    },
    handleRowClick(val) {
      console.log(val);
      this.$router.push({ name: "BookDetail", params: { bookId: val.id } });
      console.log(this.$router);
    },
  },
  mounted: function () {
    this.getBooks();
  },
};
</script>

<style scoped>
.book_favorite{
  
}
</style>
