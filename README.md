# CSC302-Assignments

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Important Note: 
#### 1. ALL Assignments will be pushed into main branch
#### 2. We will not modify the main branch until assignment graded
#### 3. We will continue developing the next assignment in other branches

## Assignment 1

* Deployment Link: https://csc302-assignments.herokuapp.com/

* Database Access Link(using MongoDB Compass): mongodb+srv://1281784448yeqiming:ming98xin@assignments.os7jj8s.mongodb.net/test?retryWrites=true&w=majority

### Meeting notes
* Please check /MeetingNotes directory

### Documentation
* Please check /Documentation directory

### Roadmap
* Please check Roadmap from Github projects by clicking Github_main_repository -> Projects -> CSC302_Assignments_Roadmap
    * There are descriptions and status for each step of milestones
* You can also check Milestones from Github Issues by clicking Github_main_repository -> Issues -> Milestones
* You can also check each step for milestones from Github issues by clicking Github_main_repository -> Issues

#### Installation for tech stack
Please go to https://nodejs.org/en/ to install nodeJs the latest LTS version.
##### Note: If you wish to set this up on their machine or a remote server, please ensure your nodeJs is later than 16.14.2 LTS version and npm later than 8.1.0. School lab are not available to run this project since nodeJs is not later than 16.14.2 LTS version.

#### Build web app and test locally
build project: 
```
$ docker-compose up (and then open http://localhost:5000/ to view the website)
```
To run API tests, you can run the code below:
```
$ npm test
```
