---
layout: post
title: "svn diff between tags"
description: ""
category:
tags: []
---
{% include JB/setup %}

Different project structure cause tags to be at different locations.

#!/bin/bash -x

# svn log -v -q -r 616000:616734 http://svn.funddevelopmentservices.com/svn-repos/

BASEURL=http://svn.funddevelopmentservices.com/svn-repos/hs_main/tags

#TAG1=tag_4_11051_13
#TAG2=tag_4_11051_16

TAG1=tag_4_11423_5
TAG2=tag_4_11423_6

URL1=${BASEURL}/$TAG1
URL2=${BASEURL}/$TAG2

##########svn diff --summarize $URL1 $URL2
svn diff $URL1 $URL2
echo $?
