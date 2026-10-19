// France Travail : réactive le copier-coller sur les champs qui le bloquent (handler onpaste),
// notamment la page de changement de mot de passe.
// Blocage absurde à l'ère des gestionnaires de mots de passe autogénérés.
//
// Usage console : F12 -> onglet Console -> coller tout ce fichier -> Entrée.
// Une popup demande le "name" du champ (clic droit sur le champ -> Inspecter -> attribut name="...").
//
// Licence MIT.

// Demander le name de l'élément
const elementName = prompt("Entrez le 'name' de l'input ou textarea :");
if (elementName) {
  // Rechercher l'élément par son attribut name
  const elements = document.getElementsByName(elementName);

  if (elements.length > 0) {
    // Prendre le premier élément trouvé
    const element = elements[0];

    // Vérifier que c'est bien un input ou textarea
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      // Permettre la sélection de texte
      element.style.webkitUserSelect = 'text';
      element.style.userSelect = 'text';

      // Intercepter et autoriser les événements
      const allowEvent = (e) => {
        e.stopImmediatePropagation();
        return true;
      };

      // Ajouter des listeners pour autoriser copier-coller
      element.addEventListener('copy', allowEvent, true);
      element.addEventListener('paste', allowEvent, true);
      element.addEventListener('cut', allowEvent, true);
      element.addEventListener('selectstart', allowEvent, true);
      element.addEventListener('contextmenu', allowEvent, true);

      // Supprimer les attributs inline
      ['oncopy', 'onpaste', 'oncut', 'onselectstart', 'oncontextmenu'].forEach(attr => {
        if (element.hasAttribute(attr)) {
          element.removeAttribute(attr);
        }
      });

      console.log(`✅ Copier-coller activé sur l'élément avec name="${elementName}" !`);
      console.log(`Type: ${element.tagName}, ID: ${element.id || '(pas d\'id)'}`);
    } else {
      console.error(`❌ L'élément trouvé n'est ni un INPUT ni un TEXTAREA (c'est un ${element.tagName})`);
    }
  } else {
    console.error(`❌ Aucun élément trouvé avec name="${elementName}"`);
  }
} else {
  console.log('❌ Opération annulée');
}
