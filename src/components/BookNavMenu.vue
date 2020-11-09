<template>
  <!-- <el-container> -->
  <!-- <el-header direction:horizontal> -->
  <el-row>
    <el-menu :default-active="activeIndex"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect">
      <!-- <el-col :span="24">
            <el-col :span="18"> -->
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">武侠仙侠</el-menu-item>
      <el-menu-item index="3">女频言情</el-menu-item>
      <el-menu-item index="4">现代都市</el-menu-item>
      <el-menu-item index="5">历史军事</el-menu-item>
      <el-menu-item index="6">游戏竞技</el-menu-item>
      <el-menu-item index="7">科幻灵异</el-menu-item>
      <el-menu-item index="8">美文同人</el-menu-item>
      <el-menu-item index="9">剧本教程</el-menu-item>
      <el-menu-item index="10">名著杂志</el-menu-item>
      <el-col :span="4"
              :offset="1">
        <el-input size="small"
                  v-model="search"
                  placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="1">
        <el-button size="small"
                   icon="el-icon-search"
                   circle
                   class="float:right;"></el-button>
      </el-col>
      <el-col :span="1">
        <router-link class="el-icon-user"
                     :to="{path:'/Login'}"
                     target="_blank"></router-link>
      </el-col>
    </el-menu>
  </el-row>

  <!-- </el-header> -->
  <!-- </el-container> -->
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.el-header {
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>