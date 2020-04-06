# 基于uniapp实现聊天程序
## 目前实现功能
- 登录注册
- 添加好友/群
- 加入群
- 单聊
- 群聊
- 退出
- 上传头像



## 使用说明
首次使用
```
1.修改 App.vue 中 ws 和 url 信息
```

## 服务端
```
https://github.com/ltsj404/IM.git
```​	

​	
<!-- 
or create a new repository on the command line

```bash
echo "# chat-im" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/ltsj404/chat-im.git
git push -u origin master
                
```

### or push an existing repository from the command line

```bash
git remote add origin https://github.com/ltsj404/chat-im.git
git push -u origin master
```


 -->
​	

### Nginx 
```bash
[配置 Nginx 反向代理 WebSocket](https://www.hi-linux.com/posts/42176.html)
```



#### 查看所有8088端口

`netstat -ntulp | grep 8088`

### Linux

 nohup ./main & 


```
 nohup ./main & 
```



#  			 [linux查看端口状态相关命令](https://www.cnblogs.com/cxbhakim/p/9353383.html)  		



**netstat**

netstat 命令应用是比较频繁的，比如查看端口占用啦，查看端口进程啦，这些时候都是有必要的。

**netstat命令各个参数说明如下**：

　　-t : 指明显示TCP端口

　　-u : 指明显示UDP端口

　　-l : 仅显示监听套接字(所谓套接字就是使应用程序能够读写与收发通讯协议(protocol)与资料的程序)

　　-p : 显示进程标识符和程序名称，每一个套接字/端口都属于一个程序。

　　-n : 不进行DNS轮询，显示IP(可以加速操作)

举栗子：

- 查看所有TCP端口

  

- 查看所有8088端口 

  

- 查看服务器上所有的服务跟端口 

  

- 查看某服务占用的端口情况，比如：nginx 

  

  　　

- 查看指定端口的连接数量，比如：80 

  

  　　

**lsof**

lsof 可以用来查看指定端口所运行的程序，当前netstat也是可以的，只是这个更清晰一点。

```
`[root@hserver1 ~]``# lsof -i :8088``COMMAND     PID USER   FD   TYPE     DEVICE SIZE``/OFF` `NODE NAME``wstack-me 23147 root    9u  IPv6 3282730103      0t0  TCP *:radan-http (LISTEN)`
```

　　

**ps**

ps 是LINUX下最常用的也是非常强大的进程查看命令

下面对命令选项进行说明：
　　　　-e 显示所有进程。
　　　　-f 全格式。

举栗子：

- ps e 列出程序时，显示每个程序所使用的环境变量。

- ps f 用ASCII字符显示树状结构，表达程序间的相互关系

- 查看某进程是否存在 

  

当然，加上f会看到很多信息，会比较乱，有时候也可以直接：

```
`[root@hserver1 ~]``# ps -e | grep nginx`` ``4504 ?        00:00:00 nginx`` ``4505 ?        00:00:00 nginx`
```

　　