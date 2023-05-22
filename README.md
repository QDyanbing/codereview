# 整体的目录划分如下

1. services 目录下存放的是所有接口的定义
-文件夹命名根据后端的功能做划分
  --文件夹下的文件，根据页面做划分
    ---文件下方法以get（获取数据）/set（提交数据）开头+模块名称+操作（create，modify，delete，detail，online）；

2. pages 目录下存放各个page
-文件夹根据对应的页面命名
  --components
    一个页面的逻辑会很多如果都放在一个页面下，但文件很容易超过几千行，多一把页面按块拆分；
  --models
    本页面所用到的全部数据，一个功能一个model
  
# 目前所遇到的问题

1. umi国际化useModel里面拿不到useIntl的实例，所以models里面的国际化很难处理；
  问过umi的人，他们好像是不建议models里有文案；
  所以我不清楚，要不要把请求放在models里，因为如果放在里面至少会有操作成功，操作失败这样的文案（比如useDelete）
  如果只是把文案提出去models里可能没剩下啥了；
  所以数据管理到底是做什么的，把数据放在页面中和放在useModel中有啥区别，不用行不行；用了有什么好处；

2. DataSetOld，useDataSetOld是我之前处理新增和修改的方式
把form放在model里面会警告Warning: Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?

3. 可以看下我的目录结构，看看哪里需要调整下
