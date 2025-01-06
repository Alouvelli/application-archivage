package org.yescola.gestion.repository;

import org.springframework.data.repository.query.Param;

import org.yescola.gestion.domain.Module;
import org.yescola.gestion.domain.Site;
import org.yescola.gestion.domain.Module_site;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Site entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SiteRepository extends JpaRepository<Site, Long> {
    @Query("select module from Module module,Module_site modulesite where module.id=modulesite.moduleId and modulesite.siteId = :id ")
    List<Module> getmodule(@Param("id") Long id);

    @Query("select site from Site site")
    List<Site> getAllSite();
}
