document.getElementById('btn').addEventListener('click', async () => {
    const response = await fetch('/quotes/random');
    const data = await response.json();
    document.getElementById('quote').innerText = `"${data.quote}" — ${data.author}`;
});

async function loadAllQuotes() {
  try {
    const allQuoteContainer = document.getElementById('allQute');
    
    // Check if container exists in DOM
    if (!allQuoteContainer) {
      console.error('Element with id "allQute" was not found in HTML!');
      return;
    }

    const ulElement = document.createElement('ul');

    const response = await fetch('/quotes');
    const data = await response.json();

    data.forEach((item) => {
      const li = document.createElement('li'); 
      li.textContent = `"${item.quote}" — Author: ${item.author}`;
      ulElement.appendChild(li); 
    });

    allQuoteContainer.appendChild(ulElement);
  } catch (error) {
    console.error('Error fetching all quotes:', error);
  }
}

// Execute on page load
loadAllQuotes();