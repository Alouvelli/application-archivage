package org.yescola.gestion.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.yescola.gestion.domain.Inscription;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Inscription entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InscriptionRepository extends JpaRepository<Inscription, Long> {

    @Query(value = "select distinct inscription from Inscription inscription left join fetch inscription.documents",
        countQuery = "select count(distinct inscription) from Inscription inscription")
    Page<Inscription> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct inscription from Inscription inscription left join fetch inscription.documents")
    List<Inscription> findAllWithEagerRelationships();

    @Query("select inscription from Inscription inscription left join fetch inscription.documents where inscription.id =:id")
    Optional<Inscription> findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select MAX(options.id) from Inscription options ")
    Object[] maxInscription();

    @Query("select ins from Inscription ins where ins.etudiant.id=:id")
    Inscription allInscription(@Param("id") Long id);


    @Query(value = "select ins from Inscription  ins")
    List<Inscription> getAll();

    @Query("select YEAR(i.date), MONTH(i.date), count(i) from Inscription i where i.date is not null and i.date >= :start group by YEAR(i.date), MONTH(i.date) order by YEAR(i.date), MONTH(i.date)")
    List<Object[]> countMonthlySince(@Param("start") LocalDate start);

    List<Inscription> findTop5ByDateIsNotNullOrderByDateDesc();
}
