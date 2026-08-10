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