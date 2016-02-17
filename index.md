---
theme :
  name : hooligan
layout: page
title: Home
tagline: Building awesome software
---
{% include JB/setup %}

## About
I have been professionally developing software since 1995, and here I share my thoughts and findings on what it takes to build Enterprise grade, robust software components and systems. Hope you enjoy reading these as much as I enjoyed writing them. Do contact me at [twitter](http://www.twitter.com/ajaygautam42) or [Linked-in](http://www.linkedin.com/in/ajaygautam42)

## All Posts

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
