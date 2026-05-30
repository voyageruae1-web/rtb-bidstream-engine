const fs = require("fs");
const path = require("path");

// -----------------------------
// CONFIG
// -----------------------------
const ROOT = process.cwd();
const OUTPUT_FILE = path.join(ROOT, "PROJECT_STATE.md");

// Microservices you already have
const SERVICES = [
  "gateway-service",
  "auction-engine",
  "ranking-engine",
  "campaign-service",
  "analytics-consumer",
];

// Phase tracker (manual but auto-injected)
const PHASES = {
  "gateway-service": "Phase 2",
  "auction-engine": "Phase 3",
  "ranking-engine": "Phase 2",
  "campaign-service": "Phase 2",
  "analytics-consumer": "Phase 2",
};

// -----------------------------
// HELPERS
// -----------------------------
function exists(dir) {
  return fs.existsSync(path.join(ROOT, dir));
}

function getPackageInfo(service) {
  const pkgPath = path.join(ROOT, service, "package.json");
  if (!fs.existsSync(pkgPath)) return null;

  try {
    return JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  } catch {
    return null;
  }
}

// -----------------------------
// BUILD STATE
// -----------------------------
let output = `# RTB Bidstream Engine — PROJECT STATE\n\n`;

output += `🕒 Last Updated: ${new Date().toISOString()}\n\n`;

// -----------------------------
// PHASE OVERVIEW
// -----------------------------
output += `## 🧭 Phase Tracker\n\n`;
Object.entries(PHASES).forEach(([svc, phase]) => {
  output += `- ${svc}: ${phase}\n`;
});

output += `\n---\n`;

// -----------------------------
// SERVICE STATUS
// -----------------------------
output += `## 🏗️ Service Status\n\n`;
output += `| Service | Exists | Phase | Package |\n`;
output += `|--------|--------|------|----------|\n`;

SERVICES.forEach((svc) => {
  const ok = exists(svc) ? "✔" : "❌";
  const phase = PHASES[svc] || "Unknown";
  const pkg = getPackageInfo(svc);
  const version = pkg?.version || "-";

  output += `| ${svc} | ${ok} | ${phase} | ${version} |\n`;
});

output += `\n---\n`;

// -----------------------------
// ARCHITECTURE SNAPSHOT
// -----------------------------
output += `## ⚙️ Architecture Flow\n\n`;
output += `
Gateway Service → Auction Engine → Ranking Engine → Redis → ClickHouse  
Campaign Service → Auction Engine → Ranking Engine  
Analytics Consumer → ClickHouse  
`;

// -----------------------------
// WRITE FILE
// -----------------------------
fs.writeFileSync(OUTPUT_FILE, output);

console.log("✅ PROJECT_STATE.md generated successfully!");