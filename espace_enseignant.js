async function genererLien() {
  const titre = document.getElementById("titre").value;
  const description = document.getElementById("description").value;
  const publicCible = document.getElementById("public").value;

  if (!titre || !description || !publicCible) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/exams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ titre, description, publicCible })
    });

    const data = await response.json();
    if (response.ok) {
      document.getElementById('uniqueLink').textContent = data.lien;
      alert("Lien généré avec succès !");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Erreur:', error);
    alert("Erreur lors de la génération du lien.");
  }
}

function addQuestion() {
  window.location.href = "ajouter_question.html";
}