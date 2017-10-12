

### 命令使用
1. npm run clean 删除dist目录
2. npm run watch 开发时候使用
3. npm run build 测试打包的时候使用
4. npm run publish 发布的时候使用（不使用cdn）
5. npm run cdnpublish 发布的时候使用，会先打包并将静态资源post到cdn，


### 备注
1. TIDL填写页2017/8/28,改版全面使用了webpack2打包工具。
2. 页面还是 直接迁移过来的，未做优化

### 目录结构
```
license
+static
    + dist
     +js
     ...
     + src
      +js
      +scss
      +page
        index.html
        ...
 ```


