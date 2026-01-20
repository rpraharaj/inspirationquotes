# Prompt #23: Build Authentication System

**Category:** Code Generation & Scaffolding
**Best AI Tool:** Claude 4 Opus (security-focused)  
**Difficulty:** Intermediate
**Use Case:** Auth scaffolding for new projects  

---

## 📋 Prompt Template

```
Generate a production-ready authentication system in [framework] using [strategy: JWT/session-based].

REQUIREMENTS:

USER REGISTRATION:
- Email + password (validate email format, password strength: min 8 chars, 1 uppercase, 1 number)
- Hash password with bcrypt (salt rounds: 10)
- Email verification flow (send verification token)
- Return 201 with user (exclude password hash)

LOGIN:
- Verify email + password
- Generate JWT token (payload: userId, email | expiry: 24h)
- Return token + user data
- Rate limiting: max 5 attempts per 15 min per IP

TOKEN MANAGEMENT:
- Refresh token endpoint (extend session)
- Token validation middleware
- Logout (invalidate token - blacklist or short expiry)

PASSWORD RESET:
- Request reset (send email with reset token, 1-hour expiry)
- Verify reset token
- Update password (re-hash)

SECURITY:
- Use bcrypt for password hashing (never plain text)
- JWT secret from environment variables
- HTTPS only (secure flag on cookies if using sessions)
- input sanitization (prevent SQL injection)
- Rate limiting on auth endpoints

OUTPUT FORMAT:

## File 1: routes/auth.routes.js
[All auth endpoints: register, login, logout, reset]

## File 2: controllers/auth.controller.js
[Controller functions with validation, hashing, token generation]

## File 3: middleware/authMiddleware.js
[JWT verification, protected route middleware]

## File 4: models/User.model.js
[User schema with email, passwordHash, emailVerified, resetToken fields]

## File 5: utils/tokenUtils.js
[Generate/verify JWT tokens]

## File 6: utils/emailUtils.js
[Send verification and password reset emails]

⚠️ WARNING: Always review auth code carefully. 
Verify password hashing, token expiration, and session management before deploying.
```

---

## ✅ When to Use This Prompt

- ✅ Auth scaffolding for new projects  
- ✅ You want to ensure consistency and quality
- ✅ You need a structured output from the AI

## ❌ When NOT to Use

- ❌ You haven't reviewed the strict requirements
- ❌ You need a quick, throwaway answer (this prompt is detailed)

---

## 💡 Pro Tips

- **Context Matters:** Ensure you fill in all the bracketed placeholders like `[language]` or `[code]`.
- **Expert Note:** Always review authentication code carefully. This gives you structure, but verify password hashing, token expiration, and session management.
- **Iterate:** If the first result isn't perfect, refine the **Constraints** section.

---

**Last Updated:** 2026-01-17
