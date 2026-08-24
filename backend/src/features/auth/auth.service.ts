import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {db} from '../../config/database'
import {LoginInput, RegisterInput, User} from './auth.types'

export class AuthService {
  async register({name, email, password}: RegisterInput): Promise<User> {
    const existingUser = db
      .prepare(
        `
        SELECT id
        FROM users
        WHERE email = ?
      `,
      )
      .get(email) as {id: number} | undefined

    if (existingUser) {
      throw new Error('Email already registered')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = db
      .prepare(
        `
        INSERT INTO users (
          name,
          email,
          password
        )
        VALUES (?, ?, ?)
      `,
      )
      .run(name, email, hashedPassword)

    const userId = Number(result.lastInsertRowid)

    return this.getUserById(userId)!
  }

  getUserById(id: number): User | undefined {
    return db
      .prepare(
        `
        SELECT id, name, email
        FROM users
        WHERE id = ?
      `,
      )
      .get(id) as User | undefined
  }

  getUserByEmail(email: string) {
    return db
      .prepare(
        `
        SELECT id, name, email, password
        FROM users
        WHERE email = ?
      `,
      )
      .get(email) as
      | {
          id: number
          name: string
          email: string
          password: string
        }
      | undefined
  }

  async login({email, password}: LoginInput) {
    const normalizedEmail = email.trim().toLowerCase()

    const user = this.getUserByEmail(normalizedEmail)

    if (!user) {
      throw new Error('Invalid email or password')
    }

    const passwordMatches = await bcrypt.compare(password, user.password)

    if (!passwordMatches) {
      throw new Error('Invalid email or password')
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1d',
      },
    )

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }
  }
}
