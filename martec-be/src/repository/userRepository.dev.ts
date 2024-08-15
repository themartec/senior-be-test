import { Database } from 'sqlite3'
import path from 'path'
import { UserDAO } from '@/model/dao'

// Open the database connection
const dbPath = path.resolve(__dirname, 'database.sqlite3')
const db = new Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database:', err.message)
  } else {
    console.log('Connected to database')
  }
})

export const saveMetadata = (email: string, integrationType: string, key: string, data: string) => {
  const compositeKey = email + integrationType + key
  return new Promise<string>((resolve, reject) => {
    db.run(
      'INSERT OR REPLACE INTO metadata (composite_key, user_name, type, key, value) VALUES (?, ?, ?, ?, ?)',
      [compositeKey, email, integrationType, key, data],
      (err) => err ? reject(err) : resolve('success')
    )
  })
}

export const getUserTokensByIntegration = (googleId: string, provider: string) => {
  return new Promise<UserDAO>((resolve, reject) => {
    db.all(
      'SELECT * FROM metadata WHERE user_name = ? and type = ?',
      [googleId, provider],
      (err, rows: any) => err ? reject(err) : resolve(rows))
  })
}

export const getUserMetadata = (userID: string) => {
  return new Promise<any>((resolve, reject) => {
    db.all(
      'SELECT * FROM metadata WHERE user_name = ?',
      [userID],
      (err, rows: any) => err ? reject(err) : resolve(rows)
    )
  })
}

export const deleteUser = (googleId: string) => {
  return new Promise<void>((resolve, reject) => {
    db.run(
      'DELETE FROM users WHERE google_id = ?',
      [googleId],
      (err) => err ? reject(err) : resolve()
    )
  })
}

export { db }
