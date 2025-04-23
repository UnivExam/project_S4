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
  
    questionForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const type = typeSelect.value;
      const enonce = document.getElementById('enonce').value;
      const note = parseInt(document.getElementById('note').value);
      const duree = parseInt(document.getElementById('duree').value);
  
      const media = {
        image: document.getElementById('mediaImage').value,
        audio: document.getElementById('mediaAudio').value,
        video: document.getElementById('mediaVideo').value,
      };
  
      const question = {
        id: Date.now(),
        type,
        enonce,
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
  
      questions.push(question);
      afficherQuestions();
      questionForm.reset();
      directeFields.classList.add('hidden');
      qcmFields.classList.add('hidden');
      qcmOptions.innerHTML = '';
    });
  
    function afficherQuestions() {
      questionList.innerHTML = '';
      questions.forEach(q => {
        const div = document.createElement('div');
        div.className = 'question-card';
        div.innerHTML = `
          <p><strong>Type:</strong> ${q.type}</p>
          <p><strong>Énoncé:</strong> ${q.enonce}</p>
          <p><strong>Note:</strong> ${q.note} | <strong>Durée:</strong> ${q.duree}s</p>
          <button onclick="modifierQuestion(${q.id})">✏️ Modifier</button>
          <button onclick="supprimerQuestion(${q.id})">🗑️ Supprimer</button>
          <hr>
        `;
        questionList.appendChild(div);
      });
  
      jsonOutput.textContent = JSON.stringify(questions, null, 2);
    }
  
    window.supprimerQuestion = function (id) {
      const index = questions.findIndex(q => q.id === id);
      if (index !== -1) {
        questions.splice(index, 1);
        afficherQuestions();
      }
    };
  
    window.modifierQuestion = function (id) {
      const question = questions.find(q => q.id === id);
      if (!question) return;
  
      // Recharge les champs
      typeSelect.value = question.type;
      typeSelect.dispatchEvent(new Event('change'));
      document.getElementById('enonce').value = question.enonce;
      document.getElementById('mediaImage').value = question.media.image;
      document.getElementById('mediaAudio').value = question.media.audio;
      document.getElementById('mediaVideo').value = question.media.video;
      document.getElementById('note').value = question.note;
      document.getElementById('duree').value = question.duree;
  
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
  
      // Supprime et recharge après édition
      supprimerQuestion(id);
    };
  });
  function generateLink() {
    const link = 'https://exam-platform.com/exam/' + Math.random().toString(36).substr(2, 9);
    document.getElementById('uniqueLink').textContent = link;
  }
