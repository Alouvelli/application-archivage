package org.yescola.gestion.web.rest;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;
import org.yescola.gestion.GestionEcoleApp;
import org.yescola.gestion.domain.ProfilMenu;
import org.yescola.gestion.repository.ProfilMenuRepository;
import org.yescola.gestion.web.rest.errors.ExceptionTranslator;

import jakarta.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.yescola.gestion.web.rest.TestUtil.createFormattingConversionService;

/**
 * Test class for the ProfilMenuResource REST controller.
 *
 * @see ProfilMenuResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionEcoleApp.class)
public class ProfilMenuResourceIT {

    private static final Integer DEFAULT_VOIR = 1;
    private static final Integer UPDATED_VOIR = 2;

    private static final Integer DEFAULT_AJOUTER = 1;
    private static final Integer UPDATED_AJOUTER = 2;

    private static final Integer DEFAULT_SUPPRIMER = 1;
    private static final Integer UPDATED_SUPPRIMER = 2;

    private static final Integer DEFAULT_MODIFIER = 1;
    private static final Integer UPDATED_MODIFIER = 2;

    private static final Integer DEFAULT_IMPRIMER = 1;
    private static final Integer UPDATED_IMPRIMER = 2;

    @Autowired
    private ProfilMenuRepository profilMenuRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restProfilMenuMockMvc;

    private ProfilMenu profilMenu;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProfilMenuResource profilMenuResource = new ProfilMenuResource(profilMenuRepository);
        this.restProfilMenuMockMvc = MockMvcBuilders.standaloneSetup(profilMenuResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfilMenu createEntity(EntityManager em) {
        ProfilMenu profilMenu = new ProfilMenu()
            .voir(DEFAULT_VOIR)
            .ajouter(DEFAULT_AJOUTER)
            .supprimer(DEFAULT_SUPPRIMER)
            .modifier(DEFAULT_MODIFIER)
            .imprimer(DEFAULT_IMPRIMER);
        return profilMenu;
    }

    @Before
    public void initTest() {
        profilMenu = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfilMenu() throws Exception {
        int databaseSizeBeforeCreate = profilMenuRepository.findAll().size();

        // Create the ProfilMenu
        restProfilMenuMockMvc.perform(post("/api/profil-menus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(profilMenu)))
            .andExpect(status().isCreated());

        // Validate the ProfilMenu in the database
        List<ProfilMenu> profilMenuList = profilMenuRepository.findAll();
        assertThat(profilMenuList).hasSize(databaseSizeBeforeCreate + 1);
        ProfilMenu testProfilMenu = profilMenuList.get(profilMenuList.size() - 1);
        assertThat(testProfilMenu.getVoir()).isEqualTo(DEFAULT_VOIR);
        assertThat(testProfilMenu.getAjouter()).isEqualTo(DEFAULT_AJOUTER);
        assertThat(testProfilMenu.getSupprimer()).isEqualTo(DEFAULT_SUPPRIMER);
        assertThat(testProfilMenu.getModifier()).isEqualTo(DEFAULT_MODIFIER);
        assertThat(testProfilMenu.getImprimer()).isEqualTo(DEFAULT_IMPRIMER);
    }

    @Test
    @Transactional
    public void createProfilMenuWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = profilMenuRepository.findAll().size();

        // Create the ProfilMenu with an existing ID
        profilMenu.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfilMenuMockMvc.perform(post("/api/profil-menus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(profilMenu)))
            .andExpect(status().isBadRequest());

        // Validate the ProfilMenu in the database
        List<ProfilMenu> profilMenuList = profilMenuRepository.findAll();
        assertThat(profilMenuList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProfilMenus() throws Exception {
        // Initialize the database
        profilMenuRepository.saveAndFlush(profilMenu);

        // Get all the profilMenuList
        restProfilMenuMockMvc.perform(get("/api/profil-menus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profilMenu.getId().intValue())))
            .andExpect(jsonPath("$.[*].voir").value(hasItem(DEFAULT_VOIR)))
            .andExpect(jsonPath("$.[*].ajouter").value(hasItem(DEFAULT_AJOUTER)))
            .andExpect(jsonPath("$.[*].supprimer").value(hasItem(DEFAULT_SUPPRIMER)))
            .andExpect(jsonPath("$.[*].modifier").value(hasItem(DEFAULT_MODIFIER)))
            .andExpect(jsonPath("$.[*].imprimer").value(hasItem(DEFAULT_IMPRIMER)));
    }

    @Test
    @Transactional
    public void getProfilMenu() throws Exception {
        // Initialize the database
        profilMenuRepository.saveAndFlush(profilMenu);

        // Get the profilMenu
        restProfilMenuMockMvc.perform(get("/api/profil-menus/{id}", profilMenu.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(profilMenu.getId().intValue()))
            .andExpect(jsonPath("$.voir").value(DEFAULT_VOIR))
            .andExpect(jsonPath("$.ajouter").value(DEFAULT_AJOUTER))
            .andExpect(jsonPath("$.supprimer").value(DEFAULT_SUPPRIMER))
            .andExpect(jsonPath("$.modifier").value(DEFAULT_MODIFIER))
            .andExpect(jsonPath("$.imprimer").value(DEFAULT_IMPRIMER));
    }

    @Test
    @Transactional
    public void getNonExistingProfilMenu() throws Exception {
        // Get the profilMenu
        restProfilMenuMockMvc.perform(get("/api/profil-menus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfilMenu() throws Exception {
        // Initialize the database
        profilMenuRepository.saveAndFlush(profilMenu);

        int databaseSizeBeforeUpdate = profilMenuRepository.findAll().size();

        // Update the profilMenu
        ProfilMenu updatedProfilMenu = profilMenuRepository.findById(profilMenu.getId()).orElseThrow(() -> new IllegalStateException("ProfileMenu not found in database"));;
        // Disconnect from session so that the updates on updatedProfilMenu are not directly saved in db
        em.detach(updatedProfilMenu);
        updatedProfilMenu
            .voir(UPDATED_VOIR)
            .ajouter(UPDATED_AJOUTER)
            .supprimer(UPDATED_SUPPRIMER)
            .modifier(UPDATED_MODIFIER)
            .imprimer(UPDATED_IMPRIMER);

        restProfilMenuMockMvc.perform(put("/api/profil-menus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfilMenu)))
            .andExpect(status().isOk());

        // Validate the ProfilMenu in the database
        List<ProfilMenu> profilMenuList = profilMenuRepository.findAll();
        assertThat(profilMenuList).hasSize(databaseSizeBeforeUpdate);
        ProfilMenu testProfilMenu = profilMenuList.get(profilMenuList.size() - 1);
        assertThat(testProfilMenu.getVoir()).isEqualTo(UPDATED_VOIR);
        assertThat(testProfilMenu.getAjouter()).isEqualTo(UPDATED_AJOUTER);
        assertThat(testProfilMenu.getSupprimer()).isEqualTo(UPDATED_SUPPRIMER);
        assertThat(testProfilMenu.getModifier()).isEqualTo(UPDATED_MODIFIER);
        assertThat(testProfilMenu.getImprimer()).isEqualTo(UPDATED_IMPRIMER);
    }

    @Test
    @Transactional
    public void updateNonExistingProfilMenu() throws Exception {
        int databaseSizeBeforeUpdate = profilMenuRepository.findAll().size();

        // Create the ProfilMenu

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProfilMenuMockMvc.perform(put("/api/profil-menus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(profilMenu)))
            .andExpect(status().isBadRequest());

        // Validate the ProfilMenu in the database
        List<ProfilMenu> profilMenuList = profilMenuRepository.findAll();
        assertThat(profilMenuList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProfilMenu() throws Exception {
        // Initialize the database
        profilMenuRepository.saveAndFlush(profilMenu);

        int databaseSizeBeforeDelete = profilMenuRepository.findAll().size();

        // Delete the profilMenu
        restProfilMenuMockMvc.perform(delete("/api/profil-menus/{id}", profilMenu.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProfilMenu> profilMenuList = profilMenuRepository.findAll();
        assertThat(profilMenuList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProfilMenu.class);
        ProfilMenu profilMenu1 = new ProfilMenu();
        profilMenu1.setId(1L);
        ProfilMenu profilMenu2 = new ProfilMenu();
        profilMenu2.setId(profilMenu1.getId());
        assertThat(profilMenu1).isEqualTo(profilMenu2);
        profilMenu2.setId(2L);
        assertThat(profilMenu1).isNotEqualTo(profilMenu2);
        profilMenu1.setId(null);
        assertThat(profilMenu1).isNotEqualTo(profilMenu2);
    }
}
