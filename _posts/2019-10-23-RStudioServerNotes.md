---
layout: post
title: "R Studio Server + HTTPS enabled"
date: 2019-10-23 14:37:00 +0200
categories: web
---

最近尝试了 AWS 的 Spot request，跟普通的同配置 EC2 比起来价格下降了巨多，所以也能 afford 一下高配置的虚拟机。2 Core & 2G RAM 足够跑一跑 `R Studio Server`，月付 5 刀，堪堪跟 1C & 1G RAM 的小鸡持平，性价比就起来了。跑代码的速度比免费的 R Studio Cloud 要快一些，但缺点也不是完全没有，于是画风一转，就开始研究 Nginx 反代 + TLS Encrypt。。。



> 参考内容：
>
> - Nginx official: [Nginx Beginner’s Guide](https://nginx.org/en/docs/beginners_guide.html)
>
> - RStudio doc: [Running RStudio Server with a Proxy](https://support.rstudio.com/hc/en-us/articles/200552326-Running-RStudio-Server-with-a-Proxy)
> - Linode doc: [How to Deploy RStudio Server Using an NGINX Reverse Proxy](https://www.linode.com/docs/development/r/how-to-deploy-rstudio-server-using-an-nginx-reverse-proxy/)
> - Blog: [Configure Nginx as a reverse proxy for Rstudio server](https://ttdtrang.tk/2019/04/configure-nginx-as-a-reverse-proxy-for-rstudio-server/)

---

## [Nginx Beginner’s Guide](https://nginx.org/en/docs/beginners_guide.html)

**配置文件位置：**

> The way nginx and its modules work is determined in the configuration file. By default, the configuration file is named `nginx.conf` and placed in the directory `/usr/local/nginx/conf`, `/etc/nginx`, or `/usr/local/etc/nginx`.

**Nginx 基本指令：**

```shell
nginx -s stop # fast shutdown
nginx -s quit # graceful shutdown
nginx -s reload # reloading the configuration file
nginx -s reopen # reopening the log files
```

---

## R Studio Official Support: [Running RStudio Server with a Proxy](https://support.rstudio.com/hc/en-us/articles/200552326-Running-RStudio-Server-with-a-Proxy)

配置 R Studio Server 的反向代理，将 `8787` 端口代理到 `80 ` 端口。两个配置示例的域名分别是：

- http://your.domain.name/
- http://your.domain.name/rstudio/



To enable an instance of Nginx running on the same server to act as a front-end proxy to RStudio Server you would add commands like the following to your `nginx.conf` file. Note that you must add code to proxy websockets in order to correctly display Shiny apps and R Markdown Shiny documents in RStudio Server.

```nginx
http {
  # 设置反向代理 WebSocket (needed by RStudio)
  map $http_upgrade $connection_upgrade {
      default upgrade;
      ''      close;
    }

  server {
    listen 80;
    
		server_name example.com;
    
    location / {
      proxy_pass http://localhost:8787/;
      proxy_redirect http://localhost:8787/ $scheme://$http_host/;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $connection_upgrade;
      proxy_read_timeout 20d;
    }
  }
}
```

If you want to serve RStudio Server from a custom path ***(e.g. /rstudio)*** you would edit your `nginx.conf` file as shown below:

```nginx
http {
	# 设置反向代理 WebSocket (needed by RStudio)
  map $http_upgrade $connection_upgrade {
      default upgrade;
      ''      close;
    }

  server {
    listen 80;
    
    server_name example.com;
    
    rewrite ^/rstudio$ $scheme://$http_host/rstudio/ permanent; 
    
    location /rstudio/ {
      rewrite ^/rstudio/(.*)$ /$1 break;
      proxy_pass http://localhost:8787;
      proxy_redirect http://localhost:8787/ $scheme://$http_host/rstudio/;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $connection_upgrade;
      proxy_read_timeout 20d;
    }
  }
}
```

---

## R Studio Server 端配置

配置 `/etc/rstudio/rserver.conf`：

```nginx
# Make sure rstudio-server is only accessible from the local network
www-address=127.0.0.1
```

---


## [Let's Encrypt along w/ Nginx](https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx)

**Add PPA:**

```shell
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
```

**Install Certbot:**

```shell
sudo apt-get install certbot python-certbot-nginx
```

**Get Certificate:**

> 需先配置好Nginx的网站，如 `/var/html/your.website` 
>
> 执行指令，按提示自动验证获得 TLS 证书，

```shell
sudo certbot --nginx
```

**Test automatic renewal:**

```shell
sudo certbot renew --dry-run

# Shell scripts are listed in these folders:
/etc/crontab/
/etc/cron.*/*
# List timers
systemctl list-timers
```

---

## Nginx 配置：TLS 部分

完整版 `/etc/nginx/conf.d/test.conf` :

```nginx
## redirecting http to https
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name your.website;

  if ($host = your.website) {
    return 301 https://$host$request_uri;
  } # managed by Certbot

  return 404; # managed by Certbot
}

## Serving rstudio via https
server {
  listen 443 ssl;
  server_name your.website;
  
  root /var/www/your.website;

  # SSL CONFIG
  ssl on;
  ssl_certificate /etc/letsencrypt/live/your.website/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/your.website/privkey.pem; # managed by Certbot
  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

  # 网站相关
  # Set log file
  access_log  /var/log/nginx/nginx-rstudio-access.log;
  # 转发端口到8787
  location / {
    proxy_pass http://localhost:8787/;
    proxy_redirect http://localhost:8787/ $scheme://$http_host/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_read_timeout 20d;
  }
}
```













