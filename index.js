import { config } from "dotenv";
import { GoogleGenAI , Type } from "@google/genai";
import { tavily } from "@tavily/core";
import readLine from "readline";

config()

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

const tvly = tavily({
    apiKey: process.env.TAVILY_API_KEY
})

//Declaration of the tool
const searchWebTool = {
    name: "search_web",
    description: "Useful for when you need to answer questions about current events.",
    parameters: {
        type: Type.OBJECT,
        properties: {
            query: {
                type: Type.STRING,
                description: "Search query to find relevant information"
            }
        },
        required: ['query'],
    }
}


//Implementation of the tool
const tools = {
    "search_web": async ({ query }) => {
        const response = await tvly.search(query);
        // console.log(response)
        return response.results;
    }
}


// .then(resonse=>{
//     response.functionCalls.map(async(call)=>{
//         const result = await tools[call.name](call.arguments);
//         console.log(result)
//     })
// })

// Create an interface for input and output
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

const history = []

while (true) {
    if (history[history.length - 1]?.role !== "user") {
        const message = await new Promise(resolve => rl.question("user: ", resolve));
        history.push({ role: "user", parts: [{ text: message }] })
    }

    const aiResponse = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: history,
        config: {
            tools: [{functionDeclarations: [searchWebTool] }],
            systemInstruction: `You can use this tool to get more information`
        }
    })

    if (aiResponse.functionCalls && aiResponse.functionCalls[0]) {
        const result = await tools[aiResponse.functionCalls[0].name](aiResponse.functionCalls[0].args);

        const content = result.map(con => con.content).join("\n")

        history.push({
            role: "user",
            parts: [{
                text: `
            I searched the web for "${aiResponse.functionCalls[0].args.query}" and found the following information:${content}
            `
            }]
        })
    }
    else {
        history.push({
            role: "model",
            parts: [{ text: aiResponse.text }]
        })
        console.log("AI:", aiResponse.text)
    }
}