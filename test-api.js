const payload = { 
  interests: "coding, video games, system architecture", 
  strengths: "math, lateral thinking", 
  skill_level: "Intermediate", 
  work_preference: "Remote / Independent", 
  career_intent: "Freelance / High tech", 
  time_commitment: "40 hours", 
  core_goal: "Maximize income rapidly", 
  extra_depth: "I enjoy high-stakes problem solving." 
};

console.log("Mocking frontend POST request to local API...");

try {
  const response = await fetch("http://localhost:3000/api/analyze-path", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  console.log("\n--- FULL RESPONSE PAYLOAD ---");
  console.log(JSON.stringify(data, null, 2));
} catch (e) {
  console.error("API error:", e);
}
