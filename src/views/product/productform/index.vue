<template>
  <div>
    <el-form ref="form" label-width="80px" :model="product">
      <el-form-item label="商品名称">
        <el-input placeholder="商品名称" v-if="product.skuInfo[0]" v-model="product.skuInfo[0].categoryChildName"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input placeholder="价格"  v-if="product.skuInfo[0]" v-model="product.skuInfo[0].price"></el-input>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="商品描述"
           v-if="product.skuInfo[0]"
          v-model="product.skuInfo[0].skuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品图片">
          <img width="500px" height="800px" :src="product.skuInfo[0].skuDefaultImg"  v-if="product.skuInfo[0]" alt="" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="$emit('changeScene',0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: "",
  data() {
    return {
      product:{
          skuInfo:{
              categoryChildName:'',
              price:'',
              skuName:''
          }
      },
    };
  },
  methods: {
    //初始化SpuForm数据
    async initProductData(product) {
        let productInfo = await this.$API.product.reqSkuById(product.id);
        this.product = productInfo.data.result[0];
    },
    //保存按钮的回调
    async addOrUpdateSpu() {
      //发请求
      let result = await this.$API.product.reqUpdateSpu(this.product.skuInfo);
      if (result.code == 200) {
        //提示
        this.$message({ type: "success", message: "修改成功" });
        //通知父组件回到场景0
        this.$emit("changepage",1);
        this.$emit("changeScene", 0);
      }
      //清除数据
      Object.assign(this._data, this.$options.data());
    },
    //取消按钮
    cancel() {
      //取消按钮的回调，通知父亲切换场景为0
      this.$emit("changeScene", 0);
      //清理数据
      //Object.assign:es6中新增的方法可以合并对象
      //组件实例this._data,可以操作data当中响应式数据
      //this.$options可以获取配置对象，配置对象的data函数执行，返回的响应式数据为空的
      Object.assign(this._data, this.$options.data());
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
