# Life Rhythm - Project Structure

## 📦 Architecture

This project follows a **Modular Monolith + Clean Architecture (Lite)** approach.

Layers:

- app → HTTP Layer
- modules → Business Logic
- infrastructure → Technical Implementations
- shared → Utilities

---

## 🗂 Root Structure

### prisma/

Contains database schema and migrations.

- schema.prisma → Database schema definition
- migrations/ → Database migration history

---

### src/app/

Next.js App Router.

Contains:

- UI pages
- API route handlers

This layer should NOT contain business logic.

---

### src/modules/

Core business modules.

Each module contains:

- *.service.ts → Business logic
- *.repo.ts → Database access
- *.types.ts → Module types

Example:

modules/user/
- user.service.ts
- user.repo.ts
- user.types.ts

Modules must not directly depend on HTTP layer.

---

### src/infrastructure/

Technical layer.

Contains:

- prisma.ts → Prisma singleton
- logger.ts → Logging
- env.ts → Environment validation

Infrastructure should not contain business logic.

---

### src/shared/

Pure reusable utilities.

Contains:

- utils/
- constants/
- shared types

No database or business logic here.

---

## 🧠 Design Principles

1. Business logic lives in modules
2. HTTP layer only calls services
3. Database access only inside repositories
4. Prisma client is a singleton
5. No direct Prisma calls inside route handlers

---

## 🚀 Future Scalability

This structure allows:

- Easy microservice extraction
- Testing modules independently
- Scaling business logic
- Adding Redis / Queue / Stripe later

---

## 📌 Development Flow

HTTP → Service → Repository → Prisma → Database