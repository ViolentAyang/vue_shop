import Vue from 'vue'
import { Button } from 'element-ui'
import { Form,FormItem } from 'element-ui'
import { Input } from 'element-ui'
//导入弹窗提示组件
import { Message } from 'element-ui'
//Home页面布局需要导入的组件
import {Container,Header,Aside,Main} from 'element-ui'
//导入菜单组件
import { Menu,Submenu,MenuItemGroup,MenuItem} from 'element-ui'
//导入面包屑组件
import {Breadcrumb,BreadcrumbItem} from 'element-ui'
//导入卡片视图
import {Card} from 'element-ui'
//导入分隔布局
import {Row,Col} from 'element-ui'
//导入Table表格需要的组件 
import {Table,TableColumn} from 'element-ui'
//导入switch开关组件
import {Switch} from 'element-ui'
//导入按钮提示文字组件
import {Tooltip} from 'element-ui'
//导入分页组件
import {Pagination} from 'element-ui'
//导入对话框组件
import {Dialog} from 'element-ui'
//导入弹框组件
import { MessageBox } from 'element-ui'
//导入tag标签
import {Tag} from 'element-ui'
//导入树形控件
import {Tree} from 'element-ui'
//导入select选择器
import {Option,Select} from 'element-ui'
//导入级联选择器
import {Cascader} from 'element-ui'
//导入警示组件
import {Alert} from 'element-ui'
//导入标签页组件
import {Tabs,TabPane} from 'element-ui' 




Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Option)
Vue.use(Select)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)




//弹窗组件必须全局挂载,每一个组件可以通过this访问$message
Vue.prototype.$message = Message
//弹框组件也必须全局挂载
Vue.prototype.$confirm = MessageBox.confirm