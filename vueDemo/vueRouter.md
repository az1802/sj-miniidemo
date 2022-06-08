## VueRouter







### TODO





![image-20220603154132652](/Users/m1pro/Desktop/mine/sj-miniidemo/vueDemo/vueRouter.assets/image-20220603154132652.png)







### createRoutes

* History:url,hash,memory
* linkActiveClass:激活router-link的默认类(router-link-active)
* linkExactActiveClass:精准激活router-link类的class(router-link-exact-active)
* routes
* stringifyQuery:对查询对象进行字符串化的自定义显示
* parseQuery,自定义解析路由参数方法
* scrollBehavior  页面之间导航时控制滚动参数
* 





### router-link

* to 路径跳转的地址

  ```html
  <!-- 字符串 -->
  <router-link to="/home">Home</router-link>
  <!-- 渲染结果 -->
  <a href="/home">Home</a>
  
  <!-- 使用 v-bind 的 JS 表达式 -->
  <router-link :to="'/home'">Home</router-link>
  
  <!-- 同上 -->
  <router-link :to="{ path: '/home' }">Home</router-link>
  
  <!-- 命名的路由 -->
  <router-link :to="{ name: 'user', params: { userId: '123' }}">User</router-link>
  
  <!-- 带查询参数，下面的结果为 `/register?plan=private` -->
  <router-link :to="{ path: '/register', query: { plan: 'private' }}">
    Register
  </router-link>
  ```

  

* replace(boolean) 替换前路径

* active-class  路径匹配时的class 

* custom 使用v-slot创建自定义routerLink



### 路由匹配

