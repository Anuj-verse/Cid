const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateMemeCaption = async (characterName, context) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
      You are a meme generator for the Indian TV show CID.
      Generate a funny, Hinglish (Hindi + English) meme caption (Top Text AND Bottom Text) for the character: "${characterName}".
      
      Context/Situation: "${context}"
      
      Character Personalities:
      - ACP Pradyuman: Suspicious, uses hand gestures, says "Kuch toh gadbad hai", "Darwaza tod do", analytical but dramatic.
      - Abhijeet: Serious but sometimes romantic or confused, loyal to ACP, gets angry easily.
      - Daya: Strong, breaks doors ("Darwaza tod do"), slap-happy, obedient.
      
      Output strictly in JSON format like this:
      {
        "topText": "...",
        "bottomText": "..."
      }
      Do not include markdown formatting like \`\`\`json. Just the raw JSON string.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(text);
    } catch (error) {
        console.error("Error generating meme caption:", error);
        throw new Error("Failed to generate meme caption");
    }
};

module.exports = { generateMemeCaption };
