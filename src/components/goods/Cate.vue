<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区-->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog"
            >添加分类</el-button
          >
        </el-col>
      </el-row>
      <!--表格-->
      <tree-table
        class="treeTable"
        :show-row-hover="false"
        border
        show-index
        :expand-type="false"
        :selection-type="false"
        :data="catelist"
        :columns="columns"
      >
        <!--是否有效-->
        <template slot="isok" slot-scope="scope">
          <i
            style="color: lightgreen"
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
          ></i>
          <i style="color: red" class="el-icon-error" v-else></i>
        </template>
        <!--排序-->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag
            size="mini"
            v-else-if="scope.row.cat_level === 1"
            type="success"
            >二级</el-tag
          >
          <el-tag size="mini" v-else type="warning">三级</el-tag>
        </template>

        <!--操作-->
        <template slot="opt" slot-scope="scope">
          <el-button @click="showeditCateDialog(scope.row)" size="mini" type="primary" icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button @click="removeCate(scope.row.cat_id)" size="mini" type="danger" icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </tree-table>

      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!--添加分类的对话框-->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateDialogClosed"
    >
      <!--添加分类的表单-->
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <!--级联选择框-->
          <!--options用来指定数据源-->
        <!--props用来指定配置对象-->
        <el-cascader
          :props="cascaderProps"
          v-model="selectedKeys"
          :options="parentCateList"
          expand-trigger="hover"
          @change="parentCateChanged"
          clearable
          change-on-select
        ></el-cascader>

        </el-form-item>
        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate"
          >确 定</el-button
        >
      </span>
    </el-dialog>
     <!-- 编辑分类信息 -->
    <el-dialog title="修改分类" :visible.sync="editCateDialogVisbel" width="50%">
      <el-form :model="editCate" :rules="editCateRules" ref="editCateRef" label-width="100px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editCate.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCateDialogVisbel = false">取 消</el-button>
        <el-button type="primary" @click="editCateInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //查询条件保存
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 10,
      },
      //商品分类的数据列表
      catelist: [],
      //总数据条数
      total: 0,
      //为table指定列的定义
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          //表示将当前列定义为模板列
          type: "template",
          //表示当前这一列使用的模板名称
          template: "isok",
        },
        {
          label: "排序",
          //表示将当前列定义为模板列
          type: "template",
          //表示当前这一列使用的模板名称
          template: "order",
        },
        {
          label: "操作",
          //表示将当前列定义为模板列
          type: "template",
          //表示当前这一列使用的模板名称
          template: "opt",
        },
      ],
      //控制添加分类的对话框单显示与隐藏
      addCateDialogVisible: false,
      //添加分类的表单数据对象
      addCateForm: {
        //将要添加的分类的名称
        cat_name: "",
        //父级分类的id
        cat_pid: 0,
        //当前默认要添加的分类是1级
        cat_level: 0,
      },
      //添加分类表单的验证规则对象
      addCateFormRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      //这是父级分类的列表
      parentCateList: [],
      //指定级联选择器的配置对象
      cascaderProps: {
          value: 'cat_id',
          label: 'cat_name',
          children: 'children'
      },
      //选中的父级分类的id数组
      selectedKeys: [],
       // 编辑对话框的显示和隐藏
      editCateDialogVisbel: false,
      editCate: {},
      editCateRules: {
        cat_name: [{ required: true, message: '请输入要修改的信息', trigger: 'blur' }]
      },
      editCateId: ''
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    //获取商品分类数据
    async getCateList() {
      const { data: res } = await this.$http.get("categories", {
        params: this.queryInfo,
      });
      if (res.meta.status != 200) {
        return this.$message.error("获取商品分类失败！ ");
      }
      //把数据列表，赋值给catalist
      this.catelist = res.data.result;
      //为总数据条数赋值
      this.total = res.data.total;
    },
    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getCateList();
    },
    //监听pagenum的改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getCateList();
    },
    //点击按钮，展示添加分类对话框的显示与隐藏
    showAddCateDialog() {
      //先获取父级分类的数据列表
      this.getParentCateList();
      //再展示出对话框
      this.addCateDialogVisible = true;
    },
    //获取父级分类的数据列表
    async getParentCateList() {
      const { data: res } = await this.$http.get("categories", {
        params: { type: 2 },
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取父级分类数据失败!");
      }
      this.parentCateList = res.data;
    },
     // 选择项发生变化触发这个函数
    parentCateChanged() {
      console.log(this.selectedKeys)
      // 如果 selectedKeys 数组中的 length 大于0，证明选中的父级分类
      // 反之，就说明没有选中任何父级分类
      if (this.selectedKeys.length > 0) {
        // 父级分类的Id
        this.addCateForm.cat_pid = this.selectedKeys[
          this.selectedKeys.length - 1
        ]
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = this.selectedKeys.length
        return
      } else {
        // 父级分类的Id
        this.addCateForm.cat_pid = 0
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = 0
      }
    },
    //点击按钮,添加新的分类
    addCate(){
        this.$refs.addCateFormRef.validate(async valid =>{
            if(!valid) return 
            const {data:res} = await this.$http.post('categories',this.addCateForm)
            if(res.meta.status!==201){
                return this.$message.error('添加分类失败!')
            }
            this.$message.success('添加分类成功')
            this.getCateList()
            this.addCateDialogVisible = false
        })
    },
    //监听对话框的关闭事件，重置表单数据
    addCateDialogClosed(){
        this.$refs.addCateFormRef.resetFields()
        //清空级联选择器里的内容
        this.selectedKeys = []
        this.addCateForm.cat_pid = 0
        this.addCateForm.cat_level = 0
    },
    async showeditCateDialog(cateInfo) {
      this.editCateId = cateInfo.cat_id
      const { data: res } = await this.$http.get('categories/' + cateInfo.cat_id)
      this.editCate = res.data
      console.log(this.editCate)
      // console.log(res.data)
      this.editCateDialogVisbel = true
    },
    // 编辑分类信息
    async editCateInfo() {
      const { data: res } = await this.$http.put('categories/' + this.editCate.cat_id, { cat_name: this.editCate.cat_name })
      if (res.meta.status !== 200) {
        return this.$message.error('更新分类数据失败!')
      }
      this.$message.success('更新分类数据成功!')
      this.getCateList()
      this.editCateDialogVisbel = false
      // console.log(res)
    },
    // 删除分类
    async removeCate(id) {
      const confirRustle = await this.$confirm('此操作将永久删除该文件, 是否继续?', '删除分类', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirRustle !== 'confirm') {
        return this.$message.info('已取消删除操作!')
      }

      const { data: res } = await this.$http.delete('categories/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('分类删除失败!')
      }
      this.$message.success('该分类已经成功删除!')
      this.getCateList()
    }
  },
};
</script>

<style lang="less" scoped>
.treeTable {
  margin-top: 15px;
}
</style>