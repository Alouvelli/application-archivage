package org.yescola.gestion.web.rest;

import org.yescola.gestion.GestionEcoleApp;

import org.yescola.gestion.domain.RubriqueProfil;
import org.yescola.gestion.repository.RubriqueProfilRepository;
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
 * Test class for the RubriqueProfilResource REST controller.
 *
 * @see RubriqueProfilResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionEcoleApp.class)
public class RubriqueProfilResourceIntTest {

    private static final Boolean DEFAULT_ENCOURS = false;
    private static final Boolean UPDATED_ENCOURS = true;

    @Autowired
    private RubriqueProfilRepository rubriqueProfilRepository;

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

    private MockMvc restRubriqueProfilMockMvc;

    private RubriqueProfil rubriqueProfil;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RubriqueProfilResource rubriqueProfilResource = new RubriqueProfilResource(rubriqueProfilRepository);
        this.restRubriqueProfilMockMvc = MockMvcBuilders.standaloneSetup(rubriqueProfilResource)
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
    public static RubriqueProfil createEntity(EntityManager em) {
        RubriqueProfil rubriqueProfil = new RubriqueProfil()
            .encours(DEFAULT_ENCOURS);
        return rubriqueProfil;
    }

    @Before
    public void initTest() {
        rubriqueProfil = createEntity(em);
    }

    @Test
    @Transactional
    public void createRubriqueProfil() throws Exception {
        int databaseSizeBeforeCreate = rubriqueProfilRepository.findAll().size();

        // Create the RubriqueProfil
        restRubriqueProfilMockMvc.perform(post("/api/rubrique-profils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rubriqueProfil)))
            .andExpect(status().isCreated());

        // Validate the RubriqueProfil in the database
        List<RubriqueProfil> rubriqueProfilList = rubriqueProfilRepository.findAll();
        assertThat(rubriqueProfilList).hasSize(databaseSizeBeforeCreate + 1);
        RubriqueProfil testRubriqueProfil = rubriqueProfilList.get(rubriqueProfilList.size() - 1);
        assertThat(testRubriqueProfil.isEncours()).isEqualTo(DEFAULT_ENCOURS);
    }

    @Test
    @Transactional
    public void createRubriqueProfilWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rubriqueProfilRepository.findAll().size();

        // Create the RubriqueProfil with an existing ID
        rubriqueProfil.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRubriqueProfilMockMvc.perform(post("/api/rubrique-profils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rubriqueProfil)))
            .andExpect(status().isBadRequest());

        // Validate the RubriqueProfil in the database
        List<RubriqueProfil> rubriqueProfilList = rubriqueProfilRepository.findAll();
        assertThat(rubriqueProfilList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRubriqueProfils() throws Exception {
        // Initialize the database
        rubriqueProfilRepository.saveAndFlush(rubriqueProfil);

        // Get all the rubriqueProfilList
        restRubriqueProfilMockMvc.perform(get("/api/rubrique-profils?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rubriqueProfil.getId().intValue())))
            .andExpect(jsonPath("$.[*].encours").value(hasItem(DEFAULT_ENCOURS.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getRubriqueProfil() throws Exception {
        // Initialize the database
        rubriqueProfilRepository.saveAndFlush(rubriqueProfil);

        // Get the rubriqueProfil
        restRubriqueProfilMockMvc.perform(get("/api/rubrique-profils/{id}", rubriqueProfil.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rubriqueProfil.getId().intValue()))
            .andExpect(jsonPath("$.encours").value(DEFAULT_ENCOURS.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRubriqueProfil() throws Exception {
        // Get the rubriqueProfil
        restRubriqueProfilMockMvc.perform(get("/api/rubrique-profils/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRubriqueProfil() throws Exception {
        // Initialize the database
        rubriqueProfilRepository.saveAndFlush(rubriqueProfil);

        int databaseSizeBeforeUpdate = rubriqueProfilRepository.findAll().size();

        // Update the rubriqueProfil
        RubriqueProfil updatedRubriqueProfil = rubriqueProfilRepository.findById(rubriqueProfil.getId()).get();
        // Disconnect from session so that the updates on updatedRubriqueProfil are not directly saved in db
        em.detach(updatedRubriqueProfil);
        updatedRubriqueProfil
            .encours(UPDATED_ENCOURS);

        restRubriqueProfilMockMvc.perform(put("/api/rubrique-profils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRubriqueProfil)))
            .andExpect(status().isOk());

        // Validate the RubriqueProfil in the database
        List<RubriqueProfil> rubriqueProfilList = rubriqueProfilRepository.findAll();
        assertThat(rubriqueProfilList).hasSize(databaseSizeBeforeUpdate);
        RubriqueProfil testRubriqueProfil = rubriqueProfilList.get(rubriqueProfilList.size() - 1);
        assertThat(testRubriqueProfil.isEncours()).isEqualTo(UPDATED_ENCOURS);
    }

    @Test
    @Transactional
    public void updateNonExistingRubriqueProfil() throws Exception {
        int databaseSizeBeforeUpdate = rubriqueProfilRepository.findAll().size();

        // Create the RubriqueProfil

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRubriqueProfilMockMvc.perform(put("/api/rubrique-profils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rubriqueProfil)))
            .andExpect(status().isBadRequest());

        // Validate the RubriqueProfil in the database
        List<RubriqueProfil> rubriqueProfilList = rubriqueProfilRepository.findAll();
        assertThat(rubriqueProfilList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRubriqueProfil() throws Exception {
        // Initialize the database
        rubriqueProfilRepository.saveAndFlush(rubriqueProfil);

        int databaseSizeBeforeDelete = rubriqueProfilRepository.findAll().size();

        // Delete the rubriqueProfil
        restRubriqueProfilMockMvc.perform(delete("/api/rubrique-profils/{id}", rubriqueProfil.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RubriqueProfil> rubriqueProfilList = rubriqueProfilRepository.findAll();
        assertThat(rubriqueProfilList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RubriqueProfil.class);
        RubriqueProfil rubriqueProfil1 = new RubriqueProfil();
        rubriqueProfil1.setId(1L);
        RubriqueProfil rubriqueProfil2 = new RubriqueProfil();
        rubriqueProfil2.setId(rubriqueProfil1.getId());
        assertThat(rubriqueProfil1).isEqualTo(rubriqueProfil2);
        rubriqueProfil2.setId(2L);
        assertThat(rubriqueProfil1).isNotEqualTo(rubriqueProfil2);
        rubriqueProfil1.setId(null);
        assertThat(rubriqueProfil1).isNotEqualTo(rubriqueProfil2);
    }
}
