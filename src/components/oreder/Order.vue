<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区-->
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!--订单列表数据-->
      <el-table :data="orderlist" border stripe >
          <el-table-column type="index"></el-table-column>
          <el-table-column label="订单编号" prop="order_number"></el-table-column>
          <el-table-column label="订单价格" prop="order_price"></el-table-column>
          <el-table-column label="是否付款" prop="pay_status">
              <template slot-scope="scope">
                  <el-tag v-if="scope.row.pay_status=='1'" type="success">已付款</el-tag>
                  <el-tag v-else type="danger">未付款</el-tag>
              </template>
          </el-table-column>
          <el-table-column label="是否发货" prop="is_send"></el-table-column>
          <el-table-column label="下单时间" prop="create_time">
              <template slot-scope="scope">
                  {{scope.row.create_time |dateFormat}}
              </template>
          </el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                  <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
                  <el-button size="mini" type="success" icon="el-icon-location"></el-button>
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
export default {
  data() {
    return {
        queryInfo: {
            query: '',
            pagenum: 1,
            pagesize: 30
        },
        //订单总数
        total: 0,
        //订单列表
        orderlist: [],
    }
  },
  created() {
      this.getOrderList()
  },
  methods: {
      async getOrderList(){
          const {data:res} = await this.$http.get('orders',{params:this.queryInfo})
          if(res.meta.status!==200){
              return this.$message.error('获取订单列表失败')
          }
          this.total = res.data.total
          this.orderlist = res.data.goods
      },
      handleSizeChange(newSize){
          this.queryInfo.pagesize = newSize
          this.getOrderList()
      },
      handleCurrentChange(newPage){
          this.queryInfo.pagenum = newPage
          trhis.getOrderList()
      }
  },
};
</script>

<style lang="less" scoped>
</style>