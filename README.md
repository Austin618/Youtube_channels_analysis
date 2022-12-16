# CSC302-Assignments

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Important Note: 
#### 1. ALL Assignments will be pushed into main branch
#### 2. We will not modify the main branch until assignment graded
#### 3. We will continue developing the next assignment in other branches

### Motivation
There are more than 1 billion unique users visit YouTube each month and there are 37 million channels on YouTube. With so many channels coming up on Youtube, how to create high quality titles and descriptions for the youtube channel is important for all the youtubers. This website that could help people, especially YouTubers, to analyze how to create a popular youtube channel. The user would need to provide a channelId to the website and the website would all the channel information including channel title, channel description, playlists, videos, etc. The most important part is that it would help the user to find what are the keywords they can put into the video title and description to catch people’s eyes. The keywords are generated based on the previously published popular videos on this channel.

### Website URL
* https://csc302-assignments.herokuapp.com/

### Meeting notes
* Please check all pdfs in ./MeetingNotes directory

### Documentation
* Please check CSC302_Ax.pdf in ./Documentation directory 

### Roadmap
* Please check Milestones part for Roadmap in CSC302_A1.pdf and CSC302_A2.pdf in ./Documentation directory 

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
If the above commends don't work, try adding "sudo" at the front.
