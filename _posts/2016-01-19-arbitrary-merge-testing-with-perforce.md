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

[Perforce](http://www.perforce.com) has proven itself as an Enterprise grade source-code version management system. Must keep in mind though - Software Development is a very structured process. Source code pretty much always "moves forward" - (Dev to QA to UAT to Production). Very rarely does it move in the "other direction" (eg: UAT back to Dev); Even when it does, its mostly temporary, such as a hot-fix in a specific branch. Here, [we](http://paulhammant.com) explore Perforce's suitability as an underlying system for [Configuration-as-code]({% post_url 2015-11-15-configuration-as-code %}). The major difference between code and config here is that config elements can (and likely will) merge in arbitrary directions.

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
1. Each "client" has their Uat and prod environments
1. Hence, the terms "client" and "environment" can be used interchangeably
1. Dev, Uat, Prod are environment types, and different branch roots
1. Dev environments do not exist for "clients". Uat and Prod are client specific
1. Anything updated in Dev would merge down into Uat
1. Anything updated in Uat, would merge down into Prod
1. Simplistic big picture: All branches are kept in sync

Setup:

    Create a DevBase branch with a config file
    Create a UatBase branch - from the dev branch
    Make mods to Dev, merge each to Uat
    Verify Dev and Uat are in sync (nothing to merge. No ghost merges)
    Create 5 clients. Make Uat and Prod branches for each

Loop through:

    Add new client:
        Create client environment in Uat, integrate config from Dev
        Create client environment in Prod, integrate config from Uat
    Make changes to dev. integrate all to Uat
    Verify dev and Uat are "in sync"
    Roll out all changes to all client's Uat and prod
    Verify dev and Uat are "in sync"
    Make changes to dev. integrate all to Uat
    Verify dev and Uat are "in sync"
    Roll out all changes to even indexed client's Uat and prod
    Make changes to dev. integrate all to Uat
    Verify dev and Uat are "in sync"
    Roll out all changes to odd indexed client's Uat and prod
    Make changes to dev. integrate all to Uat
    Verify dev and Uat are "in sync"
    Roll out all changes to all client's Uat and prod
    Verify dev and Uat are "in sync"
    Make a change in one client (random indexed) prod file
    Reverse integrate change to client's Uat
    Reverse integrate change to Uat base
    Reverse integrate change to dev base
    Start again from the top

## Resuts

The loop above ran for about 7 days (about 166 hours), created just over 1200 client environments, and performed a little over 524,000 commits. Thats about 3156 commits per hour averaged over the life of the test.

At the end of the test, all files are in sync. Perforce has been able to handle all the load we could throw at it.

These impressive results prove that Perforce is a good choice as a backing store for a configuration system.
