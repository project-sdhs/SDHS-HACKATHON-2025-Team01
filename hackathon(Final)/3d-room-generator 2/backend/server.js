  // === Import Required Modules ===
  import OpenAI from 'openai';               // OpenAI SDK for calling GPT models
  import dotenv from 'dotenv';               // Loads .env variables
  import express from 'express';             // Web server framework
  import cors from 'cors';                   // Allows cross-origin requests
  import path from 'path';                   // Handles file paths
  import { fileURLToPath } from 'url';       // Converts ES module URL to file path

  dotenv.config(); // Load environment variables from .env

  // === Initialize OpenAI Client ===
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,      // Uses API key from .env
  });

  const model = 'gpt-4o';                    // You can change this to gpt-4, gpt-4o, etc.

  // === Setup Express App ===
  const app = express();
  const PORT = 3000;

  app.use(cors());                           // Allow all CORS (development-friendly)
  app.use(express.json());                   // Parse JSON request bodies

  // === Fix __dirname for ES Modules ===
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // === Serve Static Frontend Files ===
  app.use(express.static(path.join(__dirname, '../public'))); // Serve everything in /public
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html')); // Serve homepage
  });

  // === System Prompt: What AI Should Follow Strictly ===
  const systemPrompt = `
  You are an expert architectural layout generator.

  Your job is to return a valid JSON layout for a residential room based on a user's prompt. Follow these rules strictly:

  STRUCTURE:
  - Divide space properly (e.g., bedroom, bathroom, closet).
  - Always show architectural elements (doors, windows, walls, sinks, toilets, etc.).
  - Avoid blocking access paths between zones.
  - Include only what the user describes. No assumptions.

  PLACEMENT:
  - All furniture and elements must be realistically spaced.
  - Avoid overlapping objects.
  - Snap to a logical grid (e.g., 20px spacing).
  - Leave at least 30px walkways where needed.

  SCALING:
  - Use proportional sizing (e.g., beds ≈ 200x150, sinks ≈ 60x40).
  - Keep layout within a 600x600 px canvas.

  FORMAT: Return only a valid JSON like the following:

  {
    "width": 600,
    "height": 600,
    "walls": { "color": "#e0e0e0" },
    "floor": { "color": "#ffffff" },
    "door": {
      "color": "#999999",
      "position": { "x": 0, "y": 270 },
      "size": { "width": 60, "height": 20 }
    },
    "furniture": [
      {
        "type": "bed",
        "color": "#cccccc",
        "position": { "x": 200, "y": 100 },
        "size": { "width": 200, "height": 150 }
      },
      {
        "type": "toilet",
        "color": "#ffffff",
        "position": { "x": 400, "y": 500 },
        "size": { "width": 50, "height": 60 }
      }
    ]
  }
  `;

  // === API Endpoint: Generate Room Layout ===
  app.post('/api/generate-room', async (req, res) => {
    try {
      const { prompt } = req.body;                 // User input prompt
      console.log('User prompt:', prompt);         // Log it for debugging

      // === Send prompt to OpenAI ===
      const completion = await openai.chat.completions.create({
        model,                                     // gpt-4o or gpt-4, etc.
        messages: [
          { role: 'system', content: systemPrompt },  // System rules
          { role: 'user', content: prompt },          // Actual user input
        ],
        temperature: 0.5,                          // Lower temperature = more reliable, less creative
      });

      // === Extract and clean JSON string ===
      let jsonString = completion.choices[0].message.content.trim();
      console.log('Raw AI response:', jsonString);  // Debug raw output

      // === Remove Markdown if AI includes ```json ``` ===
      if (jsonString.startsWith('```json')) {
        jsonString = jsonString.slice(7); // Remove starting ```
      }
      if (jsonString.endsWith('```')) {
        jsonString = jsonString.slice(0, -3); // Remove ending ```
      }

      // === Try Parsing JSON Output ===
      let roomData;
      try {
        roomData = JSON.parse(jsonString); // Parse JSON into object
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        return res.status(500).json({
          success: false,
          error: 'Failed to parse AI JSON', // Tell frontend
        });
      }

      // === Success: Return Room Data ===
      res.json({ success: true, room: roomData });

    } catch (err) {
      // === Handle API or Network Errors ===
      console.error('Error in /api/generate-room:', err);
      res.status(500).json({ success: false, error: err.message || 'Unknown error' });
    }
  });

  // === Start Express Server ===
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
