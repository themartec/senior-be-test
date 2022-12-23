import { Injectable } from '@nestjs/common';
import {DriveFile, Drive} from 'src/app/interfaces/drive.interface'
import { Request, Response } from 'express';
import { unlink } from 'node:fs/promises';

const fs = require('fs').promises;
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');

var path = require("path");
const {google} = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const TOKEN_PATH = path.join(process.cwd(), './resources/token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), './resources/credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist(request : Request) {
  try {
    // const content = await fs.readFile(TOKEN_PATH);
    const content = request.cookies['GG_TOKEN']
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client, response: Response) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  // await fs.writeFile(TOKEN_PATH, payload);
  response.cookie('GG_TOKEN', payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
export async function authorize(request: Request, response: Response) {
  let client = await loadSavedCredentialsIfExist(request);
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client, response);
  }
  return client;
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
export async function listFiles(authClient) {
  const drive = google.drive({version: 'v3', auth: authClient});
  const res = await drive.files.list({
    pageSize: 50,
    fields: 'nextPageToken, files(id, name, webViewLink, webContentLink, iconLink)',
  });
  const files = res.data.files.map(function(item){
    const driveFile: DriveFile = {id: item.id, name: item.name, link: item.webViewLink, icon: item.iconLink, downloadLink: '/drives/google-drive/'+item.id};
    return driveFile;
  });
  if (files.length === 0) {
    console.log('No files found.');
    return;
  }
  return files;
}

export async function upload(authClient, file) {
  const drive = google.drive({version: 'v3', auth: authClient});
  const res = await drive.files.create({
    resource: {
      name: file.originalname,
    },
    media: {
      mimeType: file.mimetype,
      body: fs.createReadStream('tempFolder/' + file.filename),
    },   
    fields: 'id'
  });
  unlink('tempFolder/' + file.filename);
  return res.data.id;
}
/**
 * Downloads a file
 * @param{string} realFileId file ID
 * @return{obj} file status
 * */
export async function download(authClient, fileId) {
  const drive = google.drive({version: 'v3', auth: authClient});
 try {
    const file = await drive.files.get({
      fileId: fileId,
      alt: 'media',
    });
    console.log(file);
    return file.status;
  } catch (err) {
    // TODO(developer) - Handle error
    throw err;
  }
}