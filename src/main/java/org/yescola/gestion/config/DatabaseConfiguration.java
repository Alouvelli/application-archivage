// src/main/java/org/yescola/gestion/config/DatabaseConfiguration.java
package org.yescola.gestion.config;

import com.fasterxml.jackson.datatype.hibernate6.Hibernate6Module;
import liquibase.integration.spring.SpringLiquibase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import tech.jhipster.config.JHipsterConstants;

import javax.sql.DataSource;
import java.util.Optional;

@Configuration
@EnableJpaRepositories("org.yescola.gestion.repository")
@EnableTransactionManagement
@EnableJpaAuditing(auditorAwareRef = "springSecurityAuditorAware") // Active l'auditing JPA
public class DatabaseConfiguration {

    private final Logger log = LoggerFactory.getLogger(DatabaseConfiguration.class);

    private final Environment env;

    public DatabaseConfiguration(Environment env) {
        this.env = env;
    }

    @Bean
    public SpringLiquibase liquibase(@Qualifier("dataSource") DataSource dataSource, LiquibaseProperties liquibaseProperties) {
        SpringLiquibase liquibase = new SpringLiquibase();
        liquibase.setDataSource(dataSource);
        liquibase.setChangeLog("classpath:config/liquibase/master.xml");

        liquibase.setContexts(
            liquibaseProperties.getContexts() != null ?
                String.join(",", liquibaseProperties.getContexts()) : null
        );
        liquibase.setDefaultSchema(liquibaseProperties.getDefaultSchema());
        liquibase.setDropFirst(liquibaseProperties.isDropFirst());
        liquibase.setShouldRun(liquibaseProperties.isEnabled());
        liquibase.setLiquibaseSchema(liquibaseProperties.getLiquibaseSchema());
        liquibase.setLiquibaseTablespace(liquibaseProperties.getLiquibaseTablespace());
        liquibase.setDatabaseChangeLogLockTable(liquibaseProperties.getDatabaseChangeLogLockTable());
        liquibase.setDatabaseChangeLogTable(liquibaseProperties.getDatabaseChangeLogTable());

        if (env.acceptsProfiles(Profiles.of(JHipsterConstants.SPRING_PROFILE_NO_LIQUIBASE))) {
            liquibase.setShouldRun(false);
        } else {
            if (env.acceptsProfiles(Profiles.of(JHipsterConstants.SPRING_PROFILE_DEVELOPMENT, JHipsterConstants.SPRING_PROFILE_HEROKU))) {
                liquibase.setShouldRun(true);
                log.warn("Using a development profile, you should consider using a real database in production!");
            }
            log.debug("Configuring Liquibase");
        }
        return liquibase;
    }

    /**
     * Bean pour l'auditing de Spring Security.
     * Permet de récupérer l'utilisateur courant pour les champs @CreatedBy et @LastModifiedBy.
     * @return Une implémentation de AuditorAware.
     */
    @Bean
    public AuditorAware<String> springSecurityAuditorAware() {
        return new SpringSecurityAuditorAware();
    }

    /**
     * Implémentation de AuditorAware pour récupérer l'utilisateur courant.
     */
    public static class SpringSecurityAuditorAware implements AuditorAware<String> {
        @Override
        public Optional<String> getCurrentAuditor() {
            return Optional.ofNullable(SecurityContextHolder.getContext())
                .map(context -> {
                    Authentication authentication = context.getAuthentication();
                    if (authentication == null || !authentication.isAuthenticated() || authentication.getName() == null) {
                        return "system"; // Valeur par défaut si aucun utilisateur n'est authentifié ou si le nom est null
                    }
                    return authentication.getName();
                });
        }
    }

    @Bean
    public Hibernate6Module hibernate6Module() {
        return new Hibernate6Module();
    }
}
