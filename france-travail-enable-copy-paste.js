// France Travail : réactive le copier-coller sur les champs qui le bloquent (handler onpaste),
// notamment la page de changement de mot de passe.
// Blocage absurde à l'ère des gestionnaires de mots de passe autogénérés.
//
// Agit sur toute la page d'un coup : pas besoin de chercher le name du champ.
// Usage console : F12 -> onglet Console -> coller tout ce fichier -> Entrée.
// Ce fichier est aussi la source du bookmarklet (install.html le charge tel quel).
//
// Licence MIT.

(() => {
  const EVENTS = ['copy', 'cut', 'paste', 'selectstart', 'contextmenu'];
  let frames = 0;

  const unblock = (win) => {
    // Déjà fait sur cette fenêtre (script relancé) : rien à refaire.
    if (win.__ftPasteFix) return;
    win.__ftPasteFix = true;

    // Écouteur en phase capture sur window : il passe avant tous les blocages posés sur
    // document, body ou le champ lui-même, et les empêche de s'exécuter.
    const stop = (e) => e.stopImmediatePropagation();
    EVENTS.forEach((type) => win.addEventListener(type, stop, true));

    // Un blocage posé sur window avant nous passe quand même : on rend preventDefault
    // inopérant sur les événements presse-papier pour qu'il ne puisse plus rien annuler.
    win.ClipboardEvent.prototype.preventDefault = function () {};
    frames++;
  };

  const walk = (win) => {
    try {
      unblock(win);
    } catch (e) {
      return; // iframe d'une autre origine : inaccessible
    }
    for (let i = 0; i < win.frames.length; i++) walk(win.frames[i]);
  };

  walk(window);

  const message = '✅ Copier-coller activé sur cette page. À relancer après un rechargement.';
  console.log(message, frames > 1 ? `(${frames} cadres)` : '');

  // Retour visible pour le bookmarklet, la console n'étant pas ouverte.
  document.getElementById('ft-paste-fix-toast')?.remove();
  const toast = document.createElement('div');
  toast.id = 'ft-paste-fix-toast';
  toast.textContent = message;
  toast.setAttribute('role', 'status');
  Object.assign(toast.style, {
    position: 'fixed', top: '16px', left: '50%', transform: 'translateX(-50%)',
    zIndex: '2147483647', padding: '10px 16px', borderRadius: '8px',
    background: '#166534', color: '#fff', font: '600 14px system-ui, sans-serif',
    boxShadow: '0 4px 12px rgba(0,0,0,.25)',
  });
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
})();
