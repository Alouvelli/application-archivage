package org.yescola.gestion.repository;

import org.yescola.gestion.domain.Anneescolaire;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Anneescolaire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnneescolaireRepository extends JpaRepository<Anneescolaire, Long> {

}
