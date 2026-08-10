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
