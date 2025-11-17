package org.yescola.gestion.web.rest;

import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.BeforeEach; // JUnit 5
import org.junit.jupiter.api.Test; // JUnit 5
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cache.CacheManager;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.yescola.gestion.GestionEcoleApp;
import org.yescola.gestion.domain.Authority;
import org.yescola.gestion.domain.User;
import org.yescola.gestion.repository.AuthorityRepository;
import org.yescola.gestion.repository.UserRepository;
import org.yescola.gestion.security.AuthoritiesConstants;
import org.yescola.gestion.service.MailService;
import org.yescola.gestion.service.UserService;
import org.yescola.gestion.service.dto.UserDTO;
import org.yescola.gestion.service.mapper.UserMapper;
import org.yescola.gestion.web.rest.errors.ExceptionTranslator;
import org.yescola.gestion.web.rest.vm.ManagedUserVM;
import org.springframework.security.test.context.support.WithMockUser;

import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link UserResource} REST controller.
 */
@AutoConfigureMockMvc
@WithMockUser(username = "admin", authorities = AuthoritiesConstants.ADMIN)
@SpringBootTest(classes = GestionEcoleApp.class)
@ActiveProfiles("test")
public class UserResourceIT {

    private static final String DEFAULT_LOGIN = "johndoe";

    private static final String DEFAULT_PASSWORD = "password";

    private static final String DEFAULT_FIRSTNAME = "John";

    private static final String DEFAULT_LASTNAME = "Doe";

    private static final String DEFAULT_EMAIL = "john.doe@localhost";

    private static final String DEFAULT_IMAGEURL = "http://placehold.it/50x50";

    private static final String DEFAULT_LANGKEY = "en";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Mock
    private MailService mockMailService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private CacheManager cacheManager;

    @Autowired
    private AuthorityRepository authorityRepository;

    private MockMvc restUserMockMvc;

    private User user;

    @BeforeEach
public void setup() {
    UserResource userResource = new UserResource(userService, userRepository, mockMailService);
    this.restUserMockMvc = MockMvcBuilders.standaloneSetup(userResource)
        .setCustomArgumentResolvers(pageableArgumentResolver)
        .setControllerAdvice(exceptionTranslator)
        .setMessageConverters(jacksonMessageConverter)
        .build();

    // Nettoyer tous les utilisateurs existants avant chaque test pour éviter les conflits
    userRepository.deleteAll();
    // S'assurer que les caches sont également nettoyés
    cacheManager.getCache(UserRepository.USERS_BY_LOGIN_CACHE).clear();
    cacheManager.getCache(UserRepository.USERS_BY_EMAIL_CACHE).clear();

    // S'assurer que l'autorité ROLE_USER existe en base
    if (!authorityRepository.existsById(AuthoritiesConstants.USER)) {
        Authority userAuthority = new Authority();
        userAuthority.setName(AuthoritiesConstants.USER);
        authorityRepository.saveAndFlush(userAuthority);
    }
    // S'assurer que l'autorité ROLE_ADMIN existe en base (utile pour certains tests)
    if (!authorityRepository.existsById(AuthoritiesConstants.ADMIN)) {
        Authority adminAuthority = new Authority();
        adminAuthority.setName(AuthoritiesConstants.ADMIN);
        authorityRepository.saveAndFlush(adminAuthority);
    }
}

    /**
     * Create a User.
     *
     * This is a static method, as tests for the API is intended to be repeatable.
     *
     * @return a User.
     */
    public static User createEntity(EntityManager em) {
        User user = new User();
        // Rendre le login et l'email uniques pour chaque entité créée
        user.setLogin(DEFAULT_LOGIN + RandomStringUtils.randomAlphanumeric(10).toLowerCase()); // Convertir en minuscules
        user.setPassword(RandomStringUtils.random(60));
        user.setActivated(true);
        user.setEmail(RandomStringUtils.randomAlphanumeric(10) + DEFAULT_EMAIL);
        user.setFirstName(DEFAULT_FIRSTNAME);
        user.setLastName(DEFAULT_LASTNAME);
        user.setImageUrl(DEFAULT_IMAGEURL);
        user.setLangKey(DEFAULT_LANGKEY);

        // Assurez-vous que les autorités sont initialisées
        Set<Authority> authorities = new HashSet<>();
        authorities.add(new Authority(AuthoritiesConstants.USER)); // Ajoute l'autorité ROLE_USER
        user.setAuthorities(authorities);

        return user;
    }

