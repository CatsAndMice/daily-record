手动删除mysql
`C:\Program Files\MySQL`
`C:\Program Files (x86)\MySQL`

* sql,DB,DBMS
DB:DataBase(数据库，数据库实际上在硬盘上以文件的形式存在)
DBMS:数据库管理系统，常见有：mysql,oracle..
SQL：语言，sql语句的编译由DBMS完成

DBMS-(执行)->sql-(操作)->DB

* 什么是表
>表：table是数据库基本组成单元，所有的数据都以表格组织，目的是可读性强
一个表包括行和列

* sql语句分类
DQL(查询语句)：查询语句，  

DML(操作..)：insert delete update 对表中的数据进行增删改  

DDL(定义..):create drop alter 对表结构的增删改  

TCT(控制..):commit提交事务  rollback回滚事务  

DCL(控制..):grant授权，revoke撤销权限

* 引入数据 
>在`C:\Windows\ASUS\sqldata.sql`有一个.sql文件。这样的文件称为`spl脚本`
1. cmd:`mysql -uroot -p123456` 
2. 查看数据库:`show databases ;`
3. 创建自己的数据库`create database xx ;`
4. 使用数据库`use xx ;`
5. 查看当前数据库中有哪些表`show table ;`
6. 初始化数据 `source C:\Windows\ASUS\sqldata.sql ;`  

**注意：** 直接使用`source`命令可以执行sql脚本。sql脚本数据量太大的时候，记事本无法打开，要用`source`引入  


## mysql基本命令  

show databases;展示所有数据库  

use dataname;切换到某个数据库

use tables;展示某个数据仓库中所有的表  
mysql> show tables ;  

+----------------+  

| Tables_in_myqq |  

+----------------+  

| dept           |  

| emp            |  

| salgrade       |  

+----------------+  

desc dept;查看表中的结构   (dept表示某个表称)



## sql语句
select job from dept;查询在dept表中job字段数据

select grade from salgrade where grade>4;条件查询

select grade*2 as grades from salgrade where grade>4; `as`重命名，能进行数字运算  

select grarde from salgrade where grade is null;查询grade是`null`的数据  

**注意：** 在sql中`null`表示为空，没有值。

找出工作岗位是'MANAGER'和'SALESMAN'的员工：  

> select ename,job from emp where job='MANAGER' or job = 'SALESMAN';

and的优先级比or更高
and和or联合起来用：找出薪资大于1000的并且部门编号是20或30部门的员工。
> select ename,sal,deptno from emp where sal>1000 and deptno = 20 or deptno = 30;  //错误的

>select ename,sal,deptno from emp where sal>1000 and (deptno = 20 or deptno = 30);//正确的

* in等同于or:找出工作岗位是MANAGER或SALESMAN的员工
> select ename ,job from emp where job='MANAGER' or job = 'SALESMAN'

> select ename ,job from emp where job in('MANAGER','SALESMAN')

in(a,b);a,b不是区间  

not in(a,b);不是a,b的数据 

* 模糊查询like?  
找出名字当中含有o的(模糊查询中的符号，一个是%，一个是_)  
``` %代表任意多个字符，_代表一个字符 ```  
找出名字中第二个字母是A的？  
> select ename from where ename like('_A%');  
找出名字中含有下划线的？  
> select ename from where ename like('%\_%');  

* 排序(升序，降序) order by
> select ename,sal from emp order by sal;//升序  

> select ename,sal from emp order by asc;//降序

>select ename,sal from emp order by desc;//降序  

**注意：** 默认是升序  

按照工资的降序排序，当工资相同的时候在按名字的升序排列  
> select ename ,sal from emp order by sal desc;

> select ename,sal from emp order by sal desc,ename asc; //越靠前的字段能起主导作用，只有靠前字段没用时，后面字段才起作用(前面相同时，后面才起作用)

>select ename,sal from emp order by 2; //以第二列排序



select 
   *          3
from 
    tablename 1
where
    条件       2
order by 
    ...        4
`order by 是最后执行的`  

* 分组函数 
count 计数  
sum 求和  
avg 平均值  
max 最大值  
min  ...  

所有分组函数都是对”某一组“

**注意：** 分组函数自动忽略null，
null与其他类型的数据进行操作，都是null  

ifnull() 空处理函数？  
ifnull(可能为null的数据，0) //如果数据为null，用0代替  

> select ename,ifnull(comm,0) as comm from emp   

> select sum(comm) from emp where comm is not null; //不需要额外添加这个过滤条件，sum函数自动过滤null


**sql语句当中有一个语法规则，分组函数不能直接使where条件后**  why?  

原因：group by 是在where后面执行,还没有分组不能使用分组函数。  
select  5  
    ...   
from    1  
...   
where 2  
...  
group by 3  
...
having   4  
..  
order by 6  
...





count(*), 不是统计某个字段不为null的数量，而是统计总记录条数  

count(具体字段) 该字段不为null的数量  

* group by 和 having  
group by: 按照某个字段或者某些字段进行分组  
having:对分组之后的数据进行再次过滤  
 
 找出每个工作岗位的最高薪资  
 >select max(job) from emp group by job;//在job中相同的分为一组  

 **注意：** 分组函数一般与group by一起使用，分组函数在group by 执行后执行。当一条sql语句没有group by的话，整张表的数据会算成一组。  

 找出高于平均工资的员工  
 > select ename ,sal from emp where sal> (select avg(sal) from emp );  

 > select ename ,max(sal) ,job from emp group by job; //一条语句中有group by 时，select 后面只能出现分组函数和参与分组的字段   

 多个字段联合一块分组？  
 找出每个部门不同工作岗位的最高薪资  
 > select depton,job,max(sal) from emp group by deptno,job;  


 * where与having选择    
 找出每个部门最高薪资，要求显示薪资大于2900的数据   
 > select max(sal),deptno from emp group by having max(sal) > 2900;//效率低  
可以用where先判断
 >select max(sal),deptno from emp where sal > 2900 group by deptno;  

 建议：能用where就用where  

 找出每个部门平均薪资，要显示的薪资大于2000的数据 。  
 >select deptno , avg(sal) from emp group by deptno having avg(sal) > 2000;


* 总结一个完整的DQL语句顺序   
select  5
...  
from    1
....  
where   2
...  
group by   3 
..  
having   4
..  
order by    6
... 
   

* 去重  
>select job from emp ; //出现相同的工作岗位  

去重  
>select distinct job from emp ; //distinct关键字去除重复记录  

>select ename, distinct job from emp ; //错误  
**记住：** `distinct`只能出现在所有字段的最前面。  


> select distinct deptno,job from emp; //联合去重，depton,job数据组合在一起后，有重复的才去除  

案例：得出job数据   
> select count(distinct job) from emp ;   


## 嵌套  
在select后面嵌套子查询  
案例：找出每个员工所在部分，要求显示员工名和部门名。  
> select e.name ,d.dname from emp e join dept d on e.deptno = d.deptno;   

另外写法：  
> select e.ename,(select d.dname from dept d where e.deptno = deptno) as dname from emp e;





