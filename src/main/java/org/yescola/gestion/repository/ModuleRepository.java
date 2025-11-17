package org.yescola.gestion.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.yescola.gestion.domain.Module;
import org.yescola.gestion.domain.Rubrique;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Module entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {

    @Query(value = "select distinct module from Module module left join fetch module.sites",
        countQuery = "select count(distinct module) from Module module")
    Page<Module> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct module from Module module left join fetch module.sites")
    List<Module> findAllWithEagerRelationships();

    @Query("select module from Module module left join fetch module.sites where module.id =:id")
    Optional<Module> findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select rubrique from Rubrique rubrique where rubrique.module.id =:id")
    List<Rubrique> findRubrique(@Param("id") Long id);

}
