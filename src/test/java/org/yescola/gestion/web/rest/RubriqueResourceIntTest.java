package org.yescola.gestion.web.rest;

import org.yescola.gestion.GestionEcoleApp;

import org.yescola.gestion.domain.Rubrique;
import org.yescola.gestion.repository.RubriqueRepository;
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
 * Test class for the RubriqueResource REST controller.
 *
 * @see RubriqueResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionEcoleApp.class)
public class RubriqueResourceIntTest {

    private static final String DEFAULT_LIBELLE_RUBRIQUE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE_RUBRIQUE = "BBBBBBBBBB";

    private static final String DEFAULT_RANG_RUBRIQUE = "AAAAAAAAAA";
    private static final String UPDATED_RANG_RUBRIQUE = "BBBBBBBBBB";

    private static final String DEFAULT_ICONE_RUBRIQUE = "AAAAAAAAAA";
    private static final String UPDATED_ICONE_RUBRIQUE = "BBBBBBBBBB";

    private static final Integer DEFAULT_ETAT_RUBRIQUE = 1;
    private static final Integer UPDATED_ETAT_RUBRIQUE = 2;

    private static final Integer DEFAULT_RANG = 1;
    private static final Integer UPDATED_RANG = 2;

    @Autowired
    private RubriqueRepository rubriqueRepository;

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

    private MockMvc restRubriqueMockMvc;

    private Rubrique rubrique;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RubriqueResource rubriqueResource = new RubriqueResource(rubriqueRepository);
        this.restRubriqueMockMvc = MockMvcBuilders.standaloneSetup(rubriqueResource)
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
    public static Rubrique createEntity(EntityManager em) {
        Rubrique rubrique = new Rubrique()
            .libelleRubrique(DEFAULT_LIBELLE_RUBRIQUE)
            .rangRubrique(DEFAULT_RANG_RUBRIQUE)
            .iconeRubrique(DEFAULT_ICONE_RUBRIQUE)
            .etatRubrique(DEFAULT_ETAT_RUBRIQUE)
            .rang(DEFAULT_RANG);
        return rubrique;
    }

    @Before
    public void initTest() {
        rubrique = createEntity(em);
    }

