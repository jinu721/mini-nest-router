import "reflect-metadata";

function Controller(basePath: string): ClassDecorator {
  return function (target: any) {
    Reflect.defineMetadata("basePath", basePath, target);
  };
}

function Get(path: string): MethodDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    if (!descriptor || typeof descriptor.value !== "function") {
      throw new Error("Decorator can only be applied to methods.");
    }

    Reflect.defineMetadata("method", "GET", descriptor.value);
    Reflect.defineMetadata("path", path, descriptor.value);
  };
}

function Post(path: string): MethodDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    if (!descriptor || typeof descriptor.value !== "function") {
      throw new Error("Decorator can only be applied to methods.");
    }

    Reflect.defineMetadata("method", "POST", descriptor.value);
    Reflect.defineMetadata("path", path, descriptor.value);
  };
}

@Controller("/users")
class UserController {
  @Get("/")
  getAllUsers() {
    console.log("Returning all users...");
  }

  @Post("/")
  createUser() {
    console.log("Creating user...");
  }
}

function bootstrapControllers(controllers: any[]) {
  controllers.forEach((ControllerClass) => {
    const instance = new ControllerClass();
    const prototype = Object.getPrototypeOf(instance);
    const basePath = Reflect.getMetadata("basePath", ControllerClass);

    Object.getOwnPropertyNames(prototype).forEach((methodName) => {
      if (methodName === "constructor") return;

      const method = prototype[methodName];
      const methodType = Reflect.getMetadata("method", method);
      const methodPath = Reflect.getMetadata("path", method);

      if (methodType && methodPath !== undefined) {
        const fullPath = basePath + methodPath;

        console.log(
          `Mapped ${methodType} ${fullPath} -> ${ControllerClass.name}.${methodName}()`
        );

        method.call(instance);
      }
    });
  });
}

bootstrapControllers([UserController]);
