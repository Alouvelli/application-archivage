package org.yescola.gestion.web.rest;

import org.yescola.gestion.GestionEcoleApp;

import org.yescola.gestion.domain.Semestre;
import org.yescola.gestion.repository.SemestreRepository;
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
 * Test class for the SemestreResource REST controller.
 *
 * @see SemestreResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionEcoleApp.class)
public class SemestreResourceIntTest {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final Integer DEFAULT_ETAT = 1;
    private static final Integer UPDATED_ETAT = 2;

    @Autowired
    private SemestreRepository semestreRepository;

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

    private MockMvc restSemestreMockMvc;

    private Semestre semestre;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SemestreResource semestreResource = new SemestreResource(semestreRepository);
        this.restSemestreMockMvc = MockMvcBuilders.standaloneSetup(semestreResource)
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
    public static Semestre createEntity(EntityManager em) {
        Semestre semestre = new Semestre()
            .libelle(DEFAULT_LIBELLE)
            .etat(DEFAULT_ETAT);
        return semestre;
    }

    @Before
    public void initTest() {
        semestre = createEntity(em);
    }

    @Test
    @Transactional
    public void createSemestre() throws Exception {
        int databaseSizeBeforeCreate = semestreRepository.findAll().size();

        // Create the Semestre
        restSemestreMockMvc.perform(post("/api/semestres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(semestre)))
            .andExpect(status().isCreated());

        // Validate the Semestre in the database
        List<Semestre> semestreList = semestreRepository.findAll();
        assertThat(semestreList).hasSize(databaseSizeBeforeCreate + 1);
        Semestre testSemestre = semestreList.get(semestreList.size() - 1);
        assertThat(testSemestre.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testSemestre.getEtat()).isEqualTo(DEFAULT_ETAT);
    }

    @Test
    @Transactional
    public void createSemestreWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = semestreRepository.findAll().size();

        // Create the Semestre with an existing ID
        semestre.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSemestreMockMvc.perform(post("/api/semestres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(semestre)))
            .andExpect(status().isBadRequest());

        // Validate the Semestre in the database
        List<Semestre> semestreList = semestreRepository.findAll();
        assertThat(semestreList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSemestres() throws Exception {
        // Initialize the database
        semestreRepository.saveAndFlush(semestre);

        // Get all the semestreList
        restSemestreMockMvc.perform(get("/api/semestres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(semestre.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE.toString())))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT)));
    }
    
    @Test
    @Transactional
    public void getSemestre() throws Exception {
        // Initialize the database
        semestreRepository.saveAndFlush(semestre);

        // Get the semestre
        restSemestreMockMvc.perform(get("/api/semestres/{id}", semestre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(semestre.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE.toString()))
            .andExpect(jsonPath("$.etat").value(DEFAULT_ETAT));
    }

    @Test
    @Transactional
    public void getNonExistingSemestre() throws Exception {
        // Get the semestre
        restSemestreMockMvc.perform(get("/api/semestres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSemestre() throws Exception {
        // Initialize the database
        semestreRepository.saveAndFlush(semestre);

        int databaseSizeBeforeUpdate = semestreRepository.findAll().size();

        // Update the semestre
        Semestre updatedSemestre = semestreRepository.findById(semestre.getId()).get();
        // Disconnect from session so that the updates on updatedSemestre are not directly saved in db
        em.detach(updatedSemestre);
        updatedSemestre
            .libelle(UPDATED_LIBELLE)
            .etat(UPDATED_ETAT);

        restSemestreMockMvc.perform(put("/api/semestres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSemestre)))
            .andExpect(status().isOk());

        // Validate the Semestre in the database
        List<Semestre> semestreList = semestreRepository.findAll();
        assertThat(semestreList).hasSize(databaseSizeBeforeUpdate);
        Semestre testSemestre = semestreList.get(semestreList.size() - 1);
        assertThat(testSemestre.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testSemestre.getEtat()).isEqualTo(UPDATED_ETAT);
    }

    @Test
    @Transactional
    public void updateNonExistingSemestre() throws Exception {
        int databaseSizeBeforeUpdate = semestreRepository.findAll().size();

        // Create the Semestre

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSemestreMockMvc.perform(put("/api/semestres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(semestre)))
            .andExpect(status().isBadRequest());

        // Validate the Semestre in the database
        List<Semestre> semestreList = semestreRepository.findAll();
        assertThat(semestreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSemestre() throws Exception {
        // Initialize the database
        semestreRepository.saveAndFlush(semestre);

        int databaseSizeBeforeDelete = semestreRepository.findAll().size();

        // Delete the semestre
        restSemestreMockMvc.perform(delete("/api/semestres/{id}", semestre.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Semestre> semestreList = semestreRepository.findAll();
        assertThat(semestreList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Semestre.class);
        Semestre semestre1 = new Semestre();
        semestre1.setId(1L);
        Semestre semestre2 = new Semestre();
        semestre2.setId(semestre1.getId());
        assertThat(semestre1).isEqualTo(semestre2);
        semestre2.setId(2L);
        assertThat(semestre1).isNotEqualTo(semestre2);
        semestre1.setId(null);
        assertThat(semestre1).isNotEqualTo(semestre2);
    }
}
