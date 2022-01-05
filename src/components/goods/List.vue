<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图-->
    <el-card>
      <el-row :gutter="20">
        <el-col span="8">
          <el-input
            placeholder="请输入内容"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col span="4">
            <el-button type="primary">添加商品</el-button>
        </el-col>
      </el-row>
      <!--table表格区-->
      <el-table :data="goodslist" border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="商品名称" prop="goods_name"></el-table-column>
          <el-table-column label="商品价格(元)" width="90px" prop="goods_price"></el-table-column>
          <el-table-column label="商品重量" width="90px" prop="goods_weight"></el-table-column>
          <el-table-column label="创建时间" width="140px" prop="add_time">
              <template slot-scope="scope">
                  {{scope.row.add_time | dateFormat}}
              </template>
          </el-table-column>
          <el-table-column label="操作" width="130px">
              <template slot-scope="scope">
                  <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
                  <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
              </template>
          </el-table-column>
      </el-table>
      <!--分页区-->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import ParamsVue from './Params.vue';
export default {
  data() {
    return {
        //查询参数对象
        queryInfo:{
            query:'',
            pagenum:1,
            pagesize: 10
        },
        //商品列表
        goodslist: [],
        //总数据条数
        total: 0 
    };
  },
  created() {
      this.getGoodsList()
  },
  methods: {
      //根据分页获取商品列表
      async getGoodsList() {
          const {data:res} = await this.$http.get('goods',{params:this.queryInfo})
          if(res.meta.status!==200) {
              return this.$message.error('获取商品列表失败！')
          }
          this.$message.success('获取商品列表成功')
          this.goodslist = res.data.goods
          this.total = res.data.total
      },
      handleSizeChange(newSize){
        this.queryInfo.pagesize = newSize
        this.getGoodsList()
      },
      handleCurrentChange(newPage){
        this.queryInfo.pagenum = newPage
        this.getGoodsList()
      }
  }
};
</script>

<style lang="less" scoped>

</style>