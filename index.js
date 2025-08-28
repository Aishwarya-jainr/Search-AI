import { GoogleGenAI } from "@google/genai"
import { tavily } from "@tavily/core";


const ai = new GoogleGenAI({ 
    apiKey:"AIzaSyC8av-k4yG_y_GeCjK_yPDn2UEL15K-nx0"
})

const tvly = tavily({
    apiKey:"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"
})

//Declaration of the tool
const searchWebTool = {
    name: "search_web",
    description: "Useful for when you need to answer questions about current events.",
    parameters:{
        type: Type.OBJECT,
        properties: {
            query:{
                type: Type.STRING,
                description:"Search query to find relevant information"
            }
        },
        required:["query"]
    }
}


//Implementation of the tool
const tools= {
    "search_web":async({query})=>{
        const response = tvly.search(query);
        console.log(response)
    }
}

ai.models.generateContent({
    model:"gemini-2.5-flash",
    contents:"What is gemini 2.5 flash?",
    config:{
        tools:[{
            functionDeclarations:[searchWebTool],
        }]
    }
})
.then(resonse=>{
    response.functionCalls.map(async(call)=>{
        const result = await tools[call.name](call.arguments);
        console.log(result)
    })
})
