package org.yescola.gestion.repository;

import org.springframework.data.repository.query.Param;
import org.yescola.gestion.domain.Menu;
import org.yescola.gestion.domain.Module;
import org.yescola.gestion.domain.Profil;
import org.yescola.gestion.domain.Module_site;
import org.yescola.gestion.domain.ProfilModule;
import org.yescola.gestion.domain.ProfilMenu;
import org.yescola.gestion.domain.RubriqueProfil;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.yescola.gestion.domain.Rubrique;

import java.util.List;


/**
 * Spring Data  repository for the Profil entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfilRepository extends JpaRepository<Profil, Long> {

    @Query("select menu from Menu menu where menu.rubrique.id =:id")
    List<Menu> findMenu(@Param("id") Long id);


    @Query("select MAX(profil.id) from Profil profil ")
    Object[] maxProfil();

    @Query("select module from Module module, ProfilModule profilModule where module.id=profilModule.module.id and profilModule.profil.id =:id")
    List<Module> getModuleByProfil(@Param("id") Long id);

    @Query("select rubrique from Rubrique rubrique,RubriqueProfil rubriqueProfil where rubrique.id=rubriqueProfil.rubrique.id and rubriqueProfil.profil.id =:id")
    List<Rubrique> getRubriqueByProfil(@Param("id") Long id);

    @Query("select menu from Menu menu,ProfilMenu profilMenu where menu.id=profilMenu.menu.id and profilMenu.profil.id =:id")
    List<Menu> getMenuByProfil(@Param("id") Long id);

    @Query("select module from Module module,Module_site module_site where module_site.siteId=:id and module.id=module_site.moduleId")
    List<Module> getAllModule(@Param("id") Long id);

    @Query("select rubrique from Rubrique rubrique where rubrique.module.id=:id")
    List<Rubrique> getAllRubrique(@Param("id") Long id);

    @Query("select menu from Menu menu where menu.rubrique.id=:id")
    List<Menu> getAllMenu(@Param("id") Long id);



}
