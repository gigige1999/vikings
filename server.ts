import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// Lazy initialization of GoogleGenAI
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY is not configured or is a placeholder.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API: Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// API: Explain historical terms in different perspectives
app.post("/api/explain", async (req, res) => {
  try {
    const { term, context, perspective } = req.body;
    if (!term) {
      res.status(400).json({ error: "Term is required" });
      return;
    }

    let systemInstruction = "You are an expert historian specializing in Anglo-Saxon and Viking Age Britain (793-1066).";
    
    if (perspective === "monk") {
      systemInstruction = `You are Brother Cynewulf, a pious Anglo-Saxon monastic chronicler living in the Kingdom of Wessex in the 9th century. 
Write your answer in a formal, deeply religious, and slightly dramatic 9th-century translation style. 
Refer to historical events with moral lessons, write about Viking raiders as 'the heathen host' or 'northmen', and Anglo-Saxons as 'pious Christians' under God's trial. 
Use archaic, medieval prose. Keep the response to 2-3 short, highly atmospheric paragraphs.`;
    } else if (perspective === "scald") {
      systemInstruction = `You are Egil, a fierce and wise Viking Skald (court poet) from Norway. 
Explain this term with Norse pride, mentioning the gods (Odin, Thor, Freyja), the glory of battle, shield walls, and crossing the cold North Sea in longships. 
Weave rich, bold metaphors (kennings, e.g., calling the sea 'the whale's road', gold 'the serpent's hoard'). 
Keep the explanation engaging, epic, and written in 2-3 short, powerful paragraphs with occasional alliterative lines.`;
    } else if (perspective === "royal") {
      systemInstruction = `You are a royal scribe under the direct patronage of King Alfred the Great. 
Your tone is intellectual, measured, strategic, and patriotic. 
Focus on law, fortifications, the defense of Wessex, negotiations, and the preservation of learning and English culture. 
Keep the response to 2-3 clear, historical, and well-formulated chronicle paragraphs.`;
    }

    const prompt = `Explain the historical term or concept "${term}" within the context of "${context || "Viking-era Britain"}". Provide deep historical accuracy while staying fully in character as defined by your instruction.`;

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ explanation: response.text });
  } catch (error: any) {
    console.error("Gemini Explain API Error:", error.message);
    res.json({
      explanation: `*The parchment is smudged with soot and dust, but the local records reveal this:* \n\n**${req.body.term}** refers to a significant aspect of the Viking Age in Britain. (Note: Gemini API key is not fully configured, presenting offline chronicle log instead: "${error.message}")`
    });
  }
});

// API: Translate modern English text into old-fashioned prose
app.post("/api/translate", async (req, res) => {
  try {
    const { text, style } = req.body;
    if (!text) {
      res.status(400).json({ error: "Text is required" });
      return;
    }

    let systemInstruction = "You are a master of early medieval English and Old Norse literature and linguistic style.";
    let prompt = "";

    if (style === "old-english") {
      systemInstruction = "You translate modern English text into a highly stylized, poetic Anglo-Saxon chronicle translation, mimicking the style of 'Beowulf' or the 'Anglo-Saxon Chronicle'. Use words like 'hark', 'verily', 'the shield-bearers', 'slaughter', and heavy alliteration. Frame the event with epic gravity.";
      prompt = `Translate the following text into authentic-sounding, atmospheric Old English-styled poetic chronicle prose (keep the English readable but thoroughly archaic and epic): \n\n"${text}"`;
    } else if (style === "skaldic-verse") {
      systemInstruction = "You translate modern text into epic Viking skaldic poetry. Use traditional kennings (e.g., 'sea-stallion' for ship, 'wound-gallows' for shield, 'storm of swords' for battle). Arrange the translation in short, staccato, rhythmic verses or stanzas.";
      prompt = `Translate this modern text into a traditional Viking skaldic poem with 2-3 stanzas of high-impact alliterative verse: \n\n"${text}"`;
    } else {
      systemInstruction = "You translate text into the dry, objective but atmospheric style of a 10th-century Anglo-Saxon monastic chronicle entry (e.g. 'In this year, by the grace of God, a fleet of heathen ships arrived...').";
      prompt = `Translate this text into a 10th-century Monastic Chronicle entry: \n\n"${text}"`;
    }

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    res.json({ translation: response.text });
  } catch (error: any) {
    console.error("Gemini Translate API Error:", error.message);
    res.json({
      translation: `*Heed these words, traveler:* \n\nVerily, the runes are hard to read when the light grows dim, but thus does the story unfold: "${req.body.text}" \n\n*(Translation server offline: ${error.message})*`
    });
  }
});

// Start server
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Viking Chronicle Server] running on http://localhost:${PORT}`);
  });
}

start();
