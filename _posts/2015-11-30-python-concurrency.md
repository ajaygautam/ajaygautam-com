---
layout: post
title: "Python concurrency in a nutshell"
description: "Python concurrency in a nutshell"
category: python
tags: [python, concurrency, asyncio]
---
{% include JB/setup %}

Exploring concurrency with Python 3.4's asyncio library/module. These are primarily my notes around understanding asyncio. Coming from a Java background, many of these notes relate Java concurrency to Python asyncio.

## Sample code

[This sample project at GitHub](https://github.com/ajaygautam/python-asyncio) is Python 3.4 code for a [Producer Consumer scenario](https://en.wikipedia.org/wiki/Producer%E2%80%93consumer_problem).

**Producer**: Generates stock quotes (reads from a file)

**Consumer**: Consumes the quotes and displays a [SMA](https://en.wikipedia.org/wiki/Moving_average#Simple_moving_average) of the past 10 quotes.

## Python Terminology and Concepts

### generator

Is a section of code that generates data. Unlike `list comphrension`, however, a `generator` can only be used once. It generates data, then forgets about every thing. A `generator` can be iterated upon. [Good examples and presentation](http://www.dabeaz.com/generators)

Generator does not create an in-memory list, can be used to generate values only once. A generator is an iterable, and list functions cannot be applied to it.

Contrived example: (Note the round brackets):

```python
test_array = [1,2,3,4,5,6,7,8,9,10]
sample_generator = (x*x for x in test_array)
next(sample_generator) # will produce the first value - 1
next(sample_generator) # will produce subsequent value - 4
next(sample_generator) # will produce subsequent value - 9
...
```

`generators` are great for pipe-lining data between different constructs (extract, process, aggregate) - [Excellent example - see slide 1-38](http://www.dabeaz.com/generators/Generators.pdf)

It is possible to `close()` a generator. This will raise a `GeneratorExit` in the generator, which can be handled for a clean exit.

### yield

When execution hits `yield`, the current method is paused, and returns a `generator`. A call to `next()` on the generator will cause the `generator` to proceed and return the value specified by `yield`. Then the execution is suspended again till `next()` is called again on the `generator`.

Its a memory efficient way to only generate values when they are needed / used - without the need to storing them in intermediate data structures. The execution of code to generate value(s) is deferred to the point where its used.

`yield`/`generator` will always return multiple values that can be iterated upon. Raising `StopIteration` signals end of iteration. This is lazy code execution. [Good explanations at stackoverflow](http://stackoverflow.com/questions/231767/what-does-the-yield-keyword-do-in-python).

### yield from
`yield from` is a way of chaining `generators`, and must be used to chain calls to other `yield` calls.

### next

`next()` is used to get the next value from a `generator` (because its iterable). Whatever is on the **right side** for the `yield` statement, will be returned as a result of this call. Example:

```python
    yield stock_price
```

### send

`send()` is used to send a value to a `generator` and get the next value. A `yeild` in the `generator` - when used as an expression - that is waiting for a value, gets that value sent by `send()`. Whatever is on the **left side** of a `yield` will get the value sent by `send()`. [Stackoverflow explanation](http://stackoverflow.com/questions/19302530/python-generator-send-function-purpose) Example:

```python
    data = yield
```

### coroutines

[Good presentation](http://dabeaz.com/coroutines/Coroutines.pdf)

A `generator` is used to produce values. A `coroutine` is primarily used to consume data, but can also produce values.

Think of `coroutines` as a processing pipeline that you can feed values to. The pipeline must have an endpoint that does something with the data.

To get a `coroutine` to a state where it will accept values sent to it, call `next()` on it to get it to the `yield`. Then, call `send()` to give it a value. This can be done by a decorator. [see slide 1-131 on this presentation](http://www.dabeaz.com/generators/Generators.pdf)

Similar to `generators`, it is possible to `close()` a coroutine. This will raise a `GeneratorExit` in the coroutine, which can be handled for a clean exit.

`coroutines` are not related to iteration.

## CPU Efficiency

## Event handling
ayncio is based around the concept of event handling. An event loop is primarily a Consumer.
