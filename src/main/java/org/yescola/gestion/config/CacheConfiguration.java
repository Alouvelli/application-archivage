package org.yescola.gestion.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(org.yescola.gestion.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(org.yescola.gestion.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Employe.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Profil.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Profil.class.getName() + ".rubriqueProfils", jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Profil.class.getName() + ".profilModules", jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Profil.class.getName() + ".profilMenus", jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Profil.class.getName() + ".employes", jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Rubrique.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Rubrique.class.getName() + ".menus", jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Rubrique.class.getName() + ".rubriqueProfils", jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Menu.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Menu.class.getName() + ".profilMenus", jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Site.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Site.class.getName() + ".profils", jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Site.class.getName() + ".modules", jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.ProfilMenu.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Application.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Ecole.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Ecole.class.getName() + ".sites", jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Ecole.class.getName() + ".profils", jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Module.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Module.class.getName() + ".rubriques", jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Module.class.getName() + ".profilModules", jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Module.class.getName() + ".sites", jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.RubriqueProfil.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.ProfilModule.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Module_site.class.getName(),jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.SiteProfil.class.getName(), jcacheConfiguration);

            cm.createCache(org.yescola.gestion.domain.Departement.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Filiere.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.TypeDocument.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Niveau.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Niveau.class.getName() + ".typeDocuments", jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Classe.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Etudiant.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Anneescolaire.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Inscription.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Document.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Document.class.getName() + ".typedocuments", jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Inscription.class.getName() + ".documents", jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Document.class.getName() + ".inscriptions", jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Documentexcel.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Documentclasse.class.getName(), jcacheConfiguration);
            cm.createCache(org.yescola.gestion.domain.Semestre.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
