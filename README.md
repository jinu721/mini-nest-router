# 🧠 NestJS Decorator Internals with Dependency Injection

A minimal TypeScript project that explains how **NestJS-style decorators** like `@Controller`, `@Get`, `@Post`, and `@Injectable` work **under the hood** using `reflect-metadata`.

> Understand how NestJS handles **routing and dependency injection** – by building a mini version of it from scratch.

---

## 📋 Overview

This project teaches you:

✅ How `@Controller`, `@Get`, and `@Post` decorators work.

✅ How NestJS uses `Reflect.defineMetadata()` / `Reflect.getMetadata()`.

✅ How to create a simple **DI (Dependency Injection)** container.

✅ How classes automatically get their dependencies injected.

✅ How controllers and methods are scanned and executed based on metadata.

---

## 📚 What You’ll Learn

* How to build class & method decorators (`@Controller`, `@Injectable`, etc.)
* How to attach and read metadata using `reflect-metadata`
* How NestJS maps HTTP routes using decorator metadata
* How to simulate basic request handling without Express
* How to create a recursive dependency injector using TypeScript

---

## 📁 Project Structure

```
nestjs-decorator-under-the-hood/
├── src/
│   └── app.ts              # All logic and decorators in one file
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript config (with decorators enabled)
└── README.md               # This file
```

---

## 🚀 Getting Started

### 🔧 Prerequisites

* Node.js (v16+)
* TypeScript (`npm install -g typescript`)
* ts-node (`npm install -g ts-node`)

---

### ▶️ Run the App

```bash
git clone https://github.com/jinu721/mini-nest-router.git
cd mini-nest-router

npm install
npm run start
```

Or run manually:

```bash
ts-node src/app.ts
```

---

## 🧪 What the App Does

1. You define decorators like `@Controller`, `@Get`, `@Post`, and `@Injectable`.

2. The `@Module()` decorator declares which services and controllers to use.

3. The `bootstrapModule()` function:

   * Resolves all services (aka providers) and stores them in a container.
   * Resolves controllers and injects dependencies automatically.
   * Scans controller methods and reads `@Get` and `@Post` metadata.
   * Logs routes and simulates method calls.

4. The `resolve()` function:

   * Uses `Reflect.getMetadata('design:paramtypes', ...)` to read constructor dependencies.
   * Recursively resolves those dependencies.
   * Automatically injects them when creating objects.

---

## 🔍 Example Output

```bash
Resolving dependencies [UserService]
Resolving dependencies []
Mapped GET /users/ -> UserController.getAllUsers()
GET /users -> [ 'user1', 'user2' ]
Mapped POST /users/ -> UserController.createUser()
POST /users -> Creating user...
```

---

## 🧠 Key Concepts

| Concept         | Description                                             |
| --------------- | ------------------------------------------------------- |
| `@Controller()` | Adds a base route path to the class                     |
| `@Get(path)`    | Tags a method to handle GET requests                    |
| `@Post(path)`   | Tags a method to handle POST requests                   |
| `@Injectable()` | Marks a class to be available for injection             |
| `@Module()`     | Defines what to register (controllers and providers)    |
| `resolve()`     | The DI function that handles recursive injection        |
| `container`     | Stores all singleton instances to avoid recreating them |

---

## 🧩 Sample Code

### ✅ Controller

```ts
@Controller('/users')
class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  getAllUsers() {
    const users = this.userService.getUsers();
    console.log("GET /users ->", users);
  }

  @Post('/')
  createUser() {
    console.log("POST /users -> Creating user...");
  }
}
```

### ✅ Service

```ts
@Injectable()
class UserService {
  getUsers() {
    return ['user1', 'user2'];
  }
}
```

### ✅ Module

```ts
@Module({
  providers: [UserService],
  controllers: [UserController],
})
class AppModule {}
```

---

## ⚙️ Under the Hood

### Decorators store metadata:

```ts
Reflect.defineMetadata("basePath", "/users", UserController);
Reflect.defineMetadata("method", "GET", getAllUsers);
Reflect.defineMetadata("path", "/", getAllUsers);
```

### Dependency injection works by:

```ts
const dependencies = Reflect.getMetadata("design:paramtypes", UserService);
// [UserRepository] for example

const instance = new UserService(...resolvedDependencies);
container.set(UserService, instance);
```

---

## 💡 Suggestions for Improvement

* Add `@Put`, `@Delete`, and `@Patch` decorators
* Add real Express/Fastify routing
* Add middleware/guards simulation
* Add unit tests for route scanning and injection
* Export route map as JSON

---

## 📦 Dependencies

* [`typescript`](https://www.npmjs.com/package/typescript)
* [`reflect-metadata`](https://www.npmjs.com/package/reflect-metadata)
* [`ts-node`](https://www.npmjs.com/package/ts-node)

---

## 🧾 License

MIT License – Feel free to use, fork, and contribute.

---

## 👤 Author

Built with ❤️ by **jinu**
📧 Email: [jinu8683@gmail.com](mailto:jinu8683@gmail.com)
🔗 GitHub: [github.com/jinu721](https://github.com/jinu721)

---

**Happy learning! Dive deep into how frameworks like NestJS actually work.** 🚀

