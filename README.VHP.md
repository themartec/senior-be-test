# API for Video Processing with FFmpeg

## Table of contents:

- [Pre-requirement](#pre-requirement)
- [Installtion](#installation)
- [Starting server](#starting-server)
- [Scope of API include](#scope-of-api-include)
- [Testing](#sesting)

# Pre-requirements

To build and run this app locally you will need a few things:
- Node v16.17.1
- Npm 9.1.3
- FFmpeg
- Git
- VSCode

# Installation

- Clone the repository

```
git clone --depth=1 <link-repo> <project_name>
```

- Install dependencies

```
$ cd <project_name>
$ npm install
```

- Create Storage folder

```bash
$ mkdir storages
```
```bash
$ mkdir storages/temps
```

- Create file `.env` in your project's directory root. Your Nodejs Application will get ENV from this file.
  After that. change content in this file with value coresponding above step.

```bash
$ cp .env.example .env
```
Note*: FONTS_FILE variable is a font path of system

- Example:
```bash
NODE_ENV=local
PORT=3000
APP_URL=http://localhost:3000
FONTS_FILE=/Windows/Fonts/arial.ttf
INTRO_VIDEO=https://player.vimeo.com/external/181545195.sd.mp4?s=176d502710df829442a83565bb79efbe3c9c0b93&profile_id=164
OUTRO_VIDEO=https://player.vimeo.com/external/181545195.sd.mp4?s=176d502710df829442a83565bb79efbe3c9c0b93&profile_id=164
```

# Starting server

## Environment Local.

- Run your application

```bash
$ npm run start
```

- Check from your browser. Default port is 3000

```sh
http://localhost:3000/api
```

## Scope of API include

1. Input video via http link
2. Allow add Watermark text (multiple) into video above (can set position, size, time, color & font style)
3. Allow add watermark images (multiple) in video above (can set position, size, time)
4. Merge multiple video become final video (example: merge intro & outro into video above)

# Testing

- This repository use Jest.

For run test case unit test.

```bash
$ npm run test
```
