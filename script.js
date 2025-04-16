document.getElementById("inscriptionBtn").onclick = function () {
    document.getElementById("formulaire").style.display = "block";
  };

  document.getElementById("formulaire").onsubmit = function (e) {
    e.preventDefault();
    const role = document.querySelector('input[name="role"]:checked');

    if (!role) {
      alert("Veuillez sélectionner Étudiant ou Enseignant.");
      return;
    }

    if (role.value === "etudiant") {
      alert("Redirection vers l’espace étudiant...");
    } else {
      alert("Redirection vers l’espace enseignant...");
    }
  };