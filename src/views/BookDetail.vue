<template>
  <el-container>
    <el-header>
      <BookNavMenu />
    </el-header>
    <el-container class="book_detail">
      <BookDetailMain />
    </el-container>
  </el-container>
</template>

<script>
import BookDetailMain from "@/components/BookDetailMain";
import BookNavMenu from "@/components/BookNavMenu";
export default {
  components: {
    BookDetailMain,
    BookNavMenu,
  },
};
</script>

<style>
.book_detail {
  padding-left: 5%;
  padding-right: 5%;
}
</style>