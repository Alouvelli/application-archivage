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
import org.yescola.gestion.domain.Application;
import org.yescola.gestion.repository.ApplicationRepository;
import org.yescola.gestion.repository.EcoleRepository;
import org.yescola.gestion.web.rest.errors.ExceptionTranslator;

import jakarta.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.yescola.gestion.web.rest.TestUtil.createFormattingConversionService;

/**
 * Test class for the ApplicationResource REST controller.
 *
 * @see ApplicationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionEcoleApp.class)
public class ApplicationResourceIT {

    private static final String DEFAULT_NOM_APPLICATION = "AAAAAAAAAA";
    private static final String UPDATED_NOM_APPLICATION = "BBBBBBBBBB";

    private static final String DEFAULT_VERSION_APPLICATION = "AAAAAAAAAA";
    private static final String UPDATED_VERSION_APPLICATION = "BBBBBBBBBB";

    private static final String DEFAULT_LOGO_APPLICATION = "AAAAAAAAAA";
    private static final String UPDATED_LOGO_APPLICATION = "BBBBBBBBBB";

    private static final String DEFAULT_COUT_APPLICATION = "AAAAAAAAAA";
    private static final String UPDATED_COUT_APPLICATION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_VENTE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_VENTE = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_MAINTENANCE = 1;
    private static final Integer UPDATED_MAINTENANCE = 2;

    private static final String DEFAULT_CONTRAT_MAINTENANCE = "AAAAAAAAAA";
    private static final String UPDATED_CONTRAT_MAINTENANCE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_DEBUT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_DEBUT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_FIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_FIN = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_ETAT_APPLICATION = 1;
    private static final Integer UPDATED_ETAT_APPLICATION = 2;

    @Autowired
    private ApplicationRepository applicationRepository;

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

    private MockMvc restApplicationMockMvc;

    private Application application;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ApplicationResource applicationResource = new ApplicationResource(applicationRepository,ecoleRepository);
        this.restApplicationMockMvc = MockMvcBuilders.standaloneSetup(applicationResource)
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
    public static Application createEntity(EntityManager em) {
        Application application = new Application()
            .nomApplication(DEFAULT_NOM_APPLICATION)
            .versionApplication(DEFAULT_VERSION_APPLICATION)
            .logoApplication(DEFAULT_LOGO_APPLICATION)
            .coutApplication(DEFAULT_COUT_APPLICATION)
            .dateVente(DEFAULT_DATE_VENTE)
            .maintenance(DEFAULT_MAINTENANCE)
            .contratMaintenance(DEFAULT_CONTRAT_MAINTENANCE)
            .dateDebut(DEFAULT_DATE_DEBUT)
            .dateFin(DEFAULT_DATE_FIN)
            .etatApplication(DEFAULT_ETAT_APPLICATION);
        return application;
    }

    @Before
    public void initTest() {
        application = createEntity(em);
    }

    @Test
    @Transactional
    public void createApplication() throws Exception {
        int databaseSizeBeforeCreate = applicationRepository.findAll().size();

        // Create the Application
        restApplicationMockMvc.perform(post("/api/applications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(application)))
            .andExpect(status().isCreated());

        // Validate the Application in the database
        List<Application> applicationList = applicationRepository.findAll();
        assertThat(applicationList).hasSize(databaseSizeBeforeCreate + 1);
        Application testApplication = applicationList.get(applicationList.size() - 1);
        assertThat(testApplication.getNomApplication()).isEqualTo(DEFAULT_NOM_APPLICATION);
        assertThat(testApplication.getVersionApplication()).isEqualTo(DEFAULT_VERSION_APPLICATION);
        assertThat(testApplication.getLogoApplication()).isEqualTo(DEFAULT_LOGO_APPLICATION);
        assertThat(testApplication.getCoutApplication()).isEqualTo(DEFAULT_COUT_APPLICATION);
        assertThat(testApplication.getDateVente()).isEqualTo(DEFAULT_DATE_VENTE);
        assertThat(testApplication.getMaintenance()).isEqualTo(DEFAULT_MAINTENANCE);
        assertThat(testApplication.getContratMaintenance()).isEqualTo(DEFAULT_CONTRAT_MAINTENANCE);
        assertThat(testApplication.getDateDebut()).isEqualTo(DEFAULT_DATE_DEBUT);
        assertThat(testApplication.getDateFin()).isEqualTo(DEFAULT_DATE_FIN);
        assertThat(testApplication.getEtatApplication()).isEqualTo(DEFAULT_ETAT_APPLICATION);
    }

    @Test
    @Transactional
    public void createApplicationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = applicationRepository.findAll().size();

        // Create the Application with an existing ID
        application.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restApplicationMockMvc.perform(post("/api/applications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(application)))
            .andExpect(status().isBadRequest());

        // Validate the Application in the database
        List<Application> applicationList = applicationRepository.findAll();
        assertThat(applicationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllApplications() throws Exception {
        // Initialize the database
        applicationRepository.saveAndFlush(application);

        // Get all the applicationList
        restApplicationMockMvc.perform(get("/api/applications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(application.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomApplication").value(hasItem(DEFAULT_NOM_APPLICATION.toString())))
            .andExpect(jsonPath("$.[*].versionApplication").value(hasItem(DEFAULT_VERSION_APPLICATION.toString())))
            .andExpect(jsonPath("$.[*].logoApplication").value(hasItem(DEFAULT_LOGO_APPLICATION.toString())))
            .andExpect(jsonPath("$.[*].coutApplication").value(hasItem(DEFAULT_COUT_APPLICATION.toString())))
            .andExpect(jsonPath("$.[*].dateVente").value(hasItem(DEFAULT_DATE_VENTE.toString())))
            .andExpect(jsonPath("$.[*].maintenance").value(hasItem(DEFAULT_MAINTENANCE)))
            .andExpect(jsonPath("$.[*].contratMaintenance").value(hasItem(DEFAULT_CONTRAT_MAINTENANCE.toString())))
            .andExpect(jsonPath("$.[*].dateDebut").value(hasItem(DEFAULT_DATE_DEBUT.toString())))
            .andExpect(jsonPath("$.[*].dateFin").value(hasItem(DEFAULT_DATE_FIN.toString())))
            .andExpect(jsonPath("$.[*].etatApplication").value(hasItem(DEFAULT_ETAT_APPLICATION)));
    }

    @Test
    @Transactional
    public void getApplication() throws Exception {
        // Initialize the database
        applicationRepository.saveAndFlush(application);

        // Get the application
        restApplicationMockMvc.perform(get("/api/applications/{id}", application.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(application.getId().intValue()))
            .andExpect(jsonPath("$.nomApplication").value(DEFAULT_NOM_APPLICATION.toString()))
            .andExpect(jsonPath("$.versionApplication").value(DEFAULT_VERSION_APPLICATION.toString()))
            .andExpect(jsonPath("$.logoApplication").value(DEFAULT_LOGO_APPLICATION.toString()))
            .andExpect(jsonPath("$.coutApplication").value(DEFAULT_COUT_APPLICATION.toString()))
            .andExpect(jsonPath("$.dateVente").value(DEFAULT_DATE_VENTE.toString()))
            .andExpect(jsonPath("$.maintenance").value(DEFAULT_MAINTENANCE))
            .andExpect(jsonPath("$.contratMaintenance").value(DEFAULT_CONTRAT_MAINTENANCE.toString()))
            .andExpect(jsonPath("$.dateDebut").value(DEFAULT_DATE_DEBUT.toString()))
            .andExpect(jsonPath("$.dateFin").value(DEFAULT_DATE_FIN.toString()))
            .andExpect(jsonPath("$.etatApplication").value(DEFAULT_ETAT_APPLICATION));
    }

    @Test
    @Transactional
    public void getNonExistingApplication() throws Exception {
        // Get the application
        restApplicationMockMvc.perform(get("/api/applications/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateApplication() throws Exception {
        // Initialize the database
        applicationRepository.saveAndFlush(application);

        int databaseSizeBeforeUpdate = applicationRepository.findAll().size();

        // Update the application
        Application updatedApplication = applicationRepository.findById(application.getId())
            .orElseThrow(() -> new IllegalStateException("Application not found in database"));
        // Disconnect from session so that the updates on updatedApplication are not directly saved in db
        em.detach(updatedApplication);
        updatedApplication
            .nomApplication(UPDATED_NOM_APPLICATION)
            .versionApplication(UPDATED_VERSION_APPLICATION)
            .logoApplication(UPDATED_LOGO_APPLICATION)
            .coutApplication(UPDATED_COUT_APPLICATION)
            .dateVente(UPDATED_DATE_VENTE)
            .maintenance(UPDATED_MAINTENANCE)
            .contratMaintenance(UPDATED_CONTRAT_MAINTENANCE)
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN)
            .etatApplication(UPDATED_ETAT_APPLICATION);

        restApplicationMockMvc.perform(put("/api/applications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedApplication)))
            .andExpect(status().isOk());

        // Validate the Application in the database
        List<Application> applicationList = applicationRepository.findAll();
        assertThat(applicationList).hasSize(databaseSizeBeforeUpdate);
        Application testApplication = applicationList.get(applicationList.size() - 1);
        assertThat(testApplication.getNomApplication()).isEqualTo(UPDATED_NOM_APPLICATION);
        assertThat(testApplication.getVersionApplication()).isEqualTo(UPDATED_VERSION_APPLICATION);
        assertThat(testApplication.getLogoApplication()).isEqualTo(UPDATED_LOGO_APPLICATION);
        assertThat(testApplication.getCoutApplication()).isEqualTo(UPDATED_COUT_APPLICATION);
        assertThat(testApplication.getDateVente()).isEqualTo(UPDATED_DATE_VENTE);
        assertThat(testApplication.getMaintenance()).isEqualTo(UPDATED_MAINTENANCE);
        assertThat(testApplication.getContratMaintenance()).isEqualTo(UPDATED_CONTRAT_MAINTENANCE);
        assertThat(testApplication.getDateDebut()).isEqualTo(UPDATED_DATE_DEBUT);
        assertThat(testApplication.getDateFin()).isEqualTo(UPDATED_DATE_FIN);
        assertThat(testApplication.getEtatApplication()).isEqualTo(UPDATED_ETAT_APPLICATION);
    }

    @Test
    @Transactional
    public void updateNonExistingApplication() throws Exception {
        int databaseSizeBeforeUpdate = applicationRepository.findAll().size();

        // Create the Application

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restApplicationMockMvc.perform(put("/api/applications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(application)))
            .andExpect(status().isBadRequest());

        // Validate the Application in the database
        List<Application> applicationList = applicationRepository.findAll();
        assertThat(applicationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteApplication() throws Exception {
        // Initialize the database
        applicationRepository.saveAndFlush(application);

        int databaseSizeBeforeDelete = applicationRepository.findAll().size();

        // Delete the application
        restApplicationMockMvc.perform(delete("/api/applications/{id}", application.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Application> applicationList = applicationRepository.findAll();
        assertThat(applicationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Application.class);
        Application application1 = new Application();
        application1.setId(1L);
        Application application2 = new Application();
        application2.setId(application1.getId());
        assertThat(application1).isEqualTo(application2);
        application2.setId(2L);
        assertThat(application1).isNotEqualTo(application2);
        application1.setId(null);
        assertThat(application1).isNotEqualTo(application2);
    }
}
