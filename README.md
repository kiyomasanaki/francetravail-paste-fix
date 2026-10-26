# France Travail - Activer le copier-coller

Réactive le copier-coller sur les champs qui le bloquent (handler onpaste), notamment la page de changement de mot de passe. Blocage absurde à l'ère des gestionnaires de mots de passe autogénérés.

Optimisé pour `https://candidat.francetravail.fr/compte/parametres/modificationmotdepasse`, mais le code fonctionne sur n'importe quel site qui bloque le collage.

Agit sur **toute la page d'un coup** : plus besoin de chercher le `name` du champ, le mot de passe et sa confirmation sont débloqués en une fois.

## Deux façons de l'utiliser

### 1. Bookmarklet (un clic, recommandé)

Ouvre la **[page d'installation](https://kiyomasanaki.github.io/francetravail-paste-fix/install.html)**, puis glisse le bouton bleu vers ta barre de favoris (`Ctrl + Maj + B` pour l'afficher, `Cmd + Maj + B` sur Mac). Ensuite, sur la page bloquée, clique sur le favori : un message vert confirme l'activation.

Fonctionne sous Chrome, Edge et Firefox. Le glisser-déposer du lien est la seule méthode fiable : Chrome ne permet pas d'ajouter un bookmarklet en téléchargeant un fichier.

### 2. Console

**Étape 1 : ouvrir la console DevTools** (`F12`, ou `Ctrl + Maj + J` sur Windows/Linux, `Cmd + Option + J` sur Mac).

![Ouvrir la console DevTools](./images/01-ouvrir-console.png)

**Étape 2 : coller le script.** Copie tout le contenu de [`france-travail-enable-copy-paste.js`](./france-travail-enable-copy-paste.js), colle dans la console, Entrée.

> Chrome bloque le premier collage dans la console (protection anti-arnaque) : tape `allow pasting`, Entrée, puis colle à nouveau.

**Étape 3 : coller.** Un message vert s'affiche en haut de la page et dans la console. Tous les champs de la page acceptent maintenant le collage.

![On peut maintenant coller](./images/07-coller-ok.png)

## Notes

Le script agit sur la page courante uniquement (y compris ses iframes de même origine). Relance-le après un rechargement de page.

Il neutralise les blocages posés sur le champ, sur la page ou sur la fenêtre (`onpaste`, `addEventListener('paste', ...)`, `preventDefault()`), ainsi que ceux du copier, couper, de la sélection et du clic droit.

Sous Firefox, une alternative permanente existe : dans `about:config`, passer `dom.event.clipboardevents.enabled` à `false` empêche tous les sites de bloquer le presse-papier (mais casse aussi les boutons « copier » de certains sites).

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `france-travail-enable-copy-paste.js` | Script source, utilisé pour la console et le bookmarklet |
| `install.html` | Page d'installation du bookmarklet (glisser-déposer), construit à partir du script source |
| `images/` | Captures d'écran du tutoriel |

## Licence

[MIT](https://opensource.org/licenses/MIT).