    @BeforeEach
    public void initTest() {
        user = createEntity(em);
    }

    @Test
    @Transactional
    public void createUser() throws Exception {
        int databaseSizeBeforeCreate = userRepository.findAll().size();

        ManagedUserVM managedUserVM = new ManagedUserVM();
        // Assurez-vous que le login est en minuscules si le système le normalise
        managedUserVM.setLogin("newuser" + RandomStringUtils.randomAlphanumeric(5).toLowerCase());
        managedUserVM.setPassword(DEFAULT_PASSWORD);
        managedUserVM.setFirstName(DEFAULT_FIRSTNAME);
        managedUserVM.setLastName(DEFAULT_LASTNAME);
        managedUserVM.setEmail("newuser" + RandomStringUtils.randomAlphanumeric(5).toLowerCase() + "@localhost");
        managedUserVM.setActivated(true);
        managedUserVM.setImageUrl(DEFAULT_IMAGEURL);
        managedUserVM.setLangKey(DEFAULT_LANGKEY);
        managedUserVM.setAuthorities(Collections.singleton(AuthoritiesConstants.USER));

        restUserMockMvc.perform(post("/api/admin/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(TestUtil.convertObjectToJsonBytes(managedUserVM)))
            .andExpect(status().isCreated());

        List<User> userList = userRepository.findAll();
        assertThat(userList).hasSize(databaseSizeBeforeCreate + 1);
        User testUser = userList.get(userList.size() - 1);
        // Assurez-vous que l'assertion compare des chaînes de caractères de même casse
        assertThat(testUser.getLogin()).isEqualTo(managedUserVM.getLogin());
        assertThat(testUser.getFirstName()).isEqualTo(DEFAULT_FIRSTNAME);
        assertThat(testUser.getLastName()).isEqualTo(DEFAULT_LASTNAME);
        assertThat(testUser.getEmail()).isEqualTo(managedUserVM.getEmail());
        assertThat(testUser.getImageUrl()).isEqualTo(DEFAULT_IMAGEURL);
        assertThat(testUser.getActivated()).isEqualTo(true);
        assertThat(testUser.getLangKey()).isEqualTo(DEFAULT_LANGKEY);
        assertThat(testUser.getPassword()).isNotNull();
        assertThat(testUser.getResetKey()).isNotNull();
        assertThat(testUser.getResetDate()).isNotNull();

//        Authority userAuthority = new Authority();
//        userAuthority.setName(AuthoritiesConstants.USER);
//        assertThat(testUser.getAuthorities()).containsExactly(userAuthority);
        assertThat(testUser.getAuthorities().stream().map(Authority::getName).collect(Collectors.toSet()))
            .containsExactly(AuthoritiesConstants.USER);

    }

    @Test
    @Transactional
    public void createUserWithExistingLogin() throws Exception {
        // Sauvegarder l'utilisateur avec un login unique généré
        user.setLogin(DEFAULT_LOGIN + RandomStringUtils.randomAlphanumeric(10).toLowerCase());
        userRepository.saveAndFlush(user);
        int databaseSizeBeforeCreate = userRepository.findAll().size();

        ManagedUserVM managedUserVM = new ManagedUserVM();
        managedUserVM.setLogin(user.getLogin()); // Utilise un login existant
        managedUserVM.setPassword(DEFAULT_PASSWORD);
        managedUserVM.setFirstName(DEFAULT_FIRSTNAME);
        managedUserVM.setLastName(DEFAULT_LASTNAME);
        managedUserVM.setEmail(RandomStringUtils.randomAlphanumeric(10) + "another@localhost"); // Email unique
        managedUserVM.setActivated(true);
        managedUserVM.setImageUrl(DEFAULT_IMAGEURL);
        managedUserVM.setLangKey(DEFAULT_LANGKEY);
        managedUserVM.setAuthorities(Collections.singleton(AuthoritiesConstants.USER));

        restUserMockMvc.perform(post("/api/admin/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(TestUtil.convertObjectToJsonBytes(managedUserVM)))
            .andExpect(status().isBadRequest());

        List<User> userList = userRepository.findAll();
        assertThat(userList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void createUserWithExistingEmail() throws Exception {
        // Sauvegarder l'utilisateur avec un email unique généré
        user.setEmail(RandomStringUtils.randomAlphanumeric(10) + DEFAULT_EMAIL);
        userRepository.saveAndFlush(user);
        int databaseSizeBeforeCreate = userRepository.findAll().size();

        ManagedUserVM managedUserVM = new ManagedUserVM();
        managedUserVM.setLogin("newlogin" + RandomStringUtils.randomAlphanumeric(10).toLowerCase()); // Login unique
        managedUserVM.setPassword(DEFAULT_PASSWORD);
        managedUserVM.setFirstName(DEFAULT_FIRSTNAME);
        managedUserVM.setLastName(DEFAULT_LASTNAME);
        managedUserVM.setEmail(user.getEmail()); // Utilise un email existant
        managedUserVM.setActivated(true);
        managedUserVM.setImageUrl(DEFAULT_IMAGEURL);
        managedUserVM.setLangKey(DEFAULT_LANGKEY);
        managedUserVM.setAuthorities(Collections.singleton(AuthoritiesConstants.USER));

        restUserMockMvc.perform(post("/api/admin/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(TestUtil.convertObjectToJsonBytes(managedUserVM)))
            .andExpect(status().isBadRequest());

        List<User> userList = userRepository.findAll();
        assertThat(userList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUsers() throws Exception {
        // Sauvegarder l'utilisateur après le nettoyage pour s'assurer qu'il est le seul
        userRepository.saveAndFlush(user);

        restUserMockMvc.perform(get("/api/admin/users?sort=id,desc")
                .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].login").value(hasItem(user.getLogin())));
    }

    @Test
    @Transactional
    public void getUser() throws Exception {
        userRepository.saveAndFlush(user);

        restUserMockMvc.perform(get("/api/admin/users/{login}", user.getLogin()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.login").value(user.getLogin()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRSTNAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LASTNAME))
            .andExpect(jsonPath("$.email").value(user.getEmail()))
            .andExpect(jsonPath("$.imageUrl").value(DEFAULT_IMAGEURL))
            .andExpect(jsonPath("$.activated").value(true))
            .andExpect(jsonPath("$.langKey").value(DEFAULT_LANGKEY));
    }

    @Test
    @Transactional
    public void getNonExistingUser() throws Exception {
        restUserMockMvc.perform(get("/api/admin/users/nonexistent"))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUser() throws Exception {
        userRepository.saveAndFlush(user);
        int databaseSizeBeforeUpdate = userRepository.findAll().size();

        User updatedUser = userRepository.findById(user.getId())
            .orElseThrow(() -> new AssertionError("User not found for update"));

        cacheManager.getCache(UserRepository.USERS_BY_LOGIN_CACHE).evict(updatedUser.getLogin());
        cacheManager.getCache(UserRepository.USERS_BY_EMAIL_CACHE).evict(updatedUser.getEmail());

        updatedUser.setLogin(DEFAULT_LOGIN + "updated");
        updatedUser.setFirstName(DEFAULT_FIRSTNAME + "updated");
        updatedUser.setLastName(DEFAULT_LASTNAME + "updated");
        updatedUser.setEmail(RandomStringUtils.randomAlphanumeric(5) + "updated@localhost");
        updatedUser.setImageUrl(DEFAULT_IMAGEURL + "updated");
        updatedUser.setActivated(false);
        updatedUser.setLangKey("fr");
        Set<Authority> updatedAuthorities = new HashSet<>();
        authorityRepository.findById(AuthoritiesConstants.ADMIN).ifPresent(updatedAuthorities::add);
        updatedUser.setAuthorities(updatedAuthorities);

        ManagedUserVM managedUserVM = new ManagedUserVM();
        managedUserVM.setId(updatedUser.getId());
        managedUserVM.setLogin(updatedUser.getLogin());
        managedUserVM.setFirstName(updatedUser.getFirstName());
        managedUserVM.setLastName(updatedUser.getLastName());
        managedUserVM.setEmail(updatedUser.getEmail());
        managedUserVM.setActivated(updatedUser.getActivated());
        managedUserVM.setImageUrl(updatedUser.getImageUrl());
        managedUserVM.setLangKey(updatedUser.getLangKey());
        // Utilisation de Collectors.toSet()
        managedUserVM.setAuthorities(updatedAuthorities.stream().map(Authority::getName).collect(Collectors.toSet()));

        restUserMockMvc.perform(put("/api/admin/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(TestUtil.convertObjectToJsonBytes(managedUserVM)))
            .andExpect(status().isOk());

        List<User> userList = userRepository.findAll();
        assertThat(userList).hasSize(databaseSizeBeforeUpdate);
        User testUser = userList.stream().filter(u -> u.getId().equals(updatedUser.getId())).findFirst()
            .orElseThrow(() -> new AssertionError("Updated user not found in database"));

        assertThat(testUser.getLogin()).isEqualTo(updatedUser.getLogin());
        assertThat(testUser.getFirstName()).isEqualTo(updatedUser.getFirstName());
        assertThat(testUser.getLastName()).isEqualTo(updatedUser.getLastName());
        assertThat(testUser.getEmail()).isEqualTo(updatedUser.getEmail());
        assertThat(testUser.getImageUrl()).isEqualTo(updatedUser.getImageUrl());
        assertThat(testUser.getActivated()).isEqualTo(updatedUser.getActivated());
        assertThat(testUser.getLangKey()).isEqualTo(updatedUser.getLangKey());

//        Authority adminAuthority = new Authority();
//        adminAuthority.setName(AuthoritiesConstants.ADMIN);
//        assertThat(testUser.getAuthorities()).containsExactly(adminAuthority);
        assertThat(testUser.getAuthorities().stream().map(Authority::getName).collect(Collectors.toSet()))
            .containsExactly(AuthoritiesConstants.ADMIN);

    }

    @Test
    @Transactional
    public void deleteUser() throws Exception {
        userRepository.saveAndFlush(user);
        int databaseSizeBeforeDelete = userRepository.findAll().size();

        restUserMockMvc.perform(delete("/api/admin/users/{login}", user.getLogin())
                .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent()); // S'attend toujours à 204

        List<User> userList = userRepository.findAll();
        assertThat(userList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void testUserDTO() {
        User userForDtoTest = createEntity(em);
        userForDtoTest.setCreatedBy(DEFAULT_LOGIN);
        userForDtoTest.setCreatedDate(Instant.now());
        userForDtoTest.setLastModifiedBy(DEFAULT_LOGIN);
        userForDtoTest.setLastModifiedDate(Instant.now());
        userForDtoTest.setActivated(true);
        Set<Authority> authorities = new HashSet<>();
        authorityRepository.findById(AuthoritiesConstants.USER).ifPresent(authorities::add);
        userForDtoTest.setAuthorities(authorities);

        UserDTO userDTO = new UserDTO(userForDtoTest);

        assertThat(userDTO.getLogin()).isEqualTo(userForDtoTest.getLogin());
        assertThat(userDTO.getFirstName()).isEqualTo(DEFAULT_FIRSTNAME);
        assertThat(userDTO.getLastName()).isEqualTo(DEFAULT_LASTNAME);
        assertThat(userDTO.getEmail()).isEqualTo(userForDtoTest.getEmail());
        assertThat(userDTO.getImageUrl()).isEqualTo(DEFAULT_IMAGEURL);
        assertThat(userDTO.getLangKey()).isEqualTo(DEFAULT_LANGKEY);
        assertThat(userDTO.getCreatedBy()).isEqualTo(DEFAULT_LOGIN);
        assertThat(userDTO.getCreatedDate()).isEqualTo(userForDtoTest.getCreatedDate());
        assertThat(userDTO.getLastModifiedBy()).isEqualTo(DEFAULT_LOGIN);
        assertThat(userDTO.getLastModifiedDate()).isEqualTo(userForDtoTest.getLastModifiedDate());
        assertThat(userDTO.getAuthorities()).containsExactly(AuthoritiesConstants.USER);
        assertThat(userDTO.toString()).isNotNull();
    }

    @Test
    public void testAuthorityEquals() {
        Authority authorityA = new Authority();
        assertThat(authorityA).isEqualTo(authorityA);
        assertThat(authorityA).isNotEqualTo(null);
        assertThat(authorityA).isNotEqualTo(new Object());
        assertThat(authorityA.hashCode()).isEqualTo(0);
        assertThat(authorityA.toString()).isNotNull();

        Authority authorityB = new Authority();
        assertThat(authorityA).isEqualTo(authorityB);

        authorityB.setName(AuthoritiesConstants.ADMIN);
        assertThat(authorityA).isNotEqualTo(authorityB);

        authorityA.setName(AuthoritiesConstants.USER);
        assertThat(authorityA).isNotEqualTo(authorityB);

        authorityB.setName(AuthoritiesConstants.USER);
        assertThat(authorityA).isEqualTo(authorityB);
        assertThat(authorityA.hashCode()).isEqualTo(authorityB.hashCode());
    }
}
