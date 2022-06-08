<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
          <Search></Search>
      </el-col>
      <el-col :span="12">
          <Category></Category>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Search from "./Search";
import Category from "./Category";
import { mapState } from "vuex";
export default {
  name: "",
  components: {
    Search,
    Category,
  },
  computed: {
    ...mapState({
      listState: (state) => state.home.list,
    }),
  },
};
</script>

<style scoped>
</style>
