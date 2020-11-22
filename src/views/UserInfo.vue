<template>
  <el-container style="height: 100%;">
    <el-aside>
      <div class="side_main">
        <el-menu default-active="2"
                 @open="handleOpen"
                 @close="handleClose"
                 @select="handleSelect"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 style="width: 90%;height: 100%;">
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">基本信息</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">我的收藏</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">写文章</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>
    <el-main>
      <div v-if="index == 2">
        <UserBase />
      </div>

    </el-main>
  </el-container>
</template>

<script>
import UserBase from "@/components/UserBase";
export default {
  components: {
    UserBase,
  },
  data() {
    return {
      index: 2,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.index = key;
    },
  },
};
</script>

<style scoped>
.side_main {
  width: 100%;
  height: 900px;
}
</style>>
