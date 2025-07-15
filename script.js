// Get references to the DOM elements
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const responseContainer = document.getElementById('response');

// Create an array to store the conversation history
const messages = [
  {
    role: 'system',
    content: `You are a friendly Budget Travel Planner, specializing in cost-conscious travel advice. You help users find cheap flights, budget-friendly accommodations, affordable itineraries, and low-cost activities in their chosen destination.

If a user's query is unrelated to budget travel, respond by stating that you do not know.`
  }
];

// Listen for form submission
chatForm.addEventListener('submit', async function(event) {
  event.preventDefault(); // Stop the page from reloading

  // Get the user's question from the input box
  const userQuestion = userInput.value;

  // Clear the input box for the next question
  userInput.value = '';

  // Add the user's message to the conversation history
  messages.push({ role: 'user', content: userQuestion });

  // Show a loading message
  responseContainer.innerText = "Thinking...";

  // Send a POST request to the OpenAI API
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST', // We are POST-ing data to the API
    headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
      'Authorization': `Bearer ${apiKey}` // Use the API key from secrets.js
    },
    // Send model details and full conversation history
    body: JSON.stringify({
      model: 'gpt-4o', // Use the gpt-4o model
      messages: messages
    })
  });

  // Parse and store the response data
  const result = await response.json();

  // Get the AI's reply
  const aiReply = result.choices[0].message.content;

  // Add the assistant's reply to the conversation history
  messages.push({ role: 'assistant', content: aiReply });

  // Show the AI's reply on the page, preserving line breaks
  responseContainer.innerHTML = aiReply.replace(/\n/g, '<br>');
});