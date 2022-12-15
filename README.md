# Requirement Test for Senior BE - NodeJS
## Test 1
1. Create a simple form with 2 buttons link with GoogleDrive & OneDrive
2. When you click on it, it will connect to your Gmail or OneDrive account and load everything in the that drive.
3. Sync local drive & remote drive with features such as getting the link of a file/folder, deleting a file/folder and adding a new file/folder(can use any db for store data, localStorage, sqlite, etc but need include all in this repo for any dev can run it, this mean if use database such as mysql, sqlite, postgres, etc then must use docker-compose for setup and run local)

### Deadline of this task
- Need response this task in 4 days.


## Test 2
1. Create a simple form with button link with Google Analytics
2. After connected then call Restful APIs to load data and display again on browser (just get 1 - 2 charts for demo)
3. Implement more `Task Schedule` and each hour then export all charts to PDF file and send email to list Emails in db(can use any db for store data, localStorage, sqlite, etc but need include all in this repo for any dev can run it, this mean if use database such as mysql, sqlite, postgres, etc then must use docker-compose for setup and run local)
### Deadline of this task
- Need response this task in 5 days.


## Test 3
1. Create a API for Video Processing with [FFmpeg](https://ffmpeg.org/)
2. This API only test & run via Postman
3. Scope of API include\
  3.1. can upload or input video via http link\
  3.2. allow add watermart text (multiple) into video above (can set position, size, time, color & font style)\
  3.3. allow add watermark images (multiple) in video above (can set position, size, time)\
  3.4. merge multiple video become final video (example: merge intro & outro into video above)
### Deadline of this task
- Need response this task in 7 days.


### Note: 
- Requires using expressjs (can use any view engine express support to connect to api) with typescript
- Write unittest for typescript code
- No UI required so you can use any css framework to use and have you can design UI to display
- After done then push to this Repo and make PR then assign to [me](https://github.com/longthemartec)
- How to make PR on public repo? check [HERE](https://opensource.com/article/19/7/create-pull-request-github)
