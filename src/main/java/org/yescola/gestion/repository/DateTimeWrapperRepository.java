package org.yescola.gestion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.yescola.gestion.domain.DateTimeWrapper;

/**
 * Spring Data JPA repository for the DateTimeWrapper entity.
 */
@Repository
public interface DateTimeWrapperRepository extends JpaRepository<DateTimeWrapper, Long> {

}
