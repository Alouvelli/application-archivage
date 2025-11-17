package org.yescola.gestion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.yescola.gestion.domain.Menu;
import org.yescola.gestion.domain.Rubrique;

import java.util.List;


/**
 * Spring Data  repository for the Rubrique entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RubriqueRepository extends JpaRepository<Rubrique, Long> {

    @Query("select menu from Menu menu where menu.rubrique.id =:id")
    List<Menu> findMenu(@Param("id") Long id);
}
