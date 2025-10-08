# Tâches proposées

## Correction d'une coquille typographique
- **Emplacement** : `src/main/webapp/i18n/fr/global.json`
- **Problème identifié** : L'entrée de menu destinée au type de bâtiment est libellée "Typebatitment" : le mot "bâtiment" est mal orthographié et ne respecte pas le camel case appliqué aux autres libellés.
- **Tâche suggérée** : Mettre à jour la clé de traduction pour afficher "TypeBatiment" ou "Type de bâtiment" suivant la convention retenue dans l'interface, puis vérifier l'affichage du menu.

## Correction d'un bug fonctionnel
- **Emplacement** : `src/main/java/org/yescola/gestion/repository/DocumentRepository.java`
- **Problème identifié** : La méthode `maxDocument` est typée `Object[]` alors que la requête JPQL `select MAX(options.id)` ne renvoie qu'une seule valeur scalaire. Cette incohérence crée un risque de `ClassCastException` côté service REST (`DocumentResource.maxDocument`) et rend les appels Angular difficiles à typer.
- **Tâche suggérée** : Modifier la signature du repository et de l'endpoint pour renvoyer un scalaire (`Optional<Long>` ou `Long`), adapter les appels front/back et ajouter la gestion du cas "pas de résultat".

## Correction d'un commentaire/documentation
- **Emplacement** : `src/main/java/org/yescola/gestion/web/rest/ModuleResource.java`
- **Problème identifié** : La JavaDoc de `getAllModules` promet un contrôle via le paramètre `eagerload`, alors que la méthode ignore complètement ce booléen et exécute systématiquement `findAllWithEagerRelationships()`. Le commentaire est donc trompeur.
- **Tâche suggérée** : Soit retirer toute mention du paramètre et documenter le chargement systématique, soit implémenter la condition sur `eagerload` pour que le comportement corresponde à la documentation.

## Amélioration d'un test
- **Emplacement** : `src/test/java/org/yescola/gestion/web/rest/DocumentResourceIntTest.java`
- **Problème identifié** : Les tests d'intégration ne vérifient pas l'endpoint personnalisé `/api/maxDocument/{id}`. Après correction du typage côté dépôt/ressource, un bug de régression passerait inaperçu.
- **Tâche suggérée** : Ajouter un test d'intégration qui insère plusieurs documents partageant la même référence, invoque l'endpoint `maxDocument` et asserte que l'identifiant maximal renvoyé correspond à l'entité persistée.
