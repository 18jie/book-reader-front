<template>
  <el-container>
    <el-header>
      <!-- 导航栏开始 -->
      <el-row>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <!-- <el-col :span="24">
            <el-col :span="18"> -->
          <el-menu-item index="1" key="0">首页</el-menu-item>
          <el-menu-item index="2" key="1">武侠仙侠</el-menu-item>
          <el-menu-item index="3" key="2">女频言情</el-menu-item>
          <el-menu-item index="4" key="3">现代都市</el-menu-item>
          <el-menu-item index="5" key="4">历史军事</el-menu-item>
          <el-menu-item index="6" key="5">游戏竞技</el-menu-item>
          <el-menu-item index="7" key="6">科幻灵异</el-menu-item>
          <el-menu-item index="8" key="7">美文同人</el-menu-item>
          <el-menu-item index="9" key="8">剧本教程</el-menu-item>
          <el-menu-item index="10" key="9">名著杂志</el-menu-item>
          <el-col :span="4" :offset="1">
            <el-input
              size="small"
              v-model="search"
              placeholder="请输入内容"
            ></el-input>
          </el-col>
          <el-col :span="1">
            <el-button
              size="small"
              icon="el-icon-search"
              circle
              class="float:right;"
            ></el-button>
          </el-col>
          <el-col :span="1">
            <router-link
              class="el-icon-user"
              :to="{ path: '/Login' }"
              target="_blank"
            ></router-link>
          </el-col>
        </el-menu>
      </el-row>
      <!-- 导航栏结束 -->
    </el-header>
    <el-container class="books_main">
      <el-aside width="400px">
        <!-- 侧边目录开始 -->
        <!-- <div v-if="bookSiteList != null">
          <el-row
            style="height: 40px"
            v-for="book in bookSiteList"
            :key="book.id"
          >
            <el-col :span="12">
              <el-image
                style="width: 100px; height: 100px"
                :src="item.bookImgUrl"
                :fit="fit"
              ></el-image>
            </el-col>
            <el-row style="height: 20px">
              {{ book.writer }}
            </el-row>
          </el-row>
        </div> -->
        <div>
          <h1>排行榜</h1>
        </div>
        <div v-if="bookSiteList != null">
          <el-table :data="bookSiteList" style="width: 100%">
            <el-table-column prop="bookName" label="书籍名称">
            </el-table-column>
            <!-- <el-table-column prop="bookType" label="书籍类型">
            </el-table-column> -->
            <el-table-column prop="bookWriter" label="作者">
              <!-- </el-table-column>
            <el-table-column prop="bookUpdateTime" label="更新时间"> -->
            </el-table-column>
          </el-table>
        </div>
        <!-- 侧边目录结束 -->
      </el-aside>
      <el-main>
        <!-- 右边目录开始 -->
        <!-- <div v-if="bookMainList != null">
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
        </div> -->
        <div>
          <h1>分类阅读</h1>
        </div>
        <div v-if="bookMainList != null">
          <el-table
            :data="bookMainList"
            style="width: 100%"
            @row-click="handleRowClick"
          >
            <el-table-column prop="bookName" label="书籍名称" width="180">
            </el-table-column>
            <el-table-column prop="bookType" label="书籍类型" width="180">
            </el-table-column>
            <el-table-column prop="bookWriter" label="作者" width="180">
            </el-table-column>
            <el-table-column prop="bookUpdateTime" label="更新时间" width="180">
            </el-table-column>
          </el-table>
        </div>
        <!-- 右边目录结束 -->
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="pageTotal"
            :current-page="currentPage"
          >
          </el-pagination>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      activeIndex: "2",
      bookMainList: [],
      bookSiteList: [],
      search: "",
      pageTotal: 1,
      pageSize: 10,
      currentPage: 1,
      keyIndex: 2,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      var typeNum = keyPath;
      this.keyIndex = keyPath;
      this.currentPage = 1;
      axios
        .get(
          "/api/book-reader/book/listBooks?type=" +
            keyPath +
            "&pageNum=" +
            this.currentPage +
            "&pageSize=" +
            this.pageSize
          // {
          //   params: {
          //     type: typeNum,
          //     pageNum: this.currentPage,
          //     pageSize: this.pageSize,
          //   },
          // }
        )
        .then((response) => {
          console.log(this.bookMainList);
          // console.log(response);
          if (response.data.code == 0) {
            // console.log(response.data.data.records);
            this.bookMainList = response.data.data.records;
            this.pageTotal = response.data.data.pages;
          }
          console.log(this.bookMainList);
        });
    },
    handleCurrentChange(val) {
      console.log(val);
      this.currentPage = val;
      axios
        .get(
          "/api/book-reader/book/listBooks?type=" +
            this.keyIndex +
            "&pageNum=" +
            this.currentPage +
            "&pageSize=" +
            this.pageSize
          // {
          //   params: {
          //     type: keyPath,
          //     pageNum: this.currentPage,
          //     pageSize: this.pageSize,
          //   },
          // }
        )
        .then((response) => {
          console.log(response);
          if (response.data.code == 0) {
            this.bookMainList = response.data.data.records;
            this.pageTotal = response.data.data.pages;
          }
        });
    },
    getSideData() {
      axios.get("/api/book-reader/book/listBooks").then((response) => {
        if (response.data.code == 0) {
          this.bookSiteList = response.data.data.records;
        }
      });
    },
    getMainData() {
      axios
        .get(
          "/api/book-reader/book/listBooks?type=" +
            this.keyIndex +
            "&pageNum=" +
            this.currentPage +
            "&pageSize=" +
            this.pageSize
        )
        .then((response) => {
          if (response.data.code == 0) {
            this.bookMainList = response.data.data.records;
            this.pageTotal = response.data.data.pages;
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
    this.getSideData();
    this.getMainData();
  },
};
</script>

<style scoped>
.books_main {
  padding-left: 5%;
  padding-right: 5%;
}
.el-aside {
  background-color: white;
  text-align: center;
  /* line-height: 200px;
  height: 200px; */
  margin-top: 20px;
  margin-left: 20px;
}
.el-main {
  background-color: white;
  text-align: center;
  /* line-height: 160px; */
  margin-top: 20px;
  margin-left: 20px;
}
.el-header {
  /* color: #333; */
  text-align: center;
  line-height: 60px;
}
</style>