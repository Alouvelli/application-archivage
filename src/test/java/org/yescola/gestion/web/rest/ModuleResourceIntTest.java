package org.yescola.gestion.web.rest;

import org.yescola.gestion.GestionEcoleApp;

import org.yescola.gestion.domain.Module;
import org.yescola.gestion.repository.ModuleRepository;
import org.yescola.gestion.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static org.yescola.gestion.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ModuleResource REST controller.
 *
 * @see ModuleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionEcoleApp.class)
public class ModuleResourceIntTest {

    private static final String DEFAULT_LIBELLE_MODULE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE_MODULE = "BBBBBBBBBB";

    private static final String DEFAULT_LOGO_MODULE = "AAAAAAAAAA";
    private static final String UPDATED_LOGO_MODULE = "BBBBBBBBBB";

    private static final Integer DEFAULT_ETAT_MODULE = 1;
    private static final Integer UPDATED_ETAT_MODULE = 2;

    private static final Integer DEFAULT_RANG = 1;
    private static final Integer UPDATED_RANG = 2;

    @Autowired
    private ModuleRepository moduleRepository;

    @Mock
    private ModuleRepository moduleRepositoryMock;

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

    private MockMvc restModuleMockMvc;

    private Module module;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ModuleResource moduleResource = new ModuleResource(moduleRepository);
        this.restModuleMockMvc = MockMvcBuilders.standaloneSetup(moduleResource)
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
    public static Module createEntity(EntityManager em) {
        Module module = new Module()
            .libelleModule(DEFAULT_LIBELLE_MODULE)
            .logoModule(DEFAULT_LOGO_MODULE)
            .etatModule(DEFAULT_ETAT_MODULE)
            .rang(DEFAULT_RANG);
        return module;
    }

    @Before
    public void initTest() {
        module = createEntity(em);
    }

