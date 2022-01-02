<!--结构-->
<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像区域-->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!--登录表单区域-->
      <!--model数据绑定对象 label-width占位符 给输入框左边的文字站位，不需要设置为0-->
      <!--loginFormRef是表单的实例对象，用于重置表单-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginForm_rule" label-width="0px" class="login_form">
        <!--用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <!--按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <!--@click绑定重置的单击事件-->
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<!--行为-->
<script>
export default {
    data(){
        return {
            //这是登录表单的数据绑定对象
            loginForm: {
                username: 'admin',
                password: '123456'
            },
            //这是表单的验证规则对象
            loginForm_rule: {
                //验证用户名是否合法
                username: [
                    { required: true, message: '请输入登录名称', trigger: 'blur' },
                    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                    ],
                //验证密码是否合法
                password: [
                 { required: true, message: '请输入登录密码', trigger: 'blur' },
                 { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        // 点击重置按钮，重置登录表单
        resetLoginForm() {
            this.$refs.loginFormRef.resetFields();
        },
        //表单登录前预验证
        login() {
          //async异步封装promise对象，其中await必须写在async里
            this.$refs.loginFormRef.validate(async valid => {
                //判断验证结果是否可以发起请求
                if(!valid) return;
                //axios返回的数据会加壳。需要解构赋值
                const {data: res} = await this.$http.post('login', this.loginForm);
                if(res.meta.status!=200) return this.$message.error('登陆失败!')
                this.$message.success('登陆成功!')
                //1.将登录成功之后的token，保存到客户端的 sessionStorage中
                // 1.1 项目中除了登录之外的其他api接口，必须在登陆之后才能访问
                // 1.2 token只在当前网站打开期间生效，所以把token保存在sessionStorage中
                window.sessionStorage.setItem('token', res.data.token)
                //2. 通过编程式导航调到后台主页，路由地址是/home
                this.$router.push('/home')
            });
        }
    }
};
</script>

<!--样式-->
<!-- lang 支持less 语法 scoped 控制组件样式生效区间，没有scoped全局生效-->
<style lang="less" scoped>
.login_container {
  height: 100%;
}
//登录框
.login_box {
  width: 450px;
  height: 300px;
  background-color: rgb(19, 16, 16);
  border-radius: 3px; //圆角边框
  //居中
  position: absolute; //绝对定位
  left: 50%; //以左顶点为原点水平向右移
  top: 50%; //以左顶点为原点垂直向下移动
  transform: translate(
    -50%,
    -50%
  ); //因为以左顶点为原点会偏，用translate补偿差值，即为自身一半
  opacity: 0.8;
  //less语法嵌套
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%; //圆角边框线
    padding: 10px; //让图片和边框之间有点间距
    position: relative;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px #ddd; //加阴影
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%; //图片和边框一起圆角化
      background-color: #eee;
    }
  }
}

.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 40px;
    box-sizing: border-box;//盒子模型解决右边框溢出
}

.btns{
    display: flex;//弹性布局
    justify-content: flex-end;//用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式,end从行尾开始排列
}
</style>