package org.yescola.gestion.repository;

import org.yescola.gestion.domain.Documentexcel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Documentexcel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentexcelRepository extends JpaRepository<Documentexcel, Long> {

}
