document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  document.getElementById("connexionBtn").onclick = () => {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
  };

  document.getElementById("inscriptionBtn").onclick = () => {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  };
});

function submitSignup(event) {
  event.preventDefault();

  const role = document.querySelector('input[name="role"]:checked');
  const name = document.getElementById("nom").value;
  const firstName = document.getElementById("prenom").value;
  const email = document.getElementById("signup_email").value;
  const birthDate = document.getElementById("date").value;
  const gender = document.getElementById("sexe").value;
  const school = document.getElementById("etablissement").value;
  const field = document.getElementById("filiere").value;
  const password = document.getElementById("password").value;

  if (!role) {
    alert("Veuillez sélectionner Étudiant ou Enseignant.");
    return;
  }

  if (name && firstName && email && birthDate && gender && school && field && password) {
    fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: name,
        prenom: firstName,
        email: email,
        password: password,
        dateNaissance: birthDate,
        sexe: gender,
        etablissement: school,
        filiere: field,
        role: role.value
      })
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      if (data.message === "Inscription réussie.") {
        window.location.href = role.value === "etudiant"
          ? "espace_etudiant.html"
          : "espace_enseignant.html";
      }
    })
    .catch(err => {
      console.error(err);
      alert("Erreur lors de l'inscription.");
    });
  } else {
    alert("Veuillez remplir tous les champs.");
  }
}

function submitLogin(event) {
  event.preventDefault();

  const email = document.getElementById("login_email").value;
  const password = document.getElementById("pass").value;
  const role = document.querySelector('input[name="role"]:checked');

  if (!role) {
    alert("Veuillez sélectionner Étudiant ou Enseignant.");
    return;
  }

  if (email && password) {
    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        role: role.value
      })
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    })
    .catch(err => {
      console.error(err);
      alert("Erreur lors de la connexion.");
    });
  } else {
    alert("Veuillez remplir tous les champs.");
  }
}

// Appel automatique pour récupérer les utilisateurs
function fetchUsers() {
  fetch("http://localhost:5000/api/users")
    .then(res => {
      if (!res.ok) {
        throw new Error("Bad Request");
      }
      return res.json();
    })
    .then(data => {
      console.log("Utilisateurs récupérés :", data);
    })
    .catch(err => {
      console.error("Erreur lors de la récupération des utilisateurs :", err);
    });
}

fetchUsers();