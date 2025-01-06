package org.yescola.gestion.web.rest;

import org.yescola.gestion.GestionEcoleApp;

import org.yescola.gestion.domain.Ecole;
import org.yescola.gestion.repository.EcoleRepository;
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
 * Test class for the EcoleResource REST controller.
 *
 * @see EcoleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionEcoleApp.class)
public class EcoleResourceIntTest {

    private static final String DEFAULT_CODE_ECOLE = "AAAAAAAAAA";
    private static final String UPDATED_CODE_ECOLE = "BBBBBBBBBB";

    private static final String DEFAULT_LOGO_ECOLE = "AAAAAAAAAA";
    private static final String UPDATED_LOGO_ECOLE = "BBBBBBBBBB";

    private static final String DEFAULT_ENTETE_ECOLE = "AAAAAAAAAA";
    private static final String UPDATED_ENTETE_ECOLE = "BBBBBBBBBB";

    private static final String DEFAULT_BAS_PAGE_ECOLE = "AAAAAAAAAA";
    private static final String UPDATED_BAS_PAGE_ECOLE = "BBBBBBBBBB";

    private static final String DEFAULT_NINEA_ECOLE = "AAAAAAAAAA";
    private static final String UPDATED_NINEA_ECOLE = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE_ECOLE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE_ECOLE = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE_ECOLE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE_ECOLE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL_ECOLE = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL_ECOLE = "BBBBBBBBBB";

    private static final String DEFAULT_SIGLE_ECOLE = "AAAAAAAAAA";
    private static final String UPDATED_SIGLE_ECOLE = "BBBBBBBBBB";

    private static final String DEFAULT_FAX_ECOLE = "AAAAAAAAAA";
    private static final String UPDATED_FAX_ECOLE = "BBBBBBBBBB";

    private static final Integer DEFAULT_ETAT_ECOLE = 1;
    private static final Integer UPDATED_ETAT_ECOLE = 2;

    private static final Integer DEFAULT_ENCOURS = 1;
    private static final Integer UPDATED_ENCOURS = 2;

    private static final Integer DEFAULT_RANG = 1;
    private static final Integer UPDATED_RANG = 2;

    @Autowired
    private EcoleRepository ecoleRepository;

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

    private MockMvc restEcoleMockMvc;

    private Ecole ecole;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EcoleResource ecoleResource = new EcoleResource(ecoleRepository);
        this.restEcoleMockMvc = MockMvcBuilders.standaloneSetup(ecoleResource)
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
    public static Ecole createEntity(EntityManager em) {
        Ecole ecole = new Ecole()
            .codeEcole(DEFAULT_CODE_ECOLE)
            .logoEcole(DEFAULT_LOGO_ECOLE)
            .enteteEcole(DEFAULT_ENTETE_ECOLE)
            .basPageEcole(DEFAULT_BAS_PAGE_ECOLE)
            .nineaEcole(DEFAULT_NINEA_ECOLE)
            .adresseEcole(DEFAULT_ADRESSE_ECOLE)
            .telephoneEcole(DEFAULT_TELEPHONE_ECOLE)
            .emailEcole(DEFAULT_EMAIL_ECOLE)
            .sigleEcole(DEFAULT_SIGLE_ECOLE)
            .faxEcole(DEFAULT_FAX_ECOLE)
            .etatEcole(DEFAULT_ETAT_ECOLE)
            .encours(DEFAULT_ENCOURS)
            .rang(DEFAULT_RANG);
        return ecole;
    }

    @Before
    public void initTest() {
        ecole = createEntity(em);
    }

