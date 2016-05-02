---
layout: post
title: "Setting up Jekyll on Mac"
description: ""
category: Blogging
tags: [jekyll]
comments: true
---
{% include JB/setup %}

[Much more comprehensive install](https://jekyllrb.com/docs/installation/)

Every so often (new computer, new user, etc.), I need to setup Jekyll so I can keep working on my blog. Here are the least number of steps I need to follow to install Jekyll on a Mac setup:

    [install homebrew](http://brew.sh)
    brew update
    brew install ruby
    sudo gem install jekyll
    cd ...path_to_jekyll_site...
    jekyll serve
