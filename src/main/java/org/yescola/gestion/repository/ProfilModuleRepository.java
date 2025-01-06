package org.yescola.gestion.repository;

import org.springframework.data.repository.query.Param;
import org.yescola.gestion.domain.ProfilModule;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the ProfilModule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfilModuleRepository extends JpaRepository<ProfilModule, Long> {


    @Query("select MAX(profil.id) from ProfilModule profil where profil.module.id=:id and profil.siteProfil.id=:id1")
    Object[] ProfilModule(@Param("id") Long id,@Param("id1") Long id1);
    @Query("select profilModule from ProfilModule profilModule where profilModule.siteProfil.id=:id  ")
    List<ProfilModule>profilModuleAll(@Param("id") Long id);
    @Query("select profilModule from ProfilModule profilModule where  profilModule.module.id=:id and  profilModule.siteProfil.id=:id1 ")
    List<ProfilModule> profilModuleAll2(@Param("id") Long id,@Param("id1") Long id1);
}
