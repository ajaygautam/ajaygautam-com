---
layout: post
title: "Setting up Windows share on Linux with autofs"
description: ""
category:
tags: [smb,autofs,linux,cross-platform]
---
{% include JB/setup %}

Here is a quickstart / setup of how to setup a windows (UNC) share on a linux (CentOS 7.1) using automount/autofs (5.0.7). This post assumes you know what you are doing, and have some \*ix sysadm experience

## Install required packages

    sudo yum install autofs samba-client samba-common cifs-utils

## Configuration

For my setup, I created a root level folder to get my application working

Files and folders:

    mkdir /mktdata
    mkdir /etc/mktdata

Create a file with authentication credentials:

    $ cat /etc/mktdata/smbfs-cred.txt
    username=mktuser
    password=BuildBetterPasswords

Add this line to the end of `/etc/auto.master`:<br>

    /mktdata /etc/mktdata/auto.mktdata --timeout 300

Add this to `/etc/mktdata/auto.mktdata`:

    /mktdata  -fstype=cifs,rw,noperm,credentials=/etc/mktdata/smbfs-cred.txt //corporate-server.moonguard.com/shares/mktdata

Securing files from the public eye:

    chmod 600 /etc/mktdata/smbfs-cred.txt /etc/mktdata/auto.mktdata

## Managing services

Since you just installed this, enable the service and restart to read new changes:

    systemctl enable autofs
    systemctl restart autofs

## Testing

Check whats mounted: `df -hT`

Access the mount point / folder: `ls -l /mktdata`

## Debugging / Notes

Things not working as they should?

Is the service running? `systemctl status autofs`

Is the credentials file correct? Look at format in `man mount.cifs`

`/etc/auto.master` file row format: `<mount-point> <map-name> <options>`<br>
Option timeout is the number of seconds after which the filesystem will be automatically unmount, after last use.

First place to look for errors `/var/log/messages` - anything the system logs, ends up here.

More logging details: `dmesg --human` or `dmesg | tail`

Try mounting manually via autofs: `mount /mktdata`

Try mounting completely manually: `mount -t cifs //corporate-server.moonguard.com/shares/hs-mktdata /mnt/test -o username=mktuser`
