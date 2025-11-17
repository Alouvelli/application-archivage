package org.yescola.gestion; // Assurez-vous que le package correspond à celui où se trouve SpringBootTestClassOrderer

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Annotation de marqueur pour les tests d'intégration.
 * Elle est utilisée par SpringBootTestClassOrderer pour ordonner l'exécution des tests.
 * Les tests annotés avec @IntegrationTest seront exécutés après les autres tests unitaires.
 *
 * Cette annotation combine également @SpringBootTest pour charger le contexte Spring Boot
 * complet pour les tests d'intégration.
 */
@Target(ElementType.TYPE) // Cette annotation peut être appliquée aux classes (types)
@Retention(RetentionPolicy.RUNTIME) // L'annotation est conservée au moment de l'exécution pour être lue par le ClassOrderer
@SpringBootTest // Indique que c'est un test Spring Boot, charge le contexte complet
public @interface IntegrationTest {
    // Aucune méthode n'est nécessaire car c'est une annotation de marqueur
}
