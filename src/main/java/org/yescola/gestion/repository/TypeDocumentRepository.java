package org.yescola.gestion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.yescola.gestion.domain.TypeDocument;

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
