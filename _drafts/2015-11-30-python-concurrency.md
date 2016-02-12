---
layout: post
title: "Python concurrency in a nutshell"
description: "Python concurrency in a nutshell"
category: python
tags: [python, concurrency, asyncio, multithreading]
comments: true
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







==========


    start_websockets_service(environment)

class ThreadedWebSocketServer(threading.Thread):
    def __init__(self, environment, port):
        self.environment = environment
        self.port = port
        super(ThreadedWebSocketServer, self).__init__()

    def do_it(self, ws):
        class TimerBasedTask(threading.Thread):
            def __init__(self, ws):
                if ws is None:
                    raise Exception("You suck!")
                self.ws = ws
                super(TimerBasedTask, self).__init__()

            def run(self):
                print("===================== STARTING SLUMBER ====================")
                event_loop = asyncio.new_event_loop()
                asyncio.set_event_loop(event_loop)
                sleep(5)
                print("===================== SENDING MESSAGE ====================")
                data = dict()
                data['message'] = 'Meh!'
                asyncio.ensure_future(self.ws.send_message(client_code="CLIENT1", message=json.dumps(data)))
                event_loop.run_forever()

        t = TimerBasedTask(ws)
        t.start()

    def run(self):
        event_loop = asyncio.new_event_loop()
        asyncio.set_event_loop(event_loop)
        websocket_server = WebsocketsServer(port=self.port, event_loop=event_loop)
        self.do_it(websocket_server)
        try:
            websocket_server.init()
            logger.info('Websocket Server started at ws://localhost:%s', self.port)
            event_loop.run_forever()
        except KeyboardInterrupt:
            event_loop.run_until_complete(websocket_server.finish())






                @asyncio.coroutine
                def send_message(self, client_code, message):
                    self.log.info("Sending message [{}] to all websockets for client {}".format(message, client_code))
                    if not client_code:
                        self.log.debug("Empty or Invalid client code. Nothing to do")
                        return
                    websockets = self.websocket_connections_by_client.get(client_code)
                    if websockets is None:
                        self.log.debug("No websockets found for client {}. Nothing to do".format(client_code))
                        return
                    for websocket in websockets:
                        if self.log.isEnabledFor(logging.DEBUG):
                            self.log.debug("Sending message to websocket {}".format(websocket))
                        yield from websocket.send(message)
                    self.log.info("Completed sending message.")







                        @asyncio.coroutine
                        def handle_client_connection(self, websocket, path):
                            while True:
                                try:
                                    listener_task = asyncio.ensure_future(websocket.recv())
                                    producer_task = asyncio.ensure_future(self.producer())
                                    done, pending = yield from asyncio.wait(
                                        [listener_task, producer_task],
                                        return_when=asyncio.FIRST_COMPLETED)

                                    if listener_task in done:
                                        message = listener_task.result()
                                        yield from self.consumer(message, websocket)
                                    else:
                                        listener_task.cancel()

                                    if producer_task in done:
                                        message = producer_task.result()
                                        yield from websocket.send(message)
                                    else:
                                        producer_task.cancel()

                                except InvalidClientException as ice:
                                    self.log.info("Invalid client exception thrown - {}".format(ice))
                                    self.remove_websocket(websocket=websocket)
                                    break
                                except ConnectionClosed as ce:
                                    self.log.info("Connection has been closed on websocket {} due to - {}".format(websocket, ce))
                                    self.remove_websocket(websocket=websocket)
                                    break





                                    class ThreadedRedisMessageListener(threading.Thread):
                                        def __init__(self, redis_connection_adapter_factory, message_consumer):
                                            self.redis_connection_adapter_factory = redis_connection_adapter_factory
                                            self.message_consumer = message_consumer
                                            super(ThreadedRedisMessageListener, self).__init__()

                                        def run(self):
                                            event_loop = asyncio.new_event_loop()
                                            asyncio.set_event_loop(event_loop)
                                            redis_message_listener = RedisMessagingGateway(self.redis_connection_adapter_factory, self.message_consumer)
                                            asyncio.ensure_future(redis_message_listener.run())
                                            event_loop.run_forever()