    @Test
    @Transactional
    public void createModule() throws Exception {
        int databaseSizeBeforeCreate = moduleRepository.findAll().size();

        // Create the Module
        restModuleMockMvc.perform(post("/api/modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(module)))
            .andExpect(status().isCreated());

        // Validate the Module in the database
        List<Module> moduleList = moduleRepository.findAll();
        assertThat(moduleList).hasSize(databaseSizeBeforeCreate + 1);
        Module testModule = moduleList.get(moduleList.size() - 1);
        assertThat(testModule.getLibelleModule()).isEqualTo(DEFAULT_LIBELLE_MODULE);
        assertThat(testModule.getLogoModule()).isEqualTo(DEFAULT_LOGO_MODULE);
        assertThat(testModule.getEtatModule()).isEqualTo(DEFAULT_ETAT_MODULE);
        assertThat(testModule.getRang()).isEqualTo(DEFAULT_RANG);
    }

    @Test
    @Transactional
    public void createModuleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = moduleRepository.findAll().size();

        // Create the Module with an existing ID
        module.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restModuleMockMvc.perform(post("/api/modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(module)))
            .andExpect(status().isBadRequest());

        // Validate the Module in the database
        List<Module> moduleList = moduleRepository.findAll();
        assertThat(moduleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllModules() throws Exception {
        // Initialize the database
        moduleRepository.saveAndFlush(module);

        // Get all the moduleList
        restModuleMockMvc.perform(get("/api/modules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(module.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelleModule").value(hasItem(DEFAULT_LIBELLE_MODULE.toString())))
            .andExpect(jsonPath("$.[*].logoModule").value(hasItem(DEFAULT_LOGO_MODULE.toString())))
            .andExpect(jsonPath("$.[*].etatModule").value(hasItem(DEFAULT_ETAT_MODULE)))
            .andExpect(jsonPath("$.[*].rang").value(hasItem(DEFAULT_RANG)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllModulesWithEagerRelationshipsIsEnabled() throws Exception {
        ModuleResource moduleResource = new ModuleResource(moduleRepositoryMock);
        when(moduleRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restModuleMockMvc = MockMvcBuilders.standaloneSetup(moduleResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restModuleMockMvc.perform(get("/api/modules?eagerload=true"))
        .andExpect(status().isOk());

        verify(moduleRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllModulesWithEagerRelationshipsIsNotEnabled() throws Exception {
        ModuleResource moduleResource = new ModuleResource(moduleRepositoryMock);
            when(moduleRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restModuleMockMvc = MockMvcBuilders.standaloneSetup(moduleResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restModuleMockMvc.perform(get("/api/modules?eagerload=true"))
        .andExpect(status().isOk());

            verify(moduleRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getModule() throws Exception {
        // Initialize the database
        moduleRepository.saveAndFlush(module);

        // Get the module
        restModuleMockMvc.perform(get("/api/modules/{id}", module.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(module.getId().intValue()))
            .andExpect(jsonPath("$.libelleModule").value(DEFAULT_LIBELLE_MODULE.toString()))
            .andExpect(jsonPath("$.logoModule").value(DEFAULT_LOGO_MODULE.toString()))
            .andExpect(jsonPath("$.etatModule").value(DEFAULT_ETAT_MODULE))
            .andExpect(jsonPath("$.rang").value(DEFAULT_RANG));
    }

    @Test
    @Transactional
    public void getNonExistingModule() throws Exception {
        // Get the module
        restModuleMockMvc.perform(get("/api/modules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateModule() throws Exception {
        // Initialize the database
        moduleRepository.saveAndFlush(module);

        int databaseSizeBeforeUpdate = moduleRepository.findAll().size();

        // Update the module
        Module updatedModule = moduleRepository.findById(module.getId()).get();
        // Disconnect from session so that the updates on updatedModule are not directly saved in db
        em.detach(updatedModule);
        updatedModule
            .libelleModule(UPDATED_LIBELLE_MODULE)
            .logoModule(UPDATED_LOGO_MODULE)
            .etatModule(UPDATED_ETAT_MODULE)
            .rang(UPDATED_RANG);

        restModuleMockMvc.perform(put("/api/modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedModule)))
            .andExpect(status().isOk());

        // Validate the Module in the database
        List<Module> moduleList = moduleRepository.findAll();
        assertThat(moduleList).hasSize(databaseSizeBeforeUpdate);
        Module testModule = moduleList.get(moduleList.size() - 1);
        assertThat(testModule.getLibelleModule()).isEqualTo(UPDATED_LIBELLE_MODULE);
        assertThat(testModule.getLogoModule()).isEqualTo(UPDATED_LOGO_MODULE);
        assertThat(testModule.getEtatModule()).isEqualTo(UPDATED_ETAT_MODULE);
        assertThat(testModule.getRang()).isEqualTo(UPDATED_RANG);
    }

    @Test
    @Transactional
    public void updateNonExistingModule() throws Exception {
        int databaseSizeBeforeUpdate = moduleRepository.findAll().size();

        // Create the Module

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restModuleMockMvc.perform(put("/api/modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(module)))
            .andExpect(status().isBadRequest());

        // Validate the Module in the database
        List<Module> moduleList = moduleRepository.findAll();
        assertThat(moduleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteModule() throws Exception {
        // Initialize the database
        moduleRepository.saveAndFlush(module);

        int databaseSizeBeforeDelete = moduleRepository.findAll().size();

        // Delete the module
        restModuleMockMvc.perform(delete("/api/modules/{id}", module.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Module> moduleList = moduleRepository.findAll();
        assertThat(moduleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Module.class);
        Module module1 = new Module();
        module1.setId(1L);
        Module module2 = new Module();
        module2.setId(module1.getId());
        assertThat(module1).isEqualTo(module2);
        module2.setId(2L);
        assertThat(module1).isNotEqualTo(module2);
        module1.setId(null);
        assertThat(module1).isNotEqualTo(module2);
    }
}
