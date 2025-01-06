package org.yescola.gestion.repository;

import org.springframework.data.repository.query.Param;
import org.yescola.gestion.domain.Filiere;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.yescola.gestion.domain.Rubrique;

import java.util.List;


/**
 * Spring Data  repository for the Filiere entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FiliereRepository extends JpaRepository<Filiere, Long> {

    @Query("select filiere from Filiere filiere where filiere.departement.id =:id")
    List<Filiere> findFiliereByID(@Param("id") Long id);
}