    @Test
    @Transactional
    public void createEcole() throws Exception {
        int databaseSizeBeforeCreate = ecoleRepository.findAll().size();

        // Create the Ecole
        restEcoleMockMvc.perform(post("/api/ecoles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ecole)))
            .andExpect(status().isCreated());

        // Validate the Ecole in the database
        List<Ecole> ecoleList = ecoleRepository.findAll();
        assertThat(ecoleList).hasSize(databaseSizeBeforeCreate + 1);
        Ecole testEcole = ecoleList.get(ecoleList.size() - 1);
        assertThat(testEcole.getCodeEcole()).isEqualTo(DEFAULT_CODE_ECOLE);
        assertThat(testEcole.getLogoEcole()).isEqualTo(DEFAULT_LOGO_ECOLE);
        assertThat(testEcole.getEnteteEcole()).isEqualTo(DEFAULT_ENTETE_ECOLE);
        assertThat(testEcole.getBasPageEcole()).isEqualTo(DEFAULT_BAS_PAGE_ECOLE);
        assertThat(testEcole.getNineaEcole()).isEqualTo(DEFAULT_NINEA_ECOLE);
        assertThat(testEcole.getAdresseEcole()).isEqualTo(DEFAULT_ADRESSE_ECOLE);
        assertThat(testEcole.getTelephoneEcole()).isEqualTo(DEFAULT_TELEPHONE_ECOLE);
        assertThat(testEcole.getEmailEcole()).isEqualTo(DEFAULT_EMAIL_ECOLE);
        assertThat(testEcole.getSigleEcole()).isEqualTo(DEFAULT_SIGLE_ECOLE);
        assertThat(testEcole.getFaxEcole()).isEqualTo(DEFAULT_FAX_ECOLE);
        assertThat(testEcole.getEtatEcole()).isEqualTo(DEFAULT_ETAT_ECOLE);
        assertThat(testEcole.getEncours()).isEqualTo(DEFAULT_ENCOURS);
        assertThat(testEcole.getRang()).isEqualTo(DEFAULT_RANG);
    }

    @Test
    @Transactional
    public void createEcoleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ecoleRepository.findAll().size();

        // Create the Ecole with an existing ID
        ecole.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEcoleMockMvc.perform(post("/api/ecoles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ecole)))
            .andExpect(status().isBadRequest());

        // Validate the Ecole in the database
        List<Ecole> ecoleList = ecoleRepository.findAll();
        assertThat(ecoleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEcoles() throws Exception {
        // Initialize the database
        ecoleRepository.saveAndFlush(ecole);

        // Get all the ecoleList
        restEcoleMockMvc.perform(get("/api/ecoles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ecole.getId().intValue())))
            .andExpect(jsonPath("$.[*].codeEcole").value(hasItem(DEFAULT_CODE_ECOLE.toString())))
            .andExpect(jsonPath("$.[*].logoEcole").value(hasItem(DEFAULT_LOGO_ECOLE.toString())))
            .andExpect(jsonPath("$.[*].enteteEcole").value(hasItem(DEFAULT_ENTETE_ECOLE.toString())))
            .andExpect(jsonPath("$.[*].basPageEcole").value(hasItem(DEFAULT_BAS_PAGE_ECOLE.toString())))
            .andExpect(jsonPath("$.[*].nineaEcole").value(hasItem(DEFAULT_NINEA_ECOLE.toString())))
            .andExpect(jsonPath("$.[*].adresseEcole").value(hasItem(DEFAULT_ADRESSE_ECOLE.toString())))
            .andExpect(jsonPath("$.[*].telephoneEcole").value(hasItem(DEFAULT_TELEPHONE_ECOLE.toString())))
            .andExpect(jsonPath("$.[*].emailEcole").value(hasItem(DEFAULT_EMAIL_ECOLE.toString())))
            .andExpect(jsonPath("$.[*].sigleEcole").value(hasItem(DEFAULT_SIGLE_ECOLE.toString())))
            .andExpect(jsonPath("$.[*].faxEcole").value(hasItem(DEFAULT_FAX_ECOLE.toString())))
            .andExpect(jsonPath("$.[*].etatEcole").value(hasItem(DEFAULT_ETAT_ECOLE)))
            .andExpect(jsonPath("$.[*].encours").value(hasItem(DEFAULT_ENCOURS)))
            .andExpect(jsonPath("$.[*].rang").value(hasItem(DEFAULT_RANG)));
    }
    
    @Test
    @Transactional
    public void getEcole() throws Exception {
        // Initialize the database
        ecoleRepository.saveAndFlush(ecole);

        // Get the ecole
        restEcoleMockMvc.perform(get("/api/ecoles/{id}", ecole.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ecole.getId().intValue()))
            .andExpect(jsonPath("$.codeEcole").value(DEFAULT_CODE_ECOLE.toString()))
            .andExpect(jsonPath("$.logoEcole").value(DEFAULT_LOGO_ECOLE.toString()))
            .andExpect(jsonPath("$.enteteEcole").value(DEFAULT_ENTETE_ECOLE.toString()))
            .andExpect(jsonPath("$.basPageEcole").value(DEFAULT_BAS_PAGE_ECOLE.toString()))
            .andExpect(jsonPath("$.nineaEcole").value(DEFAULT_NINEA_ECOLE.toString()))
            .andExpect(jsonPath("$.adresseEcole").value(DEFAULT_ADRESSE_ECOLE.toString()))
            .andExpect(jsonPath("$.telephoneEcole").value(DEFAULT_TELEPHONE_ECOLE.toString()))
            .andExpect(jsonPath("$.emailEcole").value(DEFAULT_EMAIL_ECOLE.toString()))
            .andExpect(jsonPath("$.sigleEcole").value(DEFAULT_SIGLE_ECOLE.toString()))
            .andExpect(jsonPath("$.faxEcole").value(DEFAULT_FAX_ECOLE.toString()))
            .andExpect(jsonPath("$.etatEcole").value(DEFAULT_ETAT_ECOLE))
            .andExpect(jsonPath("$.encours").value(DEFAULT_ENCOURS))
            .andExpect(jsonPath("$.rang").value(DEFAULT_RANG));
    }

    @Test
    @Transactional
    public void getNonExistingEcole() throws Exception {
        // Get the ecole
        restEcoleMockMvc.perform(get("/api/ecoles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEcole() throws Exception {
        // Initialize the database
        ecoleRepository.saveAndFlush(ecole);

        int databaseSizeBeforeUpdate = ecoleRepository.findAll().size();

        // Update the ecole
        Ecole updatedEcole = ecoleRepository.findById(ecole.getId()).get();
        // Disconnect from session so that the updates on updatedEcole are not directly saved in db
        em.detach(updatedEcole);
        updatedEcole
            .codeEcole(UPDATED_CODE_ECOLE)
            .logoEcole(UPDATED_LOGO_ECOLE)
            .enteteEcole(UPDATED_ENTETE_ECOLE)
            .basPageEcole(UPDATED_BAS_PAGE_ECOLE)
            .nineaEcole(UPDATED_NINEA_ECOLE)
            .adresseEcole(UPDATED_ADRESSE_ECOLE)
            .telephoneEcole(UPDATED_TELEPHONE_ECOLE)
            .emailEcole(UPDATED_EMAIL_ECOLE)
            .sigleEcole(UPDATED_SIGLE_ECOLE)
            .faxEcole(UPDATED_FAX_ECOLE)
            .etatEcole(UPDATED_ETAT_ECOLE)
            .encours(UPDATED_ENCOURS)
            .rang(UPDATED_RANG);

        restEcoleMockMvc.perform(put("/api/ecoles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEcole)))
            .andExpect(status().isOk());

        // Validate the Ecole in the database
        List<Ecole> ecoleList = ecoleRepository.findAll();
        assertThat(ecoleList).hasSize(databaseSizeBeforeUpdate);
        Ecole testEcole = ecoleList.get(ecoleList.size() - 1);
        assertThat(testEcole.getCodeEcole()).isEqualTo(UPDATED_CODE_ECOLE);
        assertThat(testEcole.getLogoEcole()).isEqualTo(UPDATED_LOGO_ECOLE);
        assertThat(testEcole.getEnteteEcole()).isEqualTo(UPDATED_ENTETE_ECOLE);
        assertThat(testEcole.getBasPageEcole()).isEqualTo(UPDATED_BAS_PAGE_ECOLE);
        assertThat(testEcole.getNineaEcole()).isEqualTo(UPDATED_NINEA_ECOLE);
        assertThat(testEcole.getAdresseEcole()).isEqualTo(UPDATED_ADRESSE_ECOLE);
        assertThat(testEcole.getTelephoneEcole()).isEqualTo(UPDATED_TELEPHONE_ECOLE);
        assertThat(testEcole.getEmailEcole()).isEqualTo(UPDATED_EMAIL_ECOLE);
        assertThat(testEcole.getSigleEcole()).isEqualTo(UPDATED_SIGLE_ECOLE);
        assertThat(testEcole.getFaxEcole()).isEqualTo(UPDATED_FAX_ECOLE);
        assertThat(testEcole.getEtatEcole()).isEqualTo(UPDATED_ETAT_ECOLE);
        assertThat(testEcole.getEncours()).isEqualTo(UPDATED_ENCOURS);
        assertThat(testEcole.getRang()).isEqualTo(UPDATED_RANG);
    }

    @Test
    @Transactional
    public void updateNonExistingEcole() throws Exception {
        int databaseSizeBeforeUpdate = ecoleRepository.findAll().size();

        // Create the Ecole

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEcoleMockMvc.perform(put("/api/ecoles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ecole)))
            .andExpect(status().isBadRequest());

        // Validate the Ecole in the database
        List<Ecole> ecoleList = ecoleRepository.findAll();
        assertThat(ecoleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEcole() throws Exception {
        // Initialize the database
        ecoleRepository.saveAndFlush(ecole);

        int databaseSizeBeforeDelete = ecoleRepository.findAll().size();

        // Delete the ecole
        restEcoleMockMvc.perform(delete("/api/ecoles/{id}", ecole.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ecole> ecoleList = ecoleRepository.findAll();
        assertThat(ecoleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ecole.class);
        Ecole ecole1 = new Ecole();
        ecole1.setId(1L);
        Ecole ecole2 = new Ecole();
        ecole2.setId(ecole1.getId());
        assertThat(ecole1).isEqualTo(ecole2);
        ecole2.setId(2L);
        assertThat(ecole1).isNotEqualTo(ecole2);
        ecole1.setId(null);
        assertThat(ecole1).isNotEqualTo(ecole2);
    }
}
