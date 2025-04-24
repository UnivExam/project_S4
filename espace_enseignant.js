function genererLien() {
    const titre = document.getElementById("titre").value;
    const description = document.getElementById("description").value;
    const publicCible = document.getElementById("public").value;

    if (!titre || !description || !publicCible) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const exam = { titre, description, publicCible };
    localStorage.setItem("baseExam", JSON.stringify(exam));

    const lien = `${window.location.origin}/ajouter_question.html`;
    alert("Lien généré : " + lien);
  }

  function addQuestion() {
    const titre = document.getElementById("titre").value;
    const description = document.getElementById("description").value;
    const publicCible = document.getElementById("public").value;

    if (!titre || !description || !publicCible) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const baseExam = { titre, description, publicCible };
    localStorage.setItem("baseExam", JSON.stringify(baseExam));
    window.location.href = "ajouter_question.html";
  }
  function genererLien() {
    const link = 'https://exam-platform.com/exam/' + Math.random().toString(36).substr(2, 9);
    document.getElementById('uniqueLink').textContent = link;
  }