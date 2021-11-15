# Consegna Connect Number Sanitizer

This simple repo shows the basics of having a number sanitizer that validates and checks a number that was provided in connect, and returns values that can be both uses to read to the User their number in a National Format, as well as the E164 format that Connect requires for usage in locations like setting Callbacks.
It is intended as a simple basis for any work, and is provided as a simple show of what you can do with a small amount of coding.

## Quick Start

Some sample events are included to show what the event from Connect looks like, as well as some Jest tests to show the outputs from them.
Simply add these Lambda functions to your Connect instance, add the function to a Contact Flow, and decide on a routing strategy based on the responses.
Make sure you include the `google-libphonenumber` package either in your uploaded ZIP or by adding a Lambda Layer, otherwise you won't get very far.

## Deploying to Lambda

Everything that should be needed to deploy a successful Lambda package is included. Since it only requires a single dependency this keeps the package light overall.

To generate the package that can then be used:

0. For best experience build on a \*nix based computer, as this should ensure any OS specific packages are correctly obtained. You can run on any OS, but you may need further testing once deployed to be sure that there isn't any extra OS specific functionality that has been lost.
1. Run the regular `npm install` command to install all dependencies
2. Complete any updates or modifications as required. Be sure to add/alter any tests that would be impacted, as your packaging will fail otherwise.
3. Run the command `npm run package`. This will step through linting, unit tests, and finally generate a ZIP file. Note that if you use the inbuilt `pack` command you will get a `.tgz` file, which is not desired. You always want the `.zip` version.
4. Once satisfied upload the ZIP using your preferred method. Recommendation is to use an IaC control, such as CloudFormation or Terraform, but in the simplest case uploading the ZIP via the console should behave as expected. Note that the Lambda Handler will be `index.handler`
5. Test the deployment. You can use the content from `./events` as your test events as a representative example of your Contact Flow event
6. Wire it up to your Connect Contact Flow!

## Improving from here

As with many things you can take this in many different directions.

- You may seek to add Amazon X-Ray to get more deep dive analytics/traces.
- You could improve the code logic so that you get different messages that allow you to make routing decisions
- You should wrap this up in your IaC provider of choice and get everything deployed via your favourite CI/CD pipeline

Justin Susans, 2021
