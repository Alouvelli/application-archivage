package org.yescola.gestion.repository;

import org.springframework.data.repository.query.Param;
import org.yescola.gestion.domain.Etudiant;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Etudiant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {
    @Query("select MAX(options.id) from Etudiant options ")
    Object[] maxEtudiant();
    @Query("select MAX(options.id) from Etudiant options where options.matricule=:id ")
    Object[] maxEtudiant2(@Param("id") String id);


}
