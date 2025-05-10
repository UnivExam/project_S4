document.addEventListener('DOMContentLoaded', () => {
  const typeSelect = document.getElementById('questionType');
  const directeFields = document.getElementById('directeFields');
  const qcmFields = document.getElementById('qcmFields');
  const qcmOptions = document.getElementById('qcmOptions');
  const questionForm = document.getElementById('questionForm');
  const jsonOutput = document.getElementById('jsonOutput');
  const questionList = document.getElementById('questionList');

  const questions = [];

  typeSelect.addEventListener('change', () => {
    const type = typeSelect.value;
    directeFields.classList.toggle('hidden', type !== 'directe');
    qcmFields.classList.toggle('hidden', type !== 'qcm');
  });

  window.addOption = function () {
    const div = document.createElement('div');
    div.className = "option-item";
    div.innerHTML = `
      <input type="text" placeholder="Option" />
      <label><input type="checkbox" /> Bonne réponse</label>
      <button type="button" onclick="this.parentElement.remove()">🗑️</button>
    `;
    qcmOptions.appendChild(div);
  };

  questionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const type = typeSelect.value;
    const enonce = document.getElementById('enonce').value;
    const note = parseInt(document.getElementById('note').value);
    const duree = parseInt(document.getElementById('duree').value);
    const publicCible = document.getElementById('public').value;

    const media = {
      image: document.getElementById('mediaImage').value,
      audio: document.getElementById('mediaAudio').value,
      video: document.getElementById('mediaVideo').value,
    };

    const question = {
      type,
      enonce,
      public: publicCible,
      media,
      note,
      duree,
    };

    if (type === 'directe') {
      question.reponseDirecte = {
        valeur: document.getElementById('reponseDirecte').value,
        tolerance: parseInt(document.getElementById('tolerance').value) || 0,
      };
    }

    if (type === 'qcm') {
      const options = [];
      const bonnesReponses = [];
      qcmOptions.querySelectorAll('.option-item').forEach((div, i) => {
        const text = div.querySelector('input[type="text"]').value;
        const checked = div.querySelector('input[type="checkbox"]').checked;
        options.push(text);
        if (checked) bonnesReponses.push(i);
      });
      question.qcm = { options, bonnesReponses };
    }

    try {
      const response = await fetch('http://localhost:5000/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(question),
      });

      if (!response.ok) throw new Error('Erreur lors de l\'ajout');

      const savedQuestion = await response.json();
      questions.push(savedQuestion);
      afficherQuestions();
      questionForm.reset();
      directeFields.classList.add('hidden');
      qcmFields.classList.add('hidden');
      qcmOptions.innerHTML = '';
    } catch (err) {
      alert('Erreur : ' + err.message);
    }
  });

  async function chargerQuestions() {
    try {
      const response = await fetch('http://localhost:5000/api/questions');
      const data = await response.json();
      questions.length = 0;
      questions.push(...data);
      afficherQuestions();
    } catch (err) {
      console.error('Erreur chargement :', err);
    }
  }

  function afficherQuestions() {
    questionList.innerHTML = '';
    questions.forEach(q => {
      const div = document.createElement('div');
      div.className = 'question-card';
      div.innerHTML = `
        <p><strong>Type:</strong> ${q.type}</p>
        <p><strong>Énoncé:</strong> ${q.enonce}</p>
        <p><strong>Note:</strong> ${q.note} | <strong>Durée:</strong> ${q.duree}s</p>
        <button onclick="modifierQuestion('${q._id}')">✏️ Modifier</button>
        <button onclick="supprimerQuestion('${q._id}')">🗑️ Supprimer</button>
        <hr>
      `;
      questionList.appendChild(div);
    });

    jsonOutput.textContent = JSON.stringify(questions, null, 2);
  }

  window.supprimerQuestion = async function (id) {
    try {
      await fetch(`http://localhost:5000/api/questions/${id}`, {
        method: 'DELETE',
      });
      const index = questions.findIndex(q => q._id === id);
      if (index !== -1) {
        questions.splice(index, 1);
        afficherQuestions();
      }
    } catch (err) {
      alert('Erreur suppression : ' + err.message);
    }
  };

  window.modifierQuestion = function (id) {
    const question = questions.find(q => q._id === id);
    if (!question) return;

    typeSelect.value = question.type;
    typeSelect.dispatchEvent(new Event('change'));
    document.getElementById('enonce').value = question.enonce;
    document.getElementById('mediaImage').value = question.media.image;
    document.getElementById('mediaAudio').value = question.media.audio;
    document.getElementById('mediaVideo').value = question.media.video;
    document.getElementById('note').value = question.note;
    document.getElementById('duree').value = question.duree;
    document.getElementById('public').value = question.public || '';

    if (question.type === 'directe') {
      document.getElementById('reponseDirecte').value = question.reponseDirecte.valeur;
      document.getElementById('tolerance').value = question.reponseDirecte.tolerance;
    } else if (question.type === 'qcm') {
      qcmOptions.innerHTML = '';
      question.qcm.options.forEach((opt, i) => {
        const div = document.createElement('div');
        div.className = 'option-item';
        div.innerHTML = `
          <input type="text" value="${opt}" />
          <label><input type="checkbox" ${question.qcm.bonnesReponses.includes(i) ? 'checked' : ''}/> Bonne réponse</label>
          <button type="button" onclick="this.parentElement.remove()">🗑️</button>
        `;
        qcmOptions.appendChild(div);
      });
    }

    supprimerQuestion(id);
  };

  // Bouton Enregistrer vers fichier
  document.getElementById('saveBtn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(questions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'questions.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  
});
