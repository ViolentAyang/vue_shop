<template>
  <div class="welcome">
    <h2>Welcome</h2>
    <h3>欢迎登录到电商后台管理系统!</h3>
    <div class="info">
      <h4>以前的小东西 :</h4>
      <ul>
        <li>
          <a href="http://www.violentayang.site/" target="_blank">个人博客项目</a
          ><span>根据该项目模式模仿的项目</span>
        </li>
        <li>
          <a
            href="https://violentayang.blog.csdn.net/"
            target="_blank"
            >博客</a
          ><span>CSDN博客 在学习时写的一些笔记</span>
        </li>
        <li>
          <a href="https://github.com/ViolentAyang" target="_blank">Github</a
          ><span>Github 项目文件等存放的地方 -- 国外</span>
        </li>
        <li>
          <a href="https://gitee.com/violent-ayang" target="_blank">Gitte</a
          ><span>Gitte 项目文件等存放的地方 -- 国内</span>
        </li>
        <li><hr /></li>
        <li>
          <a href="https://www.violentayang.site/ViolentAyangMusic/" target="_blank">自作网站</a
          ><span>自写的一个音乐播放网站</span>
        </li>
        <li>
          <a href="https://www.violentayang.site/Resume/" target="_blank">个人简历网站</a
          ><span
            >类似购物网站<a
              href="https://linjiarui.net/"
              >参考网站</a
            ></span
          >
        </li>
      </ul>
    </div>
    <address>纯自娱练习用</address>
  </div>
</template>

<script>
export default {
  name: 'Welcome'
}
</script>

<style lang="less" scoped>
.welcome {
  background-color: cadetblue;
  font-size: 20px;
  text-align: center;
  color: pink;
  h3 {
    margin: 0 auto 0;
    font-size: 30px;
  }
  .info {
    margin: 5px 0 10px;
    ul {
      margin: 5px 0 0 150px;
      li {
        margin: 5px 0 50px;
        text-align: left;
        margin: 8px;
        color: black;
        a {
          text-align: center;
          display: inline-block;
          padding: 5px;
          font-size: 18px;
          border: 3px solid pink;
        }
        a:hover {
          color: pink;
          background-color: green;
        }
        span {
          width: 100%;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>