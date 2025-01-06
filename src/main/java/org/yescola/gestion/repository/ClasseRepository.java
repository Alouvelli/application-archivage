package org.yescola.gestion.repository;

import org.springframework.data.repository.query.Param;
import org.yescola.gestion.domain.Classe;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.yescola.gestion.domain.Filiere;

import java.util.List;


/**
 * Spring Data  repository for the Classe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClasseRepository extends JpaRepository<Classe, Long> {
    @Query("select filiere from Classe filiere where filiere.filiere.id =:id")
    List<Classe> findClasseByID(@Param("id") Long id);
}
