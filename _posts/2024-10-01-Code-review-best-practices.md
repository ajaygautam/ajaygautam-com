This document capture my thought process when I code and/or review code comments.
 
## Coding best practices
* DRY - Don't Repeat Yourself!
* Follow Clean coding: [Book link at Amazon](https://a.co/d/drbzGMd)
    * Naming (classes, methods, variables) is critical to readability
    * Smaller methods are better
    * Smaller classes are better
    * Methods / classes should do only one thing.
* Follow [SOLID principles](https://en.wikipedia.org/wiki/SOLID)
* If building SaaS: Follow [12 Factor app](https://12factor.net).
* If building distributed software, follow [Fallacies of distributed computing](https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing)
* Write conditions in positives instead of negatives
* Avoid using `null` values. Wherever possible, add `@NotNull` and use `Optional<>`
* Use lombok to remove boilerpate code!
    * Example of removing boiler plate code without sacficing best practices (Section: Boilerplate buster Lombok): https://odrotbohm.de/2013/11/why-field-injection-is-evil/
 
## Comments best practices
* Code comments are (mostly) a violation of DRY (Don't Repeat Yourself)
* Avoid comments as much as possible
* Comments that describe "what" the code is doing - are the worst!
* Remember - no one maintains comments! They will diverge from code!
* Code must be readable enough so that the reader can make sense of the code just by reading it... without needing comments.
* Breaking the code into smaller, well-named, methods is a very helpful practice
* The purpose of comments is to simplify understanding. If there is code that cannot be simplified by refactoring it to make more readable, then the comment should cover "Why" the code is this way. Why did the author decide to do what they did.
* If you still feel compelled to use comments, think about adding a log message!
 
## Automated testing best practices
* MUST follow [TDD (Test Driven Development)](https://en.wikipedia.org/wiki/Test-driven_development)
* If you have access to Uncle Bob Videos... watch his TDD videos
* Write clear and meaningful tests
* Test must assert meaningful results
* Unit testing conventions: https://www.baeldung.com/java-unit-testing-best-practices
 
## Logging best practices
* Know that your logs will be ingested by a log aggregator (splunk? Dynatrace? etc). Write logs accordingly.
    * Less log messages with more info per log is better
    * Put more context info in each log, so searching is easier
* Think for logs as an event stream
* For better logging... think about logging from a support person/team point of view - trying to figure out what happened just by looking at the logs.
* After the product is deployed, can someone look at your log messages and follow what's going on... without having to look at code? Is there enough information provided in terms of values and decision points?
* Levels guideline
    * SEVERE: Something that causes the service to go down
    * ERROR: Something that causes the current request to not process successfully
    * WARN: Work was performed successfully, but here is an anomaly worth paying attention to
    * INFO: Everything that a person needs to read to understand the flow of code / (summarized) data items / decision points
    * DEBUG: More information / more data that explain the process more
* Specific libraries
    * Don't commit config with DEBUG level for hibernate. This generates a LOT of log noise! (good for local debugging though)
 
## SQL best practices
* While adding SQL to Java code, use triple double quotes. This makes copy pasting to/from SQL tools easier https://stackoverflow.com/questions/28356801/triple-quotes-in-java-like-scala
* Use [JPA query methods](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html) to auto create sql based on declarations.
 
## Git best practices
* Must NOT have commented code in a pull request
* Cleanup code formatting and imports before creating a Pull Request
* Checkin Comments should have a meaningful message that someone can read an understand from a list of commits, presented in a Release Notes document.
* Always prefer rebase over merge - this creates less noise in the commit log for your branch
* When submitting a merge/pull-request, squash commits
 
## Swagger / API documentation best practices
* APIs are publicly facing and should have good documentation
* Must describe what the API does
* Must cover edge cases, if any
* Must specify return schema
* Must specify return / error codes with details
* Anything else you can think of that will help the consumer of this API
