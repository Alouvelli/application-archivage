package org.yescola.gestion.repository;

import org.springframework.data.repository.query.Param;
import org.yescola.gestion.domain.SiteProfil;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the SiteProfil entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SiteProfilRepository extends JpaRepository<SiteProfil, Long> {


    @Query("select MAX(profil.id) from SiteProfil profil where profil.site.id=:id")
    Object[] SiteProfil(@Param("id") Long id);

    @Query("select profil from SiteProfil profil where profil.profil.id=:id")
    List<SiteProfil> siteProfilall(@Param("id") Long id);

    @Query("select profilSite from SiteProfil profilSite where profilSite.profil.id=:id and profilSite.site.id=:id1 ")
    List<SiteProfil> siteProfilall2(@Param("id") Long id,@Param("id1") Long id1);
}
