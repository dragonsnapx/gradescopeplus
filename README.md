# GradeScope Plus
Created by Jake Lee, Chase Feng, and Madeline Estey

## Inspiration
Gradescope, a website that allows for submission of assignments that is widely used at Johns Hopkins, lacks an "add to calendar" function to remind homework due dates. With Gradescope lacking a notification service, our team thought it would help to develop an extension that parses all the assignment information and create a calendar. Our goal was to make it simple so that it would seamlessly integrate within the Gradescope website, making it easy for the users. 

## Challenges we faced
The documentation for developing Chrome extensions were sometimes confusing as multiple versions of the API existed, and the .ics generation was challenging as it required very specific formats to be allowed to be imported into major calendar platforms.

## What it does
It vastly enhances Gradescope in multiple ways:
- Gives a cumulative grade for all the assignments
- Appends a percentage grade next to the assignment score (ex. 27/30 => 90%)
- Generates an .ics file for all the due assignments, making it possible to create alerts on Outlook, iCal & Google Calendar
- Highlights assignments that have less than 24 hours to the due date, and 72 hours to the due date.

## What we learned
Chrome extension development, generating a .ics file were the main technologies that we utilized and were able to master; also, our teammates learned React and Webpack as it was part of the stack.

## What's next for Gradescope+
Browser Notifications, diffing for code submissions so that students can compare the difference in submitted output and expected output, Firefox version.
