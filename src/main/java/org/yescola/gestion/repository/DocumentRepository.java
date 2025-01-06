package org.yescola.gestion.repository;

import org.springframework.data.repository.query.Param;
import org.yescola.gestion.domain.Document;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Document entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    @Query("select MAX(options.id) from Document options  WHERE options.ref=:id")
    Object[] maxDocument(@Param("id") Integer id);
}
