package org.yescola.gestion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.yescola.gestion.domain.Etudiant;


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
