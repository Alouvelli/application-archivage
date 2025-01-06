package org.yescola.gestion.web.rest;

import org.yescola.gestion.GestionEcoleApp;

import org.yescola.gestion.domain.ProfilModule;
import org.yescola.gestion.repository.ProfilModuleRepository;
import org.yescola.gestion.web.rest.errors.ExceptionTranslator;

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

import javax.persistence.EntityManager;
import java.util.List;


import static org.yescola.gestion.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ProfilModuleResource REST controller.
 *
 * @see ProfilModuleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionEcoleApp.class)
public class ProfilModuleResourceIntTest {

    private static final Boolean DEFAULT_ENCOURS = false;
    private static final Boolean UPDATED_ENCOURS = true;

    @Autowired
    private ProfilModuleRepository profilModuleRepository;

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

    private MockMvc restProfilModuleMockMvc;

    private ProfilModule profilModule;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProfilModuleResource profilModuleResource = new ProfilModuleResource(profilModuleRepository);
        this.restProfilModuleMockMvc = MockMvcBuilders.standaloneSetup(profilModuleResource)
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
    public static ProfilModule createEntity(EntityManager em) {
        ProfilModule profilModule = new ProfilModule()
            .encours(DEFAULT_ENCOURS);
        return profilModule;
    }

    @Before
    public void initTest() {
        profilModule = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfilModule() throws Exception {
        int databaseSizeBeforeCreate = profilModuleRepository.findAll().size();

        // Create the ProfilModule
        restProfilModuleMockMvc.perform(post("/api/profil-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(profilModule)))
            .andExpect(status().isCreated());

        // Validate the ProfilModule in the database
        List<ProfilModule> profilModuleList = profilModuleRepository.findAll();
        assertThat(profilModuleList).hasSize(databaseSizeBeforeCreate + 1);
        ProfilModule testProfilModule = profilModuleList.get(profilModuleList.size() - 1);
        assertThat(testProfilModule.isEncours()).isEqualTo(DEFAULT_ENCOURS);
    }

    @Test
    @Transactional
    public void createProfilModuleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = profilModuleRepository.findAll().size();

        // Create the ProfilModule with an existing ID
        profilModule.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfilModuleMockMvc.perform(post("/api/profil-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(profilModule)))
            .andExpect(status().isBadRequest());

        // Validate the ProfilModule in the database
        List<ProfilModule> profilModuleList = profilModuleRepository.findAll();
        assertThat(profilModuleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProfilModules() throws Exception {
        // Initialize the database
        profilModuleRepository.saveAndFlush(profilModule);

        // Get all the profilModuleList
        restProfilModuleMockMvc.perform(get("/api/profil-modules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profilModule.getId().intValue())))
            .andExpect(jsonPath("$.[*].encours").value(hasItem(DEFAULT_ENCOURS.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getProfilModule() throws Exception {
        // Initialize the database
        profilModuleRepository.saveAndFlush(profilModule);

        // Get the profilModule
        restProfilModuleMockMvc.perform(get("/api/profil-modules/{id}", profilModule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(profilModule.getId().intValue()))
            .andExpect(jsonPath("$.encours").value(DEFAULT_ENCOURS.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingProfilModule() throws Exception {
        // Get the profilModule
        restProfilModuleMockMvc.perform(get("/api/profil-modules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfilModule() throws Exception {
        // Initialize the database
        profilModuleRepository.saveAndFlush(profilModule);

        int databaseSizeBeforeUpdate = profilModuleRepository.findAll().size();

        // Update the profilModule
        ProfilModule updatedProfilModule = profilModuleRepository.findById(profilModule.getId()).get();
        // Disconnect from session so that the updates on updatedProfilModule are not directly saved in db
        em.detach(updatedProfilModule);
        updatedProfilModule
            .encours(UPDATED_ENCOURS);

        restProfilModuleMockMvc.perform(put("/api/profil-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfilModule)))
            .andExpect(status().isOk());

        // Validate the ProfilModule in the database
        List<ProfilModule> profilModuleList = profilModuleRepository.findAll();
        assertThat(profilModuleList).hasSize(databaseSizeBeforeUpdate);
        ProfilModule testProfilModule = profilModuleList.get(profilModuleList.size() - 1);
        assertThat(testProfilModule.isEncours()).isEqualTo(UPDATED_ENCOURS);
    }

    @Test
    @Transactional
    public void updateNonExistingProfilModule() throws Exception {
        int databaseSizeBeforeUpdate = profilModuleRepository.findAll().size();

        // Create the ProfilModule

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProfilModuleMockMvc.perform(put("/api/profil-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(profilModule)))
            .andExpect(status().isBadRequest());

        // Validate the ProfilModule in the database
        List<ProfilModule> profilModuleList = profilModuleRepository.findAll();
        assertThat(profilModuleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProfilModule() throws Exception {
        // Initialize the database
        profilModuleRepository.saveAndFlush(profilModule);

        int databaseSizeBeforeDelete = profilModuleRepository.findAll().size();

        // Delete the profilModule
        restProfilModuleMockMvc.perform(delete("/api/profil-modules/{id}", profilModule.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProfilModule> profilModuleList = profilModuleRepository.findAll();
        assertThat(profilModuleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProfilModule.class);
        ProfilModule profilModule1 = new ProfilModule();
        profilModule1.setId(1L);
        ProfilModule profilModule2 = new ProfilModule();
        profilModule2.setId(profilModule1.getId());
        assertThat(profilModule1).isEqualTo(profilModule2);
        profilModule2.setId(2L);
        assertThat(profilModule1).isNotEqualTo(profilModule2);
        profilModule1.setId(null);
        assertThat(profilModule1).isNotEqualTo(profilModule2);
    }
}
