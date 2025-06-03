document.getElementById('articleForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  const response = await fetch('/api/add-article', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ title, content })
  });

  if (response.ok) {
    alert('Article added successfully!');
    document.getElementById('articleForm').reset();
  } else {
    alert('Failed to add article.');
  }
});
