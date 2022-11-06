# CSC302-Assignments

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Important Note: 
#### 1. ALL Assignments will be pushed into main branch
#### 2. We will not modify the main branch until assignment graded
#### 3. We will continue developing the next assignment in other branches

## Assignment 1 and 2

* Deployment Link: https://csc302-assignments.herokuapp.com/

### Meeting notes
* Please check all pdfs in ./MeetingNotes directory

### Documentation
* Please check CSC302_A1.pdf in ./Documentation directory 

### Roadmap
* Please check Milestones part for Roadmap in CSC302_A1.pdf in ./Documentation directory 

* Please also check Roadmap from Github projects by clicking Github_main_repository -> Projects -> CSC302_Assignments_Roadmap
    * There are descriptions and status for each step of milestones
* You can also check Milestones from Github Issues by clicking Github_main_repository -> Issues -> Milestones
* You can also check each step for milestones from Github issues by clicking Github_main_repository -> Issues

#### Installation for tech stack
Please install Docker to run the Docker command and build the project in dev
#### Build web app and test locally
build project: 
```
$ docker-compose up 
```
(and then open http://localhost:5000/ to view the website)

To run API tests, you can run the code below:
```
$ docker-compose -p tests run csc302assignments npm run test
```
