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
    window.location.href = "espace_etudiant.html";
  } else {
    window.location.href = "espace_enseignant.html";
  }
};

// Connexion form logic
function showLoginForm() {
  document.getElementById("loginForm").style.display = "block";
}

function hideLoginForm() {
  document.getElementById("loginForm").style.display = "none";
}

function submitLogin() {
  const password = document.getElementById("pass").value;
  const email = document.getElementById("email").value;
  const role = document.querySelector('input[name="role"]:checked');

  if (password && email) {
    if (!role) {
      alert("Veuillez sélectionner Étudiant ou Enseignant.");
      return;
    }

    if (role.value === "etudiant") {
      window.location.href = "espace_etudiant.html";
    } else {
      window.location.href = "espace_enseignant.html";
    }

    hideLoginForm();
  } else {
    alert("Veuillez remplir tous les champs.");
  }
}

// Inscription form logic
function showSignupForm() {
  document.getElementById("signupForm").style.display = "block";
}

function hideSignupForm() {
  document.getElementById("signupForm").style.display = "none";
}

function submitSignup() {
  const name = document.getElementById("nom").value;
  const firstName = document.getElementById("prenom").value;
  const email = document.getElementById("email").value;
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

    hideSignupForm();
  } else {
    alert("Veuillez remplir tous les champs.");
  
    };
    
  }
