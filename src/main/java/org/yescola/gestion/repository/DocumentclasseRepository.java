package org.yescola.gestion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.yescola.gestion.domain.Documentclasse;

import java.util.List;


/**
 * Spring Data  repository for the Documentclasse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentclasseRepository extends JpaRepository<Documentclasse, Long> {
    @Query(value = "select ins from Documentclasse  ins")
    List<Documentclasse> getAll();
}
