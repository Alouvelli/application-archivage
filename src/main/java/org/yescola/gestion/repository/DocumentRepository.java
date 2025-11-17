package org.yescola.gestion.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.yescola.gestion.domain.Document;


/**
 * Spring Data  repository for the Document entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    @Query("select MAX(options.id) from Document options  WHERE options.ref=:id")
    Object[] maxDocument(@Param("id") Integer id);

    @Query("select count(d) from Document d where d.etat = false or d.etat is null")
    long countByEtatIsFalseOrEtatIsNull();

    @Query("select d.etat, count(d) from Document d group by d.etat")
    List<Object[]> countGroupByEtat();
}
