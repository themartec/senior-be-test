## Test 2

## Requirements
1. Create a simple form with button link with Google Analytics
2. After connected then call Restful APIs to load data and display again on browser (just get 1 - 2 charts for demo)
3. Implement more `Task Schedule` and each hour then export all charts to PDF file and send email to list Emails in db(can use any db for store data, localStorage, sqlite, etc but need include all in this repo for any dev can run it, this mean if use database such as mysql, sqlite, postgres, etc then must use docker-compose for setup and run local)

### Deadline of this task
- Need response this task in 5 days.

### Note:
* Requires using expressjs (can use any view engine express support to connect to api) with typescript
* Write unittest for typescript code
* No UI required so you can use any css framework to use and have you can design UI to display
* After done then push to this Repo and make PR then assign to me (https://github.com/longthemartec)
* How to make PR on public repo? check HERE (https://opensource.com/article/19/7/create-pull-request-github)

-----
## RESULT
1. Because of the task need a form to link with Google Analytics, so I guess that requires the OAuth 2.0 to authorize multi accounts.
2. Because of (1), I choose to link on client side instead, so nothing to write the unittest I guess.
   I have no idea to load GA data for charts, I sorry for this incomplete.
3. Scheduled mail every hour (without export PDF data).

## DEPLOYMENT
1. Copy `.env.example` to `.env` and configure as your own
2. Run `npm install`
3. Run `npm run dev` - Start at: http://localhost:3001
