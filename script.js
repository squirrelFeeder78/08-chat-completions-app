// Get references to the DOM elements
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const responseContainer = document.getElementById('response');

async function main() {
  // Send a POST request to the OpenAI API
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST', // We are POST-ing data to the API
    headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
      'Authorization': `Bearer ${apiKey}` // Include the API key for authorization
    },
    // Send model details and system message
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: `You are an expert Budget Travel Planner who provides concise, budget-friendly travel advice. You help users find cheap flights, affordable accommodations, and low-cost itineraries. If a question isn’t related to budget travel, respond with: 'I do not know.' Keep responses brief and to the point.` },
        { role: 'user', content: 'What are some cheap ways to travel around Europe?'}
      ]
    })
  });
  // Parse and store the response data
  const result = await response.json();
  // Log result to the console
  console.log(result.choices[0].message.content);
};