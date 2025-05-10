// Affiche le formulaire de connexion
document.getElementById("connexionBtn").onclick = function () {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("signupForm").style.display = "none";
};

// Affiche le formulaire d'inscription
document.getElementById("inscriptionBtn").onclick = function () {
  document.getElementById("signupForm").style.display = "block";
  document.getElementById("loginForm").style.display = "none";
};

// Fonction pour gérer la connexion
function submitLogin(e) {
  e.preventDefault();

  const email = document.getElementById("email_connexion").value;
  const password = document.getElementById("pass").value;
  const role = document.querySelector('input[name="role"]:checked');

  if (email && password) {
    if (!role) {
      alert("Veuillez sélectionner Étudiant ou Enseignant.");
      return;
    }

    // Redirection selon le rôle
    if (role.value === "etudiant") {
      window.location.href = "espace_etudiant.html";
    } else {
      window.location.href = "espace_enseignant.html";
    }

    document.getElementById("loginForm").style.display = "none";

  } else {
    alert("Veuillez remplir tous les champs.");
  }
}

// Fonction pour gérer l’inscription
function submitSignup(e) {
  e.preventDefault();
// Dans la fonction submitSignup
localStorage.setItem("userRole", role.value);
localStorage.setItem("userEmail", email);
localStorage.setItem("userName", name + " " + firstName);
window.location.href = "espace_enseignant.html";
  const name = document.getElementById("nom").value;
  const firstName = document.getElementById("prenom").value;
  const email = document.getElementById("email_inscription").value;
  const birthDate = document.getElementById("date").value;
  const gender = document.getElementById("sexe").value;
  const school = document.getElementById("etablissement").value;
  const field = document.getElementById("filiere").value;
  const role = document.querySelector('input[name="role"]:checked');

  if (name && firstName && email && birthDate && gender && school && field) {
    if (!role) {
      alert("Veuillez sélectionner Étudiant ou Enseignant.");
      return;
    }

    if (role.value === "etudiant") {
      window.location.href = "espace_etudiant.html";
    } else {
      window.location.href = "espace_enseignant.html";
    }

    document.getElementById("signupForm").style.display = "none";

  } else {
    alert("Veuillez remplir tous les champs.");
  }
}
