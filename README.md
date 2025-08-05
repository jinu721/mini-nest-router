# 🧠 NestJS Decorator Under the Hood

A minimal TypeScript project that explains how **NestJS decorators** like `@Controller`, `@Get`, and `@Post` work **internally** using `reflect-metadata`.

> Learn how NestJS maps routes using metadata and decorators — by building it from scratch!

---

## 📋 Overview

This project helps you understand:

✅ How `@Controller`, `@Get`, and `@Post` decorators actually work.

✅ How NestJS uses `Reflect.defineMetadata()` and `Reflect.getMetadata()` under the hood.

✅ How classes and methods are tagged with route information (like base path, HTTP method, etc.).

✅ How the app can scan and simulate routing without using Express or Fastify.

---

## 📚 What You’ll Learn

- How **class and method decorators** work in TypeScript
- How to use **`reflect-metadata`** to attach and read metadata
- How frameworks like **NestJS** use decorators to register routes
- How to simulate route mapping and method execution

---

## 📁 Project Structure

```

nestjs-decorator-under-the-hood/
├── src/
│   └── app.ts              # Main file with decorators and logic
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript config (with decorator support)
└── README.md               # This file

````

---

## 🚀 How to Run the Project

### 🔧 Prerequisites

- Node.js (v16 or above)
- TypeScript (`npm install -g typescript`)
- ts-node (`npm install -g ts-node`)

---

### ▶️ Run the App

1. **Clone the repository**

```bash
git clone https://github.com/<your-username>/nestjs-decorator-under-the-hood.git
cd nestjs-decorator-under-the-hood
````

2. **Install dependencies**

```bash
npm install
```

3. **Run the TypeScript file**

```bash
npm run start
```

---

## 🧪 How It Works

1. You define decorators:

   * `@Controller(basePath)` marks a class with a route prefix.
   * `@Get(path)` and `@Post(path)` mark class methods as HTTP handlers.

2. Decorators use `Reflect.defineMetadata()` to save this info:

   * The class gets a `basePath` tag.
   * Methods get `method` (GET/POST) and `path`.

3. The `bootstrapControllers()` function:

   * Instantiates the controller
   * Scans all its methods
   * Reads the metadata with `Reflect.getMetadata()`
   * Logs which HTTP method and path maps to which class method

---

## 🔍 Sample Output

```bash
Mapped GET /users/ -> UserController.getAllUsers()
Returning all users...

Mapped POST /users/ -> UserController.createUser()
Creating user...
```

---

## 🔧 Sample Code

Here’s a short version of what the project does:

```ts
@Controller('/users')
class UserController {
  @Get('/')
  getAllUsers() {
    console.log('Returning all users...');
  }

  @Post('/')
  createUser() {
    console.log('Creating user...');
  }
}
```

Under the hood, we’re doing this:

```ts
Reflect.defineMetadata('method', 'GET', getAllUsers);
Reflect.defineMetadata('path', '/', getAllUsers);
```

And reading it like this:

```ts
Reflect.getMetadata('method', method); // 'GET'
Reflect.getMetadata('path', method);   // '/'
```

---

## 💡 Possible Improvements

* Add real routing using Express or Fastify
* Add `@Put`, `@Delete`, `@Patch` decorators
* Add middleware or guards
* Implement simple dependency injection
* Export route map as JSON

---

## 📦 Dependencies

* `typescript`
* `reflect-metadata`
* `ts-node` (for running TypeScript without compiling)

---

## 🧾 License

This project is licensed under the **MIT License** – feel free to use, change, or contribute.

---

## 👤 Author

Built with ❤️ by **jinu**
📧 Email: [jinu8683@gmail.com](mailto:jinu8683@gmail.com)
🔗 GitHub: [github.com/jinu721](https://github.com/jinu721)

---

**Happy Coding! 🚀 Learn the internals, not just the syntax.**

