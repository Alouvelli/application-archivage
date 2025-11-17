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
import org.yescola.gestion.domain.Anneescolaire;
import org.yescola.gestion.repository.AnneescolaireRepository;
import org.yescola.gestion.web.rest.errors.ExceptionTranslator;

import jakarta.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.yescola.gestion.web.rest.TestUtil.createFormattingConversionService;

/**
 * Test class for the AnneescolaireResource REST controller.
 *
 * @see AnneescolaireResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionEcoleApp.class)
public class AnneescolaireResourceIT {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_ENCOURS = "AAAAAAAAAA";
    private static final String UPDATED_ENCOURS = "BBBBBBBBBB";

    private static final String DEFAULT_ETAT = "AAAAAAAAAA";
    private static final String UPDATED_ETAT = "BBBBBBBBBB";

    @Autowired
    private AnneescolaireRepository anneescolaireRepository;

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

    private MockMvc restAnneescolaireMockMvc;

    private Anneescolaire anneescolaire;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AnneescolaireResource anneescolaireResource = new AnneescolaireResource(anneescolaireRepository);
        this.restAnneescolaireMockMvc = MockMvcBuilders.standaloneSetup(anneescolaireResource)
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
    public static Anneescolaire createEntity(EntityManager em) {
        Anneescolaire anneescolaire = new Anneescolaire()
            .libelle(DEFAULT_LIBELLE)
            .encours(DEFAULT_ENCOURS)
            .etat(DEFAULT_ETAT);
        return anneescolaire;
    }

    @Before
    public void initTest() {
        anneescolaire = createEntity(em);
    }

    @Test
    @Transactional
    public void createAnneescolaire() throws Exception {
        int databaseSizeBeforeCreate = anneescolaireRepository.findAll().size();

        // Create the Anneescolaire
        restAnneescolaireMockMvc.perform(post("/api/anneescolaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anneescolaire)))
            .andExpect(status().isCreated());

        // Validate the Anneescolaire in the database
        List<Anneescolaire> anneescolaireList = anneescolaireRepository.findAll();
        assertThat(anneescolaireList).hasSize(databaseSizeBeforeCreate + 1);
        Anneescolaire testAnneescolaire = anneescolaireList.get(anneescolaireList.size() - 1);
        assertThat(testAnneescolaire.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testAnneescolaire.getEncours()).isEqualTo(DEFAULT_ENCOURS);
        assertThat(testAnneescolaire.getEtat()).isEqualTo(DEFAULT_ETAT);
    }

    @Test
    @Transactional
    public void createAnneescolaireWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = anneescolaireRepository.findAll().size();

        // Create the Anneescolaire with an existing ID
        anneescolaire.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnneescolaireMockMvc.perform(post("/api/anneescolaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anneescolaire)))
            .andExpect(status().isBadRequest());

        // Validate the Anneescolaire in the database
        List<Anneescolaire> anneescolaireList = anneescolaireRepository.findAll();
        assertThat(anneescolaireList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAnneescolaires() throws Exception {
        // Initialize the database
        anneescolaireRepository.saveAndFlush(anneescolaire);

        // Get all the anneescolaireList
        restAnneescolaireMockMvc.perform(get("/api/anneescolaires?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(anneescolaire.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE.toString())))
            .andExpect(jsonPath("$.[*].encours").value(hasItem(DEFAULT_ENCOURS.toString())))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT.toString())));
    }

    @Test
    @Transactional
    public void getAnneescolaire() throws Exception {
        // Initialize the database
        anneescolaireRepository.saveAndFlush(anneescolaire);

        // Get the anneescolaire
        restAnneescolaireMockMvc.perform(get("/api/anneescolaires/{id}", anneescolaire.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(anneescolaire.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE.toString()))
            .andExpect(jsonPath("$.encours").value(DEFAULT_ENCOURS.toString()))
            .andExpect(jsonPath("$.etat").value(DEFAULT_ETAT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAnneescolaire() throws Exception {
        // Get the anneescolaire
        restAnneescolaireMockMvc.perform(get("/api/anneescolaires/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAnneescolaire() throws Exception {
        // Initialize the database
        anneescolaireRepository.saveAndFlush(anneescolaire);

        int databaseSizeBeforeUpdate = anneescolaireRepository.findAll().size();

        // Update the anneescolaire
        Anneescolaire updatedAnneescolaire = anneescolaireRepository.findById(anneescolaire.getId())
            .orElseThrow(() -> new IllegalStateException("Annee Scolaire not found in database"));
        // Disconnect from session so that the updates on updatedAnneescolaire are not directly saved in db
        em.detach(updatedAnneescolaire);
        updatedAnneescolaire
            .libelle(UPDATED_LIBELLE)
            .encours(UPDATED_ENCOURS)
            .etat(UPDATED_ETAT);

        restAnneescolaireMockMvc.perform(put("/api/anneescolaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAnneescolaire)))
            .andExpect(status().isOk());

        // Validate the Anneescolaire in the database
        List<Anneescolaire> anneescolaireList = anneescolaireRepository.findAll();
        assertThat(anneescolaireList).hasSize(databaseSizeBeforeUpdate);
        Anneescolaire testAnneescolaire = anneescolaireList.get(anneescolaireList.size() - 1);
        assertThat(testAnneescolaire.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testAnneescolaire.getEncours()).isEqualTo(UPDATED_ENCOURS);
        assertThat(testAnneescolaire.getEtat()).isEqualTo(UPDATED_ETAT);
    }

    @Test
    @Transactional
    public void updateNonExistingAnneescolaire() throws Exception {
        int databaseSizeBeforeUpdate = anneescolaireRepository.findAll().size();

        // Create the Anneescolaire

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnneescolaireMockMvc.perform(put("/api/anneescolaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(anneescolaire)))
            .andExpect(status().isBadRequest());

        // Validate the Anneescolaire in the database
        List<Anneescolaire> anneescolaireList = anneescolaireRepository.findAll();
        assertThat(anneescolaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAnneescolaire() throws Exception {
        // Initialize the database
        anneescolaireRepository.saveAndFlush(anneescolaire);

        int databaseSizeBeforeDelete = anneescolaireRepository.findAll().size();

        // Delete the anneescolaire
        restAnneescolaireMockMvc.perform(delete("/api/anneescolaires/{id}", anneescolaire.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Anneescolaire> anneescolaireList = anneescolaireRepository.findAll();
        assertThat(anneescolaireList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Anneescolaire.class);
        Anneescolaire anneescolaire1 = new Anneescolaire();
        anneescolaire1.setId(1L);
        Anneescolaire anneescolaire2 = new Anneescolaire();
        anneescolaire2.setId(anneescolaire1.getId());
        assertThat(anneescolaire1).isEqualTo(anneescolaire2);
        anneescolaire2.setId(2L);
        assertThat(anneescolaire1).isNotEqualTo(anneescolaire2);
        anneescolaire1.setId(null);
        assertThat(anneescolaire1).isNotEqualTo(anneescolaire2);
    }
}
