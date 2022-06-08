<template>
  <div>
        <hr>
        <el-input type="text" v-model="input" placeholder="请输入搜索订单内容" style="width:500px" @input="inputchange(input)"></el-input>
        <hr>
    <!-- 表格 -->
    <el-table style="width: 100%" border :data="records">
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="userName"
        label="收件人"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="addressName"
        label="地址"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="ordermessage"
        label="备注"
        width="300"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="paymoney"
        label="总价钱"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteSkuInfo(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页          -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getSkuList"
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
    >
    </el-pagination>
        <!-- 抽屉效果 -->
    <el-drawer  :visible.sync="show" :show-close="false" size="50%">
    <el-table :data="skuInfo">
      <el-table-column property="skuDesc" label="名称" width="150"></el-table-column>
      <el-table-column property="skuName" label="描述" width="200"></el-table-column>
      <el-table-column property="price" label="价格"></el-table-column>
      <el-table-column property="skuDefaultImg" label="商品图片">
          <template slot-scope="scope">
              <el-popover trigger="hover">
                  <el-image :src="scope.row.skuDefaultImg" style="width:300px;height:500px" />
                  <el-image slot="reference" :src="scope.row.skuDefaultImg" style="width:50px;height:80px" alt="" />
              </el-popover>
          </template>
      </el-table-column>
    </el-table>
    </el-drawer>
    </div>
</template>

<script>
export default {
  name: "Dindanguanli",
  data() {
    return {
      page: 1, //代表当前第几页
      limit: 10, //代表当前页面有几条数据
      records: [], //存储SKU列表的数据
      total: 20, //存储分页器一共展示的数据
      skuInfo:[],//存储SKU信息
      show:false,
      scene:0,
      input:''
    };
  },
  //组件挂载完毕
  mounted() {
    //获取sku列表的方法
    this.getSkuList();
  },
  methods: {
    //获取sku列表数据的方法
    async getSkuList(pages=1) {
        this.page=pages;
      //解构出默认的参数
      const { page, limit } = this;
        let result = await this.$API.product.reqDindanList(page, limit); 
      if (result.code === 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    handleSizeChange(limit) {
      //修改参数
      this.limit = limit;
      this.getSkuList();
    },
    
    async getSkuInfo(sku){
      //展示抽屉
      this.show = true;
      //获取SKU数据
      let result = await this.$API.product.reqdindanById(sku.id);
      if(result.code==200){
         this.skuInfo = result.data.result[0].orderDetailList;
      }
    },
    async deleteSkuInfo(sku){
        let result = await this.$API.product.reqdeletedindanById(sku.order_number);
      if(result.code==200){
         this.$message({ type: "success", message: "删除成功" });
         this.getSkuList();
      }
    },
    async inputchange(input){
        if(input==''){
    const { page, limit } = this;
        let result = await this.$API.product.reqDindanList(page, limit); 
      if (result.code === 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
        }else{
          let result = await this.$API.product.reqdindankeyword(input);
        this.records = result.data.result;  
        }
        
    }
  },
};
</script>


<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .el-drawer__body{
      overflow: auto;
  }
</style>

<style scoped>
   .el-row .el-col-5{
      font-size:18px;
      text-align:right;
   }
   .el-col{
     margin:10px 10px;
   }

   .el-carousel__button{
    width:10px;
    height:10px;
    background:red;
    border-radius:50%;
  }
</style>
