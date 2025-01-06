package org.yescola.gestion.repository;

import org.springframework.data.repository.query.Param;
import org.yescola.gestion.domain.Rubrique;
import org.yescola.gestion.domain.Menu;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

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
