package org.yescola.gestion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.yescola.gestion.domain.Anneescolaire;


/**
 * Spring Data  repository for the Anneescolaire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnneescolaireRepository extends JpaRepository<Anneescolaire, Long> {

}
