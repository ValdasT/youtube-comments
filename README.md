# Youtube comments application
## Usage
![video](https://user-images.githubusercontent.com/35199948/174590798-628492b1-241a-4bc1-9954-af9f8ac0b5f7.gif)
 - The main website page is divided into 2 sections: the search and results section. The search section contains the input field, Search and Add buttons. To find the video user has to enter a valid youtube video ID. If the user needs to find more than one video, then he/she can add those videos’ IDs into the new input fields after clicking Add button. Each field is dedicated to only one video ID. All of these fields have validation implemented which checks: if the field is not empty and if such ID is valid. All unnecessary input fields can be removed by selecting the Remove button, which appears if there is more than one input field added. Once the search button is clicked, results are displayed in the Results section. The results section provides a list of videos which has been searched in the search section. Each video has its own tile. At the tile, the main information about the video is displayed: Video ID, a snapshot of the Video, the name of the Video, and the button Read Comments. The button - Read Comments contains a counter, which informs the user how many comments are present for each video. If any video has been searched during the past 24 hours, then a warning message would be displayed at the top of the tile - “The data can be outdated”. This information is being displayed, so users would be aware, that there might be new comments which are not being displayed. 
- The second website page is dedicated to the main information of the video and its comments. Only the latest 20 comments are being fetched from Youtube. In case the same video has been searched during the last 24 hours, then fetching of the comments is not being updated and instead, it provides the same information as it was fetched for the first time. Each comment has a standard youtube comment visual: user picture, user name, and comment itself. Only one video is being displayed per page. To open another video comment, the user has to click the Back button, where she/he will be returned to the main page with the latest Search results. All results will be cleared out once the website is closed.

## Start project localy
  - Clone git repository: 
  ```sh
 git clone https://github.com/ValdasT/youtube-comments.git
  ```
  - Install the dependencies:
```sh
cd youtube-comments
npm install
```
  - Create a `env.local` file to hold environment variables and create values:
  >NEXT_PUBLIC_YOUTUBE_TOKEN=
  >
  >NEXT_PUBLIC_YOUTUBE_BASE_URL=
  >
  >MONGODB_URI=
  >
  >MONGODB_DB=

- To start the development server run:
```sh
npm run dev
```
- Visit `http://localhost:3000` to view your application.

- To run tests:
```sh
npm run test
```
