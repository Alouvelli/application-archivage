package org.yescola.gestion.repository;

import org.yescola.gestion.domain.Niveau;
import org.yescola.gestion.domain.Niveau_type_document;
import org.yescola.gestion.domain.TypeDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * Spring Data  repository for the Niveau entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NiveauRepository extends JpaRepository<Niveau, Long> {

    @Query(value = "select distinct niveau from Niveau niveau left join fetch niveau.typeDocuments",
        countQuery = "select count(distinct niveau) from Niveau niveau")
    Page<Niveau> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct niveau from Niveau niveau left join fetch niveau.typeDocuments")
    List<Niveau> findAllWithEagerRelationships();

    @Query("select niveau from Niveau niveau left join fetch niveau.typeDocuments where niveau.id =:id")
    Optional<Niveau> findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select t from Niveau_type_document nt,TypeDocument t  where nt.type_document_id=t.id  and nt.niveau_Id= :id ")
    Set<TypeDocument> typedocByIdNiv(@Param("id") Long id);
}
