# Requirements

- nodejs
- docker, docker-compose

# Usage

- Config env variables by clone .env.example and update it.

- Start database

```bash
docker-compose up --build
```

- Goto source directory and execute commands

```bash
npm install
npm run dev
```

- Go to http://localhost:<port> and check it

# TODO

1. Correct UI email list
2. Implement a new page to support exporting exactly charts for the report
3. Handle error on FE and BE
4. Move all services into docker-compose, refactor environment variables
5. Implement unit test