    @Test
    @Transactional
    public void createRubrique() throws Exception {
        int databaseSizeBeforeCreate = rubriqueRepository.findAll().size();

        // Create the Rubrique
        restRubriqueMockMvc.perform(post("/api/rubriques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rubrique)))
            .andExpect(status().isCreated());

        // Validate the Rubrique in the database
        List<Rubrique> rubriqueList = rubriqueRepository.findAll();
        assertThat(rubriqueList).hasSize(databaseSizeBeforeCreate + 1);
        Rubrique testRubrique = rubriqueList.get(rubriqueList.size() - 1);
        assertThat(testRubrique.getLibelleRubrique()).isEqualTo(DEFAULT_LIBELLE_RUBRIQUE);
        assertThat(testRubrique.getRangRubrique()).isEqualTo(DEFAULT_RANG_RUBRIQUE);
        assertThat(testRubrique.getIconeRubrique()).isEqualTo(DEFAULT_ICONE_RUBRIQUE);
        assertThat(testRubrique.getEtatRubrique()).isEqualTo(DEFAULT_ETAT_RUBRIQUE);
        assertThat(testRubrique.getRang()).isEqualTo(DEFAULT_RANG);
    }

    @Test
    @Transactional
    public void createRubriqueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rubriqueRepository.findAll().size();

        // Create the Rubrique with an existing ID
        rubrique.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRubriqueMockMvc.perform(post("/api/rubriques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rubrique)))
            .andExpect(status().isBadRequest());

        // Validate the Rubrique in the database
        List<Rubrique> rubriqueList = rubriqueRepository.findAll();
        assertThat(rubriqueList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRubriques() throws Exception {
        // Initialize the database
        rubriqueRepository.saveAndFlush(rubrique);

        // Get all the rubriqueList
        restRubriqueMockMvc.perform(get("/api/rubriques?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rubrique.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelleRubrique").value(hasItem(DEFAULT_LIBELLE_RUBRIQUE.toString())))
            .andExpect(jsonPath("$.[*].rangRubrique").value(hasItem(DEFAULT_RANG_RUBRIQUE.toString())))
            .andExpect(jsonPath("$.[*].iconeRubrique").value(hasItem(DEFAULT_ICONE_RUBRIQUE.toString())))
            .andExpect(jsonPath("$.[*].etatRubrique").value(hasItem(DEFAULT_ETAT_RUBRIQUE)))
            .andExpect(jsonPath("$.[*].rang").value(hasItem(DEFAULT_RANG)));
    }
    
    @Test
    @Transactional
    public void getRubrique() throws Exception {
        // Initialize the database
        rubriqueRepository.saveAndFlush(rubrique);

        // Get the rubrique
        restRubriqueMockMvc.perform(get("/api/rubriques/{id}", rubrique.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rubrique.getId().intValue()))
            .andExpect(jsonPath("$.libelleRubrique").value(DEFAULT_LIBELLE_RUBRIQUE.toString()))
            .andExpect(jsonPath("$.rangRubrique").value(DEFAULT_RANG_RUBRIQUE.toString()))
            .andExpect(jsonPath("$.iconeRubrique").value(DEFAULT_ICONE_RUBRIQUE.toString()))
            .andExpect(jsonPath("$.etatRubrique").value(DEFAULT_ETAT_RUBRIQUE))
            .andExpect(jsonPath("$.rang").value(DEFAULT_RANG));
    }

    @Test
    @Transactional
    public void getNonExistingRubrique() throws Exception {
        // Get the rubrique
        restRubriqueMockMvc.perform(get("/api/rubriques/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRubrique() throws Exception {
        // Initialize the database
        rubriqueRepository.saveAndFlush(rubrique);

        int databaseSizeBeforeUpdate = rubriqueRepository.findAll().size();

        // Update the rubrique
        Rubrique updatedRubrique = rubriqueRepository.findById(rubrique.getId()).get();
        // Disconnect from session so that the updates on updatedRubrique are not directly saved in db
        em.detach(updatedRubrique);
        updatedRubrique
            .libelleRubrique(UPDATED_LIBELLE_RUBRIQUE)
            .rangRubrique(UPDATED_RANG_RUBRIQUE)
            .iconeRubrique(UPDATED_ICONE_RUBRIQUE)
            .etatRubrique(UPDATED_ETAT_RUBRIQUE)
            .rang(UPDATED_RANG);

        restRubriqueMockMvc.perform(put("/api/rubriques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRubrique)))
            .andExpect(status().isOk());

        // Validate the Rubrique in the database
        List<Rubrique> rubriqueList = rubriqueRepository.findAll();
        assertThat(rubriqueList).hasSize(databaseSizeBeforeUpdate);
        Rubrique testRubrique = rubriqueList.get(rubriqueList.size() - 1);
        assertThat(testRubrique.getLibelleRubrique()).isEqualTo(UPDATED_LIBELLE_RUBRIQUE);
        assertThat(testRubrique.getRangRubrique()).isEqualTo(UPDATED_RANG_RUBRIQUE);
        assertThat(testRubrique.getIconeRubrique()).isEqualTo(UPDATED_ICONE_RUBRIQUE);
        assertThat(testRubrique.getEtatRubrique()).isEqualTo(UPDATED_ETAT_RUBRIQUE);
        assertThat(testRubrique.getRang()).isEqualTo(UPDATED_RANG);
    }

    @Test
    @Transactional
    public void updateNonExistingRubrique() throws Exception {
        int databaseSizeBeforeUpdate = rubriqueRepository.findAll().size();

        // Create the Rubrique

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRubriqueMockMvc.perform(put("/api/rubriques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rubrique)))
            .andExpect(status().isBadRequest());

        // Validate the Rubrique in the database
        List<Rubrique> rubriqueList = rubriqueRepository.findAll();
        assertThat(rubriqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRubrique() throws Exception {
        // Initialize the database
        rubriqueRepository.saveAndFlush(rubrique);

        int databaseSizeBeforeDelete = rubriqueRepository.findAll().size();

        // Delete the rubrique
        restRubriqueMockMvc.perform(delete("/api/rubriques/{id}", rubrique.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Rubrique> rubriqueList = rubriqueRepository.findAll();
        assertThat(rubriqueList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Rubrique.class);
        Rubrique rubrique1 = new Rubrique();
        rubrique1.setId(1L);
        Rubrique rubrique2 = new Rubrique();
        rubrique2.setId(rubrique1.getId());
        assertThat(rubrique1).isEqualTo(rubrique2);
        rubrique2.setId(2L);
        assertThat(rubrique1).isNotEqualTo(rubrique2);
        rubrique1.setId(null);
        assertThat(rubrique1).isNotEqualTo(rubrique2);
    }
}
