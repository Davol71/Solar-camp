AZIMUT — MISE EN LIGNE GITHUB PAGES

1. Dans le dépôt GitHub actuel, remplace les fichiers par ceux de ce ZIP.
2. Commit changes.
3. Vérifie Settings > Pages : source = Deploy from a branch, branche main, dossier /(root).
4. Pour renommer le dépôt :
   Settings > General > Repository name > Azimut > Rename.
5. L'adresse du site deviendra :
   https://davol71.github.io/Azimut/

Important :
- Après changement de nom, vérifie Settings > Pages et attends le nouveau déploiement.
- Sur iPhone, si l’ancienne icône est installée, supprime-la puis ajoute de nouveau Azimut depuis Safari.

NOUVEAUTÉ V7 : bouton « Mode terrain plein écran » après localisation GPS.

NOUVEAUTÉ V8 : interface allégée avec un seul bouton principal au départ, puis actions avancées uniquement après activation.

NOUVEAUTÉ V8.1 — MISE À JOUR FORCÉE
- Le HTML est maintenant chargé en priorité depuis le réseau.
- L'ancien cache est supprimé automatiquement.
- Le nouveau service worker s'active immédiatement.
- La page se recharge automatiquement lorsqu'une nouvelle version prend le contrôle.
- Après ce premier déploiement, les futures mises à jour seront beaucoup plus fiables.

POUR FORCER LE PREMIER PASSAGE DE V7/V8 À V8.1 :
Ouvre une seule fois l'adresse de l'app en ajoutant ?v=81 à la fin.
Exemple : https://davol71.github.io/Azimut/?v=81
Puis recharge si nécessaire. Le pied de page doit afficher v1.2.1.
