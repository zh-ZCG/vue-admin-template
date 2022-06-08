<template>
  <el-card>
    <div slot="header" class="header">
      <div class="search-header">
        <span>线上热门搜索</span>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <LineCharts></LineCharts>
        </el-col>
      </el-row>
      <!-- table表格 -->
      <el-table v-if="listState.searchWord" :data="(listState.searchWord).slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" border>
        <el-table-column label="排名" width="80" type="index">
        </el-table-column>
        <el-table-column label="搜索关键字" width="180" prop="word"></el-table-column>
        <el-table-column label="用户数" sortable prop="count"> </el-table-column>
        <el-table-column label="周涨幅" sortable prop="user"> </el-table-column>
      </el-table>
      <!-- 分页去 -->
      <!-- <el-pagination layout="prev, pager, next" :total="1000" class="pagination" page-size="5"> </el-pagination> -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="text-align: center"
      :current-page="currentPage"
      :page-sizes="[3, 5, 10]"
      :page-size="pagesize"
      layout="prev, pager, next, jumper,->,sizes,total"
      v-if="listState.searchWord"
      :total="listState.searchWord.length"
    >
    </el-pagination>
    </div>
  </el-card>
</template>

<script>
import LineCharts from "./lineCharts";
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {
        currentPage:1,
        pagesize:3,
        total:0,
      tableData:[{}],
    };
  },
  mounted(){
  },
  components: {
    LineCharts,
  },
  computed: {
    ...mapState({
      listState: (state) => state.home.list
    }),
  },
  methods:{
      handleSizeChange(size) {
      //修改参数
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      //修改参数
      this.currentPage = currentPage;
    },
  }
};
</script>

<style scoped>
.header {
  border-bottom: 1px solid #eee;
  padding: 5px 0px;
}
.search-header {
  display: flex;
  justify-content: space-between;
}
.pagination{
  float: right;
}
</style>
