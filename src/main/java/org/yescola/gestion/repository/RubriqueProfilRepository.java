package org.yescola.gestion.repository;

import org.springframework.data.repository.query.Param;
import org.yescola.gestion.domain.RubriqueProfil;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the RubriqueProfil entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RubriqueProfilRepository extends JpaRepository<RubriqueProfil, Long> {
    @Query("select MAX(profil.id) from RubriqueProfil profil where profil.rubrique.id=:id and profil.profilModule.id=:id1")
    Object[] RubriqueProfil(@Param("id") Long id,@Param("id1") Long id1);

    @Query("select rubriqueProfil from RubriqueProfil  rubriqueProfil where  rubriqueProfil.profilModule.id=:id  ")
    List<RubriqueProfil> profilRubriqueAll(@Param("id") Long id);


    @Query("select  rubriqueProfil from RubriqueProfil  rubriqueProfil where   rubriqueProfil.rubrique.id=:id and  rubriqueProfil.profilModule.id=:id1 ")
    List<RubriqueProfil> profilRubriqueAll2(@Param("id") Long id,@Param("id1") Long id1);
}
