import "reflect-metadata";

function Controller(basePath: string): ClassDecorator {
  return function (target: any) {
    Reflect.defineMetadata("basePath", basePath, target);
  };
}

function Get(path: string): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    if (!descriptor || !descriptor.value) return;

    Reflect.defineMetadata("method", "GET", descriptor.value);
    Reflect.defineMetadata("path", path, descriptor.value);
  };
}

function Post(path: string): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    if (!descriptor || !descriptor.value) return;

    Reflect.defineMetadata("method", "POST", descriptor.value);
    Reflect.defineMetadata("path", path, descriptor.value);
  };
}

function Injectable(): ClassDecorator {
  return function (target: any) {
    Reflect.defineMetadata("injectable", true, target);
  };
}

function Module(metadata: { providers?: any[]; controllers?: any[] }) {
  return function (target: any) {
    Reflect.defineMetadata("module:metadata", metadata, target);
  };
}

const container = new Map();

function resolve<T>(target: new (...args: any[]) => T): TDI 
      resolve(provider);
    }
  });

  (metadata.controllers || []).forEach((ControllerClass: any) => {
    const controllerInstance = resolve(ControllerClass);
    const prototype = Object.getPrototypeOf(controllerInstance);
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

        method.call(controllerInstance);
      }
    });
  });
}

bootstrapModule(AppModule);
