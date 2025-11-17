package org.yescola.gestion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.yescola.gestion.domain.Ecole;


/**
 * Spring Data  repository for the Ecole entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EcoleRepository extends JpaRepository<Ecole, Long> {

}
