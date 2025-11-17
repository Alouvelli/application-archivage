package org.yescola.gestion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.yescola.gestion.domain.Authority;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
