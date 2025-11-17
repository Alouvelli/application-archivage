package org.yescola.gestion.config;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.annotation.AnnotatedElementUtils;
import org.springframework.test.context.ContextConfigurationAttributes;
import org.springframework.test.context.ContextCustomizer;
import org.springframework.test.context.ContextCustomizerFactory;
import org.springframework.test.context.MergedContextConfiguration;
import org.testcontainers.containers.MySQLContainer; // AJOUT : Import pour MySQLContainer

public class SqlTestContainersSpringContextCustomizerFactory implements ContextCustomizerFactory {

    private Logger log = LoggerFactory.getLogger(SqlTestContainersSpringContextCustomizerFactory.class);

    // MODIFICATION: Changer le type du conteneur statique pour MySQLContainer
    private static MySQLContainer<?> prodTestContainer;

    @Override
    public ContextCustomizer createContextCustomizer(Class<?> testClass, List<ContextConfigurationAttributes> configAttributes) {
        return new ContextCustomizer() {
            @Override
            public void customizeContext(ConfigurableApplicationContext context, MergedContextConfiguration mergedConfig) {
                ConfigurableListableBeanFactory beanFactory = context.getBeanFactory();
                TestPropertyValues testValues = TestPropertyValues.empty();
                EmbeddedSQL sqlAnnotation = AnnotatedElementUtils.findMergedAnnotation(testClass, EmbeddedSQL.class);
                if (null != sqlAnnotation) {
                    log.debug("detected the EmbeddedSQL annotation on class {}", testClass.getName());
                    log.info("Warming up the sql database for MySQL tests"); // Message mis à jour
                    if (null == prodTestContainer) {
                        // MODIFICATION: Instanciation directe de MySQLContainer
                        prodTestContainer = new MySQLContainer<>("mysql:8.0.33") // Utilisez la même version que votre docker-compose
                            .withDatabaseName("newArchiveApp") // Nom de la base de données
                            .withUsername("archivage") // Nom d'utilisateur
                            .withPassword("passer") // Mot de passe
                            .withReuse(true); // Permet de réutiliser le conteneur entre les tests si possible
                        prodTestContainer.start(); // Démarre le conteneur

                        // Enregistrez le conteneur en tant que singleton pour qu'il soit géré par Spring
                        beanFactory.registerSingleton(MySQLContainer.class.getName(), prodTestContainer);
                    }
                    // MODIFICATION: Mise à jour des propriétés pour MySQL
                    testValues = testValues.and("spring.datasource.url=" + prodTestContainer.getJdbcUrl());
                    testValues = testValues.and("spring.datasource.username=" + prodTestContainer.getUsername());
                    testValues = testValues.and("spring.datasource.password=" + prodTestContainer.getPassword());
                    testValues = testValues.and("spring.liquibase.url=" + prodTestContainer.getJdbcUrl());
                    // Si vous utilisez R2DBC dans vos tests avec MySQL, vous devrez peut-être ajuster ceci
                    // testValues = testValues.and("spring.r2dbc.url=" + prodTestContainer.getJdbcUrl().replace("jdbc", "r2dbc"));
                }
                testValues.applyTo(context);
            }

            @Override
            public int hashCode() {
                // MODIFICATION: Utiliser MySQLContainer pour le hashCode
                return MySQLContainer.class.getName().hashCode();
            }

            @Override
            public boolean equals(Object obj) {
                // MODIFICATION: Comparaison basée sur MySQLContainer
                return this.hashCode() == obj.hashCode();
            }
        };
    }
}
