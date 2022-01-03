<template>
  <el-container>
    <!--头部区域-->
    <el-header>
        <div>
            <img class="img_ayang" src="../assets/Ayang.png" alt="">
            <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--页面主题区-->
    <el-container>
      <!--侧边栏-->
      <!--给aside加上动态数据绑定 折叠时候要变小-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
           <div class="toggle-button" @click="toggleCollapse">|||</div>
           <!--侧边栏菜单区--> 
            <el-menu unique-opened :collapse="isCollapse" :collapse-transition="false" background-color="#333744" text-color="#fff"
             active-text-color="#409BFF" :router="true" :default-active="activePath">
             <!--一级菜单-->
             <!--给index动态绑定id，用for循环展示后端传输的一级菜单-->
             <!--item.id是数值应该加个空字符串这样就不会报错了-->
             <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
                 <!--一级菜单模板区-->
              <template slot="title">
                <!--图标-->
                <i :class="iconsObj[item.id]"></i>
                <!--文本-->
                <span>{{item.authName}}</span>
             </template>
        
             <!--二级菜单-->
             <el-menu-item :index="'/'+subItem.path" 
             v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/'+subItem.path)">
                 <template slot="title">
                <!--图标-->
                <i class="el-icon-menu"></i>
                <!--文本-->
                <span>{{subItem.authName}}</span>
             </template>
             </el-menu-item>
             </el-submenu>
            </el-menu>
      </el-aside>
      <!--右侧内容主题区-->
      <el-main>
          <!--路由占位符-->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
      return {
          //左侧菜单数据
          menulist: [],
          iconsObj: {
              '125': 'el-icon-user',
              '103': 'el-icon-s-management',
              '101': 'el-icon-goods',
              '102': 'el-icon-s-order',
              '145': 'el-icon-data-line'
          },
          //是否折叠
          isCollapse: false,
          //被激活的链接地址
          activePath: ''
      }
  },
  //一进入主页就执行这个生命周期函数
  created(){
      this.getMenuList()
      this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      //清空token
      window.sessionStorage.clear();
      //跳转到新页面
      this.$router.push("/login");
    },
    //获取所有菜单
    async getMenuList(){
        const { data: res } = await this.$http.get('menus')
        if(res.meta.status!=200) return this.$message.error(res.meta.msg)
        this.menulist = res.data
        console.log(res)
    },
    //点击按钮切换菜单折叠与展开
    toggleCollapse(){
        this.isCollapse = !this.isCollapse
    },
    //保存链接的激活状态
    saveNavState(activePath){
        window.sessionStorage.setItem('activePath',activePath)
        this.activePath = activePath
    }
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  //左右贴边对齐
  justify-content: space-between;
  //把header的左边内边距设为0，让图片贴边
  padding-left: 0;
  //让退出按钮居中
  align-items: center;
  //把文本变成白色
  color: #fff;
  //字体大小
  font-size: 20px;
  //给左侧div再加布局，让居中
  > div {
    display: flex;
    //纵向居中
    align-items: center;
    //文本和图片加间距
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  //清除右侧边框线，消除右侧对不齐的问题
  .el-menu{
      border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont{
    margin-left: 12px;
}
.toggle-button{
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    //给三个竖线之间加点间距
    letter-spacing: 0.2em;
    cursor: pointer; //鼠标变手势
}
.img_ayang {
  height: 56px;
  width: 57px;
}
</style>