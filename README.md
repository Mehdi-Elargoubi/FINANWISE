# Finanwise

Finanwise est une application web intuitive qui propose des outils financiers tels que l’historique des prix des actions, les taux de change et d’autres fonctionnalités avancées. Construite avec Angular, elle s’appuie sur des technologies modernes pour offrir une expérience utilisateur fluide et performante.

---

## Table des matières

- [Fonctionnalités](#fonctionnalit%C3%A9s)
- [Prérequis](#pr%C3%A9requis)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [Technologies utilisées](#technologies-utilis%C3%A9es)
- [Contributeurs](#contributeurs)
- [Licence](#licence)

---

## Fonctionnalités

- **Historique des prix des actions** : Graphiques interactifs des prix de clôture.
- **Taux de change** : Conversion en temps réel entre devises.
- **Matrice des taux de change** : Comparaison visuelle de plusieurs devises.
- **Recherche de symboles boursiers** : Exploration et sélection pour recommandations.
- **Interface moderne** : Design épuré avec Angular Material.
- **Graphiques dynamiques** : Visualisations avancées via Chart.js.

---

## Prérequis

Pour démarrer, assurez-vous d’avoir installé :

- **Node.js** : Version 16+ recommandée
- **Angular CLI** : Version 15+
- **npm** ou **yarn** : Gestionnaire de paquets

---

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Mehdi-Elargoubi/FINANWISE.git
   cd finanwise
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configurez les clés API dans les Services

---

## Utilisation

1. Démarrez le serveur de développement :
   ```bash
   ng serve
   ```

2. Accédez à l’application dans votre navigateur :
   ```
   http://localhost:4200
   ```

3. Découvrez les outils : historique des actions, taux de change, recommandations, etc.

---

## Structure du projet

Aperçu de l’organisation du code :

```
finanwise/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── exchange-rates/       # Taux de change
│   │   │   ├── stock-history/       # Historique des actions
│   │   │   ├── stock-recommendation/ # Recommandations
│   │   │   ├── stock-search/        # Recherche boursière
│   │   │   └── ...                  # Autres composants
│   │   ├── services/
│   │   │   ├── exchange-rate.service.ts
│   │   │   ├── stock-history.service.ts
│   │   │   ├── stock-search.service.ts
│   │   │   └── ...                  # Autres services
│   │   └── app.module.ts
│   ├── assets/
│   │   └── favicon.ico
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   └── index.html
├── angular.json
├── package.json
└── README.md
```

---

## Technologies utilisées

- **Framework** : Angular
- **Interface** : Angular Material
- **Graphiques** : Chart.js
- **API** : Services tiers (données boursières, taux de change)
- **Langage** : TypeScript
- **Dépendances** : npm

---
