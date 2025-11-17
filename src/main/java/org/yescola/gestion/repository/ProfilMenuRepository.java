package org.yescola.gestion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.yescola.gestion.domain.ProfilMenu;

import java.util.List;


/**
 * Spring Data  repository for the ProfilMenu entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfilMenuRepository extends JpaRepository<ProfilMenu, Long> {

    @Query("select profilmenu from ProfilMenu profilmenu where profilmenu.rubriqueProfil.id=:id  ")
    List<ProfilMenu> profilMenuAll(@Param("id") Long id);
}
