# Start the stack:

`docker-compose up -d --build`

# Remove the stack

`docker-compose down -v`

# References:

Web: http://localhost:7000 

Email: http://localhost:7180

Jobs dashboard: http://localhost:7000/admin/queues

# Before running tests

Create a new database name `themartec_backend_test`

And then:

`npm run test`