# alex.cheng


#### 下载最新版 node.js,mongodb

#### npm install

#### 全局安装 supervisor：
``` npm i -g supervisor ```

#### 全局安装typescript
``` npm i -g typescript ```

#### supervisor 会监听当前目录下 node 和 js 后缀的文件，当这些文件发生改动时，supervisor 会自动重启程序。

#### 开启mongodb数据库
``` cmd => mongod ```

#### 在命令行窗口进行数据库调试
```
- 连接数据库 mongo
- 查看所有数据库集合 show dbs
- 切换到需要操作的数据库集合 use ***
- 查看当前集合下的所有文档 show collections
- 查找文档中所有的数据 db.***.find({})
- 删除文档中的数据 db.***.deleteOne(query, fn) 或者db.***.deleteMany({}, fn)\
- ...

```

#### npm start

