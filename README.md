# Consegna Connect Number Sanitizer

This simple repo shows the basics of having a number sanitizer that validates and checks a number that was provided in connect, and returns values that can be both uses to read to the User their number in a National Format, as well as the E164 format that Connect requires for usage in locations like setting Callbacks.
It is intended as a simple basis for any work, and is provided as a simple show of what you can do with a small amount of coding.

## Quick Start

Some sample events are included to show what the event from Connect looks like, as well as some Jest tests to show the outputs from them.
Simply add these Lambda functions to your Connect instance, add the function to a Contact Flow, and decide on a routing strategy based on the responses.
Make sure you include the `google-libphonenumber` package either in your uploaded ZIP or by adding a Lambda Layer, otherwise you won't get very far.

## Improving from here

As with many things you can take this in many different directions.

- You may seek to add Amazon X-Ray to get more deep dive analytics/traces.
- You could improve the code logic so that you get different messages that allow you to make routing decisions
- You could wrap this up in your IaC provider of choice and get everything deployed via your favourite CI/CD pipeline

Justin Susans, 2021
