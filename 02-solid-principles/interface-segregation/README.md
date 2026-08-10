# Interface Segregation Principle (ISP)

> "No client should be forced to depend on methods it does not use."

The **I** in **SOLID**. It states that instead of one large, general-purpose interface, you should have many small, specific interfaces so that classes only need to implement the methods that are actually relevant to them.

## The Problem

Imagine we're building a system that supports multiple cloud providers (e.g. **Amazon** and **Dropbox**). We want a common interface so the rest of our app doesn't care which provider it's talking to.

If we design **one fat interface** with every possible method (file storage, server hosting, CDN, etc.), every provider is forced to implement methods it doesn't actually support — even if that means throwing errors or leaving them empty.

## ❌ Bad Example

```ts
// One "fat" interface that tries to do everything
interface CloudProvider {
  storeFile(name: string): void;
  getFile(name: string): void;
  createServer(region: string): void;
  listServers(region: string): void;
  getCDNAddress(): string;
}

// Amazon supports everything — fine
class Amazon implements CloudProvider {
  storeFile(name: string): void {
    console.log(`Amazon: storing ${name}`);
  }
  getFile(name: string): void {
    console.log(`Amazon: getting ${name}`);
  }
  createServer(region: string): void {
    console.log(`Amazon: creating server in ${region}`);
  }
  listServers(region: string): void {
    console.log(`Amazon: listing servers in ${region}`);
  }
  getCDNAddress(): string {
    return "amazon-cdn-address";
  }
}

// Dropbox only supports file storage,
// but it's FORCED to implement methods it doesn't need!
class Dropbox implements CloudProvider {
  storeFile(name: string): void {
    console.log(`Dropbox: storing ${name}`);
  }
  getFile(name: string): void {
    console.log(`Dropbox: getting ${name}`);
  }

  // Not implemented — violates ISP
  createServer(region: string): void {
    throw new Error("Not implemented: Dropbox has no servers");
  }
  listServers(region: string): void {
    throw new Error("Not implemented: Dropbox has no servers");
  }
  getCDNAddress(): string {
    throw new Error("Not implemented: Dropbox has no CDN");
  }
}
```

**Why this is bad:**
- `Dropbox` is forced to depend on methods (`createServer`, `listServers`, `getCDNAddress`) it will never use.
- Calling `dropbox.createServer(...)` compiles fine but blows up at runtime.
- Any change to the fat interface (e.g. adding a new hosting method) forces **every** implementer to change, even unrelated ones like `Dropbox`.

## ✅ Good Example

Split the single fat interface into small, focused, client-specific interfaces. Each class implements only what it actually supports.

```ts
// Small, focused interfaces — one per capability
interface CloudStorageProvider {
  storeFile(name: string): void;
  getFile(name: string): void;
}

interface CloudHostingProvider {
  createServer(region: string): void;
  listServers(region: string): void;
}

interface CDNProvider {
  getCDNAddress(): string;
}

// Amazon implements everything it actually supports
class Amazon implements CloudStorageProvider, CloudHostingProvider, CDNProvider {
  storeFile(name: string): void {
    console.log(`Amazon: storing ${name}`);
  }
  getFile(name: string): void {
    console.log(`Amazon: getting ${name}`);
  }
  createServer(region: string): void {
    console.log(`Amazon: creating server in ${region}`);
  }
  listServers(region: string): void {
    console.log(`Amazon: listing servers in ${region}`);
  }
  getCDNAddress(): string {
    return "amazon-cdn-address";
  }
}

// Dropbox only implements the interface it actually needs
class Dropbox implements CloudStorageProvider {
  storeFile(name: string): void {
    console.log(`Dropbox: storing ${name}`);
  }
  getFile(name: string): void {
    console.log(`Dropbox: getting ${name}`);
  }
}
```

Consumers now depend only on the capability they care about:

```ts
function backupFile(storage: CloudStorageProvider, fileName: string) {
  storage.storeFile(fileName);
}

function scaleUp(hosting: CloudHostingProvider, region: string) {
  hosting.createServer(region);
}

const amazon = new Amazon();
const dropbox = new Dropbox();

backupFile(amazon, "report.pdf");   // ✅ works
backupFile(dropbox, "report.pdf");  // ✅ works

scaleUp(amazon, "eu-west-1");       // ✅ works
// scaleUp(dropbox, "eu-west-1");   // ❌ compile-time error — Dropbox has no hosting capability, as expected
```

**Why this is good:**
- `Dropbox` no longer implements or depends on methods it doesn't support.
- There are no `"Not implemented"` runtime surprises — the compiler prevents misuse (e.g. calling `createServer` on `Dropbox` is now a type error, not a runtime crash).
- Changes to hosting-related methods only affect classes that implement `CloudHostingProvider`, not `CloudStorageProvider`-only classes like `Dropbox`.
- Each interface has a single, clear responsibility — easy to understand, test, and extend.

## Key Takeaway

If you find yourself writing empty method bodies or `throw new Error("Not implemented")` to satisfy an interface, that's a strong signal the interface is too fat and should be split according to ISP.