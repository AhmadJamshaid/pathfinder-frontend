const http = require('http');

const data = JSON.stringify({
  interests: "coding, art",
  strengths: "problem solving",
  skill_level: "Confident",
  work_preference: "Small team",
  career_intent: "Freelancing",
  time_commitment: "Full time",
  core_goal: "Earn money quickly",
  extra_depth: ""
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/analyze-path',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (d) => { body += d; });
  res.on('end', () => {
    try {
        console.log("STATUS:", res.statusCode);
        const json = JSON.parse(body);
        console.log("KEYS:", Object.keys(json.data));
        if (json.data.careers) {
            console.log("CAREERS TYPE:", typeof json.data.careers);
            console.log("IS ARRAY:", Array.isArray(json.data.careers));
            console.log("CAREERS LENGTH:", json.data.careers.length);
        } else {
            console.log("DATA PAYLOAD:", JSON.stringify(json, null, 2));
        }
    } catch(e) {
        console.log("BODY:", body.substring(0, 500));
    }
  });
});

req.on('error', (error) => {
  console.error("HTTP ERROR:", error);
});

req.write(data);
req.end();
