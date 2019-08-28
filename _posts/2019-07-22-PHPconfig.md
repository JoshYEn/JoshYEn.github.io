---
title: PHP开发环境配置 on macOS
layout: post
date: 2019-07-22 17:46
categories: coding
---

最近在帮 Saied 做 macro economics impact 的工作，将已有的模型用 `PHP` 实现。这其实是 Mehdi 实习工作的一部分，Saied 请他具现了一个小模型，用于分析在外部投资的冲击下，整体宏观经济的变化和响应。说实话，我之前没怎么想过和见过 web 能这么用。但是想想，由于 Saied 本身要组织很多会议；用 web 小游戏的方式协调组织者与参会人员的 brainstorm，总比传统 PPT 来的更加直接；加之现在智能手机又早已这样普及… 所以开发网页其实是非常好的一种做法，无论是TM、CM还是WS，都能有效的传达他想表达的意思，还可以活跃气氛。不过 Saied 为了方便，将网页托管在了域名服务商那里，而且一般都有CDN，所以无论在哪个国家访问应该都还蛮快的。缺点就是，没有办法获得很高的权限。像这次的 project，由于不想把模型写在前端 JS，就只能选择用PHP开发。。。（其实我该问问 Saied 有没有 node 主机…）

言归正传，记录一下 PHP 环境的配置。在 macOS 上，常见的 AMP（Apache + Mysql + PHP）环境有如下几种配置方式：

- Local web server
  - macOS 自带的 Apache
  - Homebrew 安装 PHP
- Docker
- MAMP



# Install local web server

> 这部分内容源于：[macOS 10.14 Mojave Apache Setup: Multiple PHP Versions](https://getgrav.org/blog/macos-mojave-apache-multiple-php-versions)。

由于 macOS 自带的 Apache 服务少了一些脚本，所以最好从 Homebrew 重新安装。

首先停止自带的 Apache 服务

```shell
sudo apachectl stop
sudo launchctl unload -w /System/Library/LaunchDaemons/org.apache.httpd.plist 2>/dev/null
```

安装 httpd，设置自动启动

```shell
brew install httpd
sudo brew services start httpd
```

修改 Apache 的配置： `/usr/local/etc/httpd/httpd.conf`

```properties
# 监听端口
Listen 80

# 网页根目录
DocumentRoot "/usr/local/var/www"
  <Directory /Users/your_user/Sites>
# AllowOverride controls what directives may be placed in .htaccess files.
# It can be "All", "None", or any combination of the keywords:
#   AllowOverride FileInfo AuthConfig Limit
AllowOverride All
LoadModule rewrite_module lib/httpd/modules/mod_rewrite.so

ServerName localhost
  
# PHP
LoadModule php7_module /usr/local/opt/php@7.3/lib/httpd/modules/libphp7.so
```

最后重启 Apache 服务即可。至此Web Server设置完毕，访问`http://localhost`会显示index网页。

#### Several Apache Commands

```shell
sudo apachectl start
sudo apachectl stop
sudo apachectl -k restart
```



# Install PHP

使用 Homebrew 安装 PHP

```shell
brew install php

# or specify version
brew install php@5.6
brew install php@7.0
brew install php@7.1
brew install php@7.2
brew install php@7.3
```

修改 PHP 配置文件：`/usr/local/etc/php/7.3/php.ini`

```ini
# PHP
LoadModule php7_module /usr/local/opt/php@7.3/lib/httpd/modules/libphp7.so

# 默认网页
<IfModule dir_module>
    DirectoryIndex index.php index.html
</IfModule>
```

重启 Apache 服务即可启用 PHP。

接下来验证 PHP 是否安装成功，终端创建`info.php`文件：

```shell
echo "<?php phpinfo();" > /path/to/site/info.php
```

访问 [http://localhost/info.php](http://localhost/info.php) 即可查看 PHP 的配置。

[原文](https://getgrav.org/blog/macos-mojave-apache-multiple-php-versions)还有部分内容关于多版本 PHP 共存、版本切换脚本，暂时不需要就没有放在这里。



# PHP debug extension: XDebug

[官方文档](https://xdebug.org/docs/install)介绍的很清楚。macOS 下可以使用 Homebrew & PECL 安装，也可以直接编译源代码。



## 编译源码

首先要确定需要使用的 XDebug 版本，访问[XDebug installation wizard](https://xdebug.org/wizard.php)，拷贝`php -i`输出的内容，或者拷贝`phpinfo()`网页就可分析当前的 PHP 环境以及适用的版本。

下载对应的源码，解压缩，配置并编译：

```shell
tar -xzf xdebug-2.7.2.tgz && cd xdebug-2.7.2
phpize
./configure --enable-xdebug
make
make install
```

在 PHP 脚本中，设置 XDebug 的路径，并设置远程 Debug（默认 9000 端口）

```ini
zend_extension=path/to/xdebug

# Remote Debuging
[XDebug]
xdebug.remote_enable = 1
xdebug.remote_autostart = 1
```



# IDE

## VS Code

- [PHP Debug 插件](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug)
- [PHP IntelliSense 插件](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-intellisense)

日后可能还要配置 Composer，再说了。。。



## PHPStorm

正在研究，其实 VS Code 已经够用了。



---

##### 日常吐槽

今天香水喷的多啊。。。



