package org.yescola.gestion.repository;

import org.springframework.data.repository.query.Param;
import org.yescola.gestion.domain.TypeDocument;
import org.yescola.gestion.domain.Document;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the TypeDocument entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeDocumentRepository extends JpaRepository<TypeDocument, Long> {
    @Query("select td from TypeDocument td,Document d where d.typeDocument.id=td.id and d.id= :id ")
    List<TypeDocument> gettypedocument(@Param("id") Long id);

}
