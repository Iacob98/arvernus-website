/**
 * Generate a bcrypt hash for admin password
 * Run with: npx tsx scripts/generate-password-hash.ts <password>
 */
import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Usage: npx tsx scripts/generate-password-hash.ts <password>");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
console.log("\nGenerated hash:");
console.log(hash);
console.log("\nAdd to .env:");
console.log(`ADMIN_PASSWORD_HASH="${hash}"`);
