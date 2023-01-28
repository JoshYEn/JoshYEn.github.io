---
layout: post
title: "Apt 设置自动更新"
date: 2023-01-29 00:40:00 +0800
categories: web
---

## Setting up unattended upgrades

```shell
sudo apt update && sudo apt upgrade
sudo apt install unattended-upgrades
```

if monitoring changes is needed, refer to `/var/log/dpkg.log` or read the log files in `/var/log/unattended-upgrades/`. Or install package:

```shell
sudo apt install apt-listchanges
```



## Configure unattended-upgrades

The unattended-upgrades config file location is `/etc/apt/apt.conf.d/50unattended-upgrades`.

| Config | Description |
---|---
|“${distro_id}:${distro_codename}-security”| Auto updating security updates will patch holes and vulnerabilities on your server.|
|“${distro_id}:${distro_codename}-updates”| Updates (aka Recommended Updates) contain non-critical updates which can remove major annoyances and broken packages but which do not affect your security.|



## Configure update frequency

By default, unattended upgrades will install available updates daily. To confirm, take a look at the config file: `/etc/apt/apt.conf.d/20auto-upgrades`. It should look like this:

```conf
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::Download-Upgradeable-Packages "1";
APT::Periodic::AutocleanInterval "7";
```



## Test

Test your config with a dry run.

```shell
sudo unattended-upgrades --dry-run --debug
```

Check whether working properly.

```shell
systemctl status apt-daily-upgrade.timer
ls -lh /var/lib/apt/periodic/
sudo tail /var/log/unattended-upgrades/unattended-upgrades.log
```

