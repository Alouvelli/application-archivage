# Tâches proposées

## Correction d'une coquille typographique
- **Emplacement** : `src/main/webapp/i18n/fr/global.json`
- **Problème identifié** : L'entrée de menu dédiée au type de bâtiment est libellée "Typebatitment", avec une faute d'orthographe dans le mot "bâtiment".
- **Tâche suggérée** : Corriger la chaîne de traduction afin d'afficher "Typebâtiment" (ou "Type de bâtiment" selon la convention retenue) et vérifier l'affichage dans le menu pour conserver une typographie cohérente.

## Correction d'un bug fonctionnel
- **Emplacement** : `src/main/java/org/yescola/gestion/repository/DocumentRepository.java`
- **Problème identifié** : La méthode `maxDocument` est déclarée avec un type de retour `Object[]` alors que la requête JPQL `select MAX(options.id)` renvoie une valeur scalaire unique. Cette incohérence peut provoquer des `ClassCastException` lors de l'appel et empêche de bénéficier d'un typage précis côté service.
- **Tâche suggérée** : Aligner le type de retour sur un scalaire (`Optional<Long>` ou `Long`), propager l'ajustement dans `DocumentResource.maxDocument` et dans les services front/back qui consomment cette valeur, puis couvrir le cas par un test.

## Correction d'un commentaire/documentation
- **Emplacement** : `src/main/java/org/yescola/gestion/web/rest/ModuleResource.java`
- **Problème identifié** : Le commentaire de la méthode `getAllModules` évoque un paramètre `eagerload` pour contrôler le chargement des relations, mais l'implémentation ignore la valeur reçue et charge systématiquement les relations. La documentation est donc trompeuse pour les développeurs et les utilisateurs de l'API.
- **Tâche suggérée** : Mettre à jour le commentaire pour refléter le comportement réel ou implémenter l'utilisation du paramètre `eagerload` afin d'aligner la documentation et le code.

## Amélioration d'un test
- **Emplacement** : `src/test/java/org/yescola/gestion/web/rest/DocumentResourceIntTest.java`
- **Problème identifié** : Les tests d'intégration existants ne couvrent pas l'endpoint personnalisé `/api/maxDocument/{id}` qui expose la valeur maximale renvoyée par le dépôt. L'absence de test laisse le comportement non vérifié, notamment après la correction du typage.
- **Tâche suggérée** : Ajouter un test d'intégration dédié qui prépare des documents avec des références différentes, appelle l'endpoint `maxDocument` et vérifie que la valeur maximale retournée correspond à l'enregistrement attendu.
