---
layout: post
title: "Does TDD discourage logging"
description: ""
category:
tags: []
---
{% include JB/setup %}

7 minutes of log silence:

[7376.10628] 2016-04-20 15:13:07,308 [DEBUG] domain_model.gateway.dashboard.redis_gateway.RedisGateway: Connected to hst-ny-redis-01.hedgeservtest.com:26380
[7376.10628] 2016-04-20 15:13:10,111 [DEBUG] domain_model.cash_management.data_generators.cash_management_cached_transactions_data_generator.CashManagementCachedTransactionsDataGenerator: got 9220 records from redis
[7376.10628] 2016-04-20 15:21:17,163 [DEBUG] domain_model.cash_management.data_generators.cash_management_cached_transactions_data_generator.CashManagementCachedTransactionsDataGenerator: built cashflow records from data retrieved from redis
[7376.10628] 2016-04-20 15:21:17,181 [DEBUG] common.utilities.usage_tracker.UsageTracker: usage tracker result =
