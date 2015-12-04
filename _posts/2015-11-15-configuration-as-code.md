---
title: Configuration as code
description: "Introduction to Configuration as code"
featured: images/no_image.png
layout: post
comments: true
category: Configuration as code
tags: [config-as-code, dev-ops]
---

{% include JB/setup %}

**Configuration as code** is the discipline of thinking of configuration elements of a software system as you would think of code.

In this context, _configuration_ mostly refers to elements that change often: such as CVS files, JSON config that hold feature flags, Spreadsheets that hold rules that tell a system how to process data.

# Benefits of a Configuration System
At a high level, a Configuration system is a set of tools build around a versioned data store for configuration data. These tools enable users to manage configuration and performs automated deployment of configuration to their destination locations.

## Single source of truth
There is one place and only one place where all the configuration lives. Everybody knows the system of record, and no one looks for or maintains configuration anywhere else.

## Change tracking
Part of the treatment of configuration as code, is to store it in a version control system (just like code). Systems like Perforce, SVN, Git can be used to store configuration. Any changes made to any part of the configuration can be tracked back to the user who made the change (which may or may not be a good thing, depending on the corporate culture).

## Atomic updates
Modifying a set of files that should go together to enable a specific change? Use version control's change-list / change-set idioms to commit sets of config files together. These changes stay together - while committing, and while deployment.

## Rollback
Current configuration changes unintentionally broke something? Revert the changes out of version control system, and use the last known good version

## Automation
Version control systems are very good at notifying on events. Tie in tooling around those notifications to enable automation. This makes it easy to validate changes, and auto-magically deploy them to their appropriate locations.

## Independent release cadence
An automated configuration system allows configuration to be released on a separate cadence than the application binaries. This leads to a faster turn around time for configuration changes.

## Reduction in environment errors
Ever run into a situation where a support guy updated a CSV file in production to make a report work correctly, but forgot to save the update / notify anyone about it? The next release will wipe out that change and break functionality (in production!). Automation around configuration management reduces errors and moves companies towards ensuring environments have consistent configuration.

## Scalability
Onboarding new environments becomes faster with an automated system. Create / clone / branch configuration for a new environment, spin up additional resources (hopefully using infrastucture-as-code), and the automation takes over to setup the environment.
