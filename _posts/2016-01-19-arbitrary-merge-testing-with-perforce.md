---
layout: post
title: "Arbitrary merge testing with Perforce"
description: "Can Perforce handle large volume of merges across branches"
category: Configuration as code
comments: true
tags: [config-as-code, dev-ops, Perforce]
---
{% include JB/setup %}

## Can Perforce handle large volume of merges across branches

[Github link to the source-code for this testing](https://github.com/ajaygautam/arbitary_merge_testing)

[Perforce](http://www.perforce.com) has proven itself as an enterprise grade source-code version management system. Must keep in mind though - Software Development is a very structured process. Source code pretty much always "moves forward" - (DEV to QA to UAT to Production). Very rarely does it move in the "other direction" (eg: UAT back to DEV); Even when it does, its mostly temporary, such as a hot-fix in a specific branch. Here, [we](http://paulhammant.com) explore Perforce's suitability as an underlying system for [Configuration-as-code]({% post_url 2015-11-15-configuration-as-code %}). The major difference between code and config here is that config elements can (and likely will) merge in arbitrary directions.

## Why Perforce?

These days, where ever you look, it feels like every one is working with git. However, Git is not suitable for our purposes because it doesn't allow for fine grained access controls - can't assign access to different parts of the config-tree to different people / teams. There are ways to get around this (or so I have been told), but why jump through hoops where alternate solutions exist. Then there is also the open question of supporting large repositories with git. With config elements including binary files like Excel and Word documents, repo size is bound to increase beyond what git might be comfortable with.

Subversion does not have the limitations of git, but subversion didn't do well in [arbitrary merges across branches](http://paulhammant.com/2015/09/25/subversion-merge-limitations/)

## What are we measuring?

In a long running configuration management system, can Perforce handle arbitrary merges across branches and keep operating cleanly (with no "ghost merges" - where the source control system says there is something to merge, but actually, there is nothing to merge, and performing a merge produces revisions with "no changes").

## The setup

[Github link to the source-code for this testing](https://github.com/ajaygautam/arbitary_merge_testing)

Write a script to run the following scenario for as long as it runs (create multiple branches and merge across them):

All the steps below are automated in a single script. Broken down here for easier understanding.

Terminology / Assumptions:

1. Our setup have many environments / deployments - usually one per client
1. For the purposes of this config system, an environment is a folder in the config system
1. Each "client" has their UAT and PROD environments
1. Hence, the terms "client" and "environment" can be used interchangeably
1. DEV, UAT, PROD are environment types, and different branch roots
1. DEV environments do not exist for "clients". UAT and PROD are client specific
1. Anything updated in DEV would merge down into UAT
1. Anything updated in UAT, would merge down into PROD
1. Simplistic big picture: All branches are kept in sync

Setup:

    Create a DevBase branch with a config file
    Create a UatBase branch - from the DEV branch
    Make mods to DEV, merge each to UAT
    Verify DEV and UAT are in sync (nothing to merge. No ghost merges)
    Create 5 clients. Make UAT and PROD branches for each

Loop through:

    Add new client:
        Create client environment in UAT, integrate config from DEV
        Create client environment in PROD, integrate config from UAT
    Make changes to DEV. integrate all to UAT
    Verify DEV and UAT are "in sync"
    Roll out all changes to all client's UAT and PROD
    Verify DEV and UAT are "in sync"
    Make changes to DEV. integrate all to UAT
    Verify DEV and UAT are "in sync"
    Roll out all changes to even indexed client's UAT and PROD
    Make changes to DEV. integrate all to UAT
    Verify DEV and UAT are "in sync"
    Roll out all changes to odd indexed client's UAT and PROD
    Make changes to DEV. integrate all to UAT
    Verify DEV and UAT are "in sync"
    Roll out all changes to all client's UAT and PROD
    Verify DEV and UAT are "in sync"
    Make a change in one client (random indexed) PROD file
    Reverse integrate change to client's UAT
    Reverse integrate change to UAT base
    Reverse integrate change to DEV base
    Start again from the top

## Resuts

The loop above ran for about 7 days (about 166 hours), created just over 1200 client environments, and performed a little over 524,000 commits. Thats about 3156 commits per hour averaged over the life of the test.

At the end of the test, all files are in sync. Perforce has been able to handle all the load we could throw at it:
* No merge conflict that could not be auto-resolved
* No Ghost commits
* Successful merges in any direction

These impressive results prove that Perforce is a good choice as a backing store for a configuration system.
