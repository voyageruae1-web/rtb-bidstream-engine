const fs = require("fs");
const { execSync } = require("child_process");

const FILE = "PROJECT_STATE.md";

// --------------------
// GET CHANGES
// --------------------
function getChanges() {
  return execSync("git status --porcelain", { encoding: "utf-8" })
    .split("\n")
    .filter(Boolean);
}

// --------------------
// DETECT SERVICES
// --------------------
function detectServices(changes) {
  const services = new Set();

  changes.forEach(line => {
    if (line.includes("gateway-service")) services.add("gateway-service");
    if (line.includes("auction-engine")) services.add("auction-engine");
    if (line.includes("ranking-engine")) services.add("ranking-engine");
    if (line.includes("analytics-consumer")) services.add("analytics-consumer");
  });

  return [...services];
}

// --------------------
// DETECT KAFKA USAGE
// --------------------
function detectKafka() {
  const files = execSync("git diff --name-only", { encoding: "utf-8" })
    .split("\n")
    .filter(Boolean);

  let kafka = {
    producer: false,
    consumer: false
  };

  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, "utf-8");

      if (content.includes("producer.send")) kafka.producer = true;
      if (content.includes("consumer.run")) kafka.consumer = true;

    } catch {}
  });

  return kafka;
}

// --------------------
// UPDATE STATE FILE
// --------------------
function updateState(services, kafka) {
  let now = new Date().toISOString();

  let content = `
# RTB Bidstream Engine — PROJECT STATE

🕒 Last Updated: ${now}

---

## 🧭 ACTIVE SERVICES

${services.map(s => `- ${s}`).join("\n") || "- None detected"}

---

## ⚡ KAFKA STATUS

- Producer: ${kafka.producer ? "ACTIVE" : "INACTIVE"}
- Consumer: ${kafka.consumer ? "ACTIVE" : "INACTIVE"}

---

## 🔁 PIPELINE STATUS

Gateway → Kafka → Auction → Ranking → Analytics

(Current auto-detected partial state)

---

`;

  fs.writeFileSync(FILE, content);
}

// --------------------
// RUN
// --------------------
function run() {
  const changes = getChanges();
  const services = detectServices(changes);
  const kafka = detectKafka();

  updateState(services, kafka);

  console.log("✅ PROJECT_STATE.md auto-updated");
}

run();