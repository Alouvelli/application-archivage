package org.yescola.gestion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.yescola.gestion.domain.Classe;

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
