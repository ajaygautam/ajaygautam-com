---
layout: post
title: "Google Cloud"
description: "Taking Google cloud for a spin"
category: Cloud services
comments: true
tags: [cloud,fintech]
comments: true
---
{% include JB/setup %}

Today, I decided to get off my lazy butt and finally get started on one of my many side projects that I keep putting off.

## Target: Hello World (sort of)

Well... "Hello, World" is boring. However, a simple cloud enabled program that can print the latest  price of an index is not. So... thats what we will do, on the Google cloud.

## Why Google Cloud

And not Amazon cloud or any of the zillion other clouds out there. A quick analysis of the various cloud platform indicates that I may be able to plug into the Google Finance data source and build a service around it.

## Step 1: "Free Trial"

Visit [this](https://cloud.google.com/appengine/) and scroll through the marketing.

Click on the big button labelled "free trial" to your free trial. Signup for the service.

## Step 2: The Google Cloud platform dashboard

Lots of interesting options here, however, keeping in line with our target state, head over to "Use Google APIs" to plug into the Google Finance API.

Can't locate anything like this on the "API Manager" page. Back to google search.

## Step 3: Abandoned

Well, looks like [Google Finance does not support getting stock quotes](http://stackoverflow.com/questions/527703/how-can-i-get-stock-quotes-using-google-finance-api). Not sure if there is any point to continuing this effort on google cloud.

Also, commercial use [Google](https://groups.google.com/forum/#!topic/google-finance/oKZ6vrY3NU4) and [Yahoo](https://developer.yahoo.com/forum/General-Discussion-at-YDN/Using-Yahoo-Finance-API-Not-RSS-/1250246255000-0b82f8f0-7f48-3af2-8fe2-e73a138cbfaa/) finance data goes against their TOC.

## Lessons learned / Next steps

A detailed analysis of findings early on might have saved me an hour or two of looking around. Lesson learned yet again to never trust marketing material.

Seems like [xignite](http://www.xignite.com) may have something worth exploring. Stay tuned for the next article.
