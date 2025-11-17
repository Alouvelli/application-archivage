package org.yescola.gestion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.yescola.gestion.domain.Documentexcel;


/**
 * Spring Data  repository for the Documentexcel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentexcelRepository extends JpaRepository<Documentexcel, Long> {

}
