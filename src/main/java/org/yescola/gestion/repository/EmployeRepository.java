package org.yescola.gestion.repository;

import org.yescola.gestion.domain.Employe;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.yescola.gestion.domain.User;

import java.util.List;


/**
 * Spring Data  repository for the Employe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeRepository extends JpaRepository<Employe, Long> {
    @Query("select us from User us where  us.id not in (select e.user.id  from Employe e)")
    List<User> allUser();
}
