# Motus

## Description
Ce jeu est un jeu de mots interactif où le joueur tente de deviner un mot secret en un nombre limité de tentatives. Le jeu est construit avec Vue.js et utilise la gestion d'état avec Pinia. Basé sur le jeu de l'émission télé du même nom.

## Fonctionnalités

- **Jeu de devinettes de mots** : Les joueurs essaient de deviner le mot secret à partir d'une liste de mots prédéfinie en saisissant des mots de la même longueur que le mot secret.
- **Feedback immédiat** : À chaque tentative, le jeu indique quelles lettres sont correctement placées, présentes mais mal placées, ou absentes du mot.
- **Nombre limité de tentatives** : Les joueurs ont un nombre limité d'essais pour deviner le mot, augmentant ainsi le défi.
- **Interface utilisateur réactive** : Le jeu dispose d'une interface conviviale qui s'adapte à différentes tailles d'écran.
- **Notifications** : Des messages de toast sont utilisés pour fournir des commentaires en temps réel sur les actions du joueur, comme des avertissements ou des confirmations de victoire/défaite.
- **Réinitialisation du jeu** : Les joueurs peuvent recommencer à jouer après une victoire ou une défaite.

## Architecture du Projet

### Fichiers Principaux

1. **HomeView.vue** : Le composant principal qui contient la logique du jeu, la gestion des tentatives, et les interactions utilisateur.
2. **GridWord.vue** : Un composant qui affiche les tentatives de mots sous forme de grille.
3. **LetterInGrid.vue** : Un petit composant qui affiche une lettre individuelle dans la grille des tentatives.
4. **wordSelected.ts** : Store Pinia qui maintient l'état du mot sélectionné et des tentatives du joueur.

### Utilisation des composants

- `HomeView.vue` gère la logique du jeu, traite les entrées des utilisateurs, et contrôle l'affichage de l'état du jeu.
- `GridWord.vue` et `LetterInGrid.vue` sont utilisés pour visualiser les mots tentés et leur état par rapport au mot secret.
- Le store `wordSelected` persiste les informations sur le mot sélectionné et les tentatives entre les sessions de jeu grâce au stockage local.

## Comment jouer ?

1. Ouvrez l'application dans votre navigateur.
2. Entrez un mot de la taille du mot secret et appuyez sur Entrée ou cliquez sur le bouton "Envoyer".
3. Utilisez les indices fournis après chaque tentative pour ajuster vos propositions suivantes.
4. Vous pouvez réinitialiser le jeu à tout moment en cliquant sur le bouton "Restart".

## Installation

Pour exécuter ce projet localement, suivez ces étapes :

```bash
# Cloner le dépôt
git clone 

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

## Technologie Utilisées
- Vue.js 3
- TypeScript
- Pinia
- Vue Toastification pour les notifications
