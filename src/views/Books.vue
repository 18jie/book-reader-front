<template>
  <el-container>
    <el-header>
      <BookNavMenu />
    </el-header>
    <el-container class="books_main">
      <el-aside width="400px">
        <BookSite />
      </el-aside>
      <el-main>
        <BookMain />
        <div class="block">
          <span class="demonstration">页数较少时的效果</span>
          <el-pagination layout="prev, pager, next"
                         :total="50">
          </el-pagination>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import BookNavMenu from "@/components/BookNavMenu";
import BookSide from "@/components/BookSide";
import BookMain from "@/components/BookMain";
export default {
  components: {
    BookNavMenu,
    BookSide,
    BookMain,
  },
};
</script>

<style>
.books_main {
  padding-left: 5%;
  padding-right: 5%;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 200px;
  margin-top: 20px;
  margin-left: 20px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  margin-top: 20px;
  margin-left: 20px;
}
</style>