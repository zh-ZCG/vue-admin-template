<template>
  <div>
    <div v-show="scene==0">
    <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addproduct"
          >添加商品</el-button
        >
        <hr>
        <el-input type="text" v-model="input" placeholder="请输入搜索商品内容" style="width:500px" @input="inputchange(input)"></el-input>
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
        prop="skuInfo[0].skuDesc"
        label="名称"
        width="110"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="skuInfo[0].skuName"
        label="描述"
        width="width"
      ></el-table-column>
      <el-table-column label="默认图片" width="110">
        <template slot-scope="{ row, $index }">
          <img
            :src="row.skuInfo[0].skuDefaultImg"
            alt=""
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" width="80" align="center"></el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="updateproduct(row)"
          ></el-button>
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
    <el-drawer  :visible.sync="show" :show-close="false" size="50%" v-if="skuInfo">
      <el-row>
      <el-col :span="5">名称</el-col>
      <el-col :span="16" v-if="skuInfo[0]">{{skuInfo[0].skuDesc}}</el-col>
    </el-row>
       <el-row>
      <el-col :span="5">描述</el-col>
      <el-col :span="16" v-if="skuInfo[0]">{{skuInfo[0].skuName}}</el-col>
    </el-row>
       <el-row>
      <el-col :span="5">价格</el-col>
      <el-col :span="16" v-if="skuInfo[0]">{{skuInfo[0].price}}元</el-col>
    </el-row>
       <el-row>
      <el-col :span="5">商品图片</el-col>
      <el-col :span="16">
      <el-col height="150px"><img :src="skuInfo[0].skuDefaultImg" height="700px" width="500px" v-if="skuInfo[0]"></el-col>
      </el-col>
    </el-row>
    </el-drawer>
    </div>
    <productform v-show="scene==1" @changeScene="changeScene" @changepage="changepage" ref="product"></productform>
    <productform1 v-show="scene==2" @changeScene="changeScene" @changepage="changepage" ref="product1"></productform1>
  </div>
</template>

<script>
import productform from './productform'
import productform1 from './productform1'
export default {
  name: "Product",
  data() {
    return {
      page: 1, //代表当前第几页
      limit: 10, //代表当前页面有几条数据
      records: [], //存储SKU列表的数据
      total: 20, //存储分页器一共展示的数据
      skuInfo:{},//存储SKU信息
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
        let result = await this.$API.product.reqProductList(page, limit); 
      if (result.code === 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    addproduct() {
      //切换为场景为1
     this.scene = 2;
    },
    handleSizeChange(limit) {
      //修改参数
      this.limit = limit;
      this.getSkuList();
    },
    updateproduct(row) {
        this.scene = 1;
        this.$refs.product.initProductData(row);
    },
    
    async getSkuInfo(sku){
      //展示抽屉
      this.show = true;
      //获取SKU数据
      let result = await this.$API.product.reqSkuById(sku.id);
      if(result.code==200){
         this.skuInfo = result.data.result[0].skuInfo;
      }
    },
    async deleteSkuInfo(sku){
        let result = await this.$API.product.reqdeleteproductById(sku.id);
      if(result.code==200){
         this.$message({ type: "success", message: "删除成功" });
         this.getSkuList();
      }
    },
    changeScene(scene){
        this.scene=scene;
    },
    changepage(page){
        this.getSkuList();
    },
    async inputchange(input){
        if(input==''){
const { page, limit } = this;
        let result = await this.$API.product.reqProductList(page, limit); 
      if (result.code === 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
        }else{
          let result = await this.$API.product.reqproductkeyword(input);
        this.records = result.data.result;  
        }
        
    }
  },
  components:{
      productform,
      productform1
  }
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
