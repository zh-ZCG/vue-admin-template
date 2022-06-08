<template>
  <el-card>
    <div slot="header" class="header">
      <div class="category-header">
        <span>销售额类别占比</span>
      </div>
    </div>
    <div>
      <div class="charts" ref="charts"></div>
    </div>
  </el-card>
</template>

<script>
import echarts from "echarts";
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {
    };
  },
  mounted() {
    //饼图
    let mychart = echarts.init(this.$refs.charts);
    mychart.setOption({
      title: {
        text: "销售额",
        subtext: 1048,
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outsize",
          },
          labelLine: {
            show: true,
          },
          data: this.listState.saleRank
        },
      ],
    });
    //绑定事件

    mychart.on("mouseover",(params)=>{
        //获取鼠标移上去那条数据
        const {name,value} = params.data;
        //重新设置标题
        mychart.setOption({
          title:{
            text:name,
            subtext:'value'
          }
        })
    });
  },
  computed: {
    ...mapState({
      listState: (state) => state.home.list,
    }),
  },
  watch: {
    listState(){
    let mychart = echarts.init(this.$refs.charts);
    mychart.setOption({
      title: {
        text: "销售额",
        subtext: 1048,
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outsize",
          },
          labelLine: {
            show: true,
          },
          data: this.listState.saleRank
        },
      ],
    });

    }
  },
};
</script>

<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header {
  border-bottom: 1px solid #eee;
}
.charts {
  width: 100%;
  height: 300px;
}
</style>
