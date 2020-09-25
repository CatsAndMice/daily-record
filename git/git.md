# git

> git是分布式版本控制系统

**作用：**管理不同版本，回退到任何时刻



**操作：**

配置用户名

`git config --global name 你的名字`

配置邮箱

`git config --global email 邮箱 `

查看配置
     `git config --list`
     `git config user.name`
    ` git config user.email`



**初始化仓库**

`git init`初始化仓库并产生.git文件

**向暂存区添加文件**

`git add 文件名`，或`git add .`

**查看当前文件状态**

`git status`    `git add .`会使文件变绿

**提交此次变更**

`git commit -m <message> `提交此次变更。
提交变更会有对应的日志生成



git log 可以查看提交日记，什么人什么时间提交了commit



**撤销工作区修改**

`git checkout -- <file>`



* **分支**

`git checkout -b` 分支名称 模板分支/commit
`git checkout` 分支名 用于切换分支
`git branch` 用于查看分支， 高亮词条代表当前分支
`git branch a `创建新分支a



**推送到远程仓库**

git clone 克隆代码

git push 推送分支到远程

git pull   从远程拉取代码



## git错误总结

![image-20200513161733227](D:\编辑器\Typora\markdown\git\image-20200513161733227.png)

每次在进行推送文件时，会报这种错。

**原因是**：

远程文件中在README.md,与此次推送的文件会冲突。

**解决：** 

1. 在推送前输入命令`git pull --rebase origin master`重新将远程中的文件拉取下来，最后在进行推送:`git push origin master`

2. 强制推送`git push -u origin master -f`，该方式会将远程已经存在的文件给覆盖掉。这是很麻烦的。



git push origin master