package org.yescola.gestion.repository;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.yescola.gestion.domain.*;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the User entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    String USERS_BY_LOGIN_CACHE = "usersByLogin";

    String USERS_BY_EMAIL_CACHE = "usersByEmail";

    Optional<User> findOneByActivationKey(String activationKey);

    List<User> findAllByActivatedIsFalseAndCreatedDateBefore(Instant dateTime);

    Optional<User> findOneByResetKey(String resetKey);

    Optional<User> findOneByEmailIgnoreCase(String email);

    Optional<User> findOneByLogin(String login);

    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesById(Long id);

    @EntityGraph(attributePaths = "authorities")
    @Cacheable(cacheNames = USERS_BY_LOGIN_CACHE)
    Optional<User> findOneWithAuthoritiesByLogin(String login);

    @EntityGraph(attributePaths = "authorities")
    @Cacheable(cacheNames = USERS_BY_EMAIL_CACHE)
    Optional<User> findOneWithAuthoritiesByEmail(String email);

    Page<User> findAllByLoginNot(Pageable pageable, String login);
    @Query("select user  from User user ")
    List<User> findmaxID();

    @Query("select profil  from Profil profil ")
    List<Profil> findAllProfil();

    @Query("select employe from Employe employe where employe.user.id = :id ")
    List<Employe> getEmploye(@Param("id") Long id);

    @Query("select employe from Employe employe where employe.user.login = :id ")
    List<Employe> getEmployeByLogin(@Param("id") String id);


    @Query("select siteProfil from SiteProfil siteProfil where siteProfil.profil.id = :id ")
    List<SiteProfil> getsiteProfilX(@Param("id") Long id);

    @Query("select profilModule from ProfilModule profilModule where profilModule.siteProfil.id = :id ")
    List<ProfilModule> getProfilModuleX(@Param("id")  Long id);

    @Query("select profilRubrique from RubriqueProfil profilRubrique where profilRubrique.profilModule.id = :id ")
    List<RubriqueProfil> getProfilRubriqueX(@Param("id")  Long id);

    @Query("select profilmenu from ProfilMenu profilmenu where profilmenu.rubriqueProfil.id = :id ")
    List<ProfilMenu> getProfilMenuX(@Param("id")  Long id);



}
