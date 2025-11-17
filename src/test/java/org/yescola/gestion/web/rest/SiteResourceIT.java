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
import org.yescola.gestion.domain.Site;
import org.yescola.gestion.repository.SiteRepository;
import org.yescola.gestion.web.rest.errors.ExceptionTranslator;

import jakarta.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.yescola.gestion.web.rest.TestUtil.createFormattingConversionService;

/**
 * Test class for the SiteResource REST controller.
 *
 * @see SiteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionEcoleApp.class)
public class SiteResourceIT {

    private static final String DEFAULT_CODE_SITE = "AAAAAAAAAA";
    private static final String UPDATED_CODE_SITE = "BBBBBBBBBB";

    private static final String DEFAULT_LOGO_SITE = "AAAAAAAAAA";
    private static final String UPDATED_LOGO_SITE = "BBBBBBBBBB";

    private static final String DEFAULT_ENTETE_SITE = "AAAAAAAAAA";
    private static final String UPDATED_ENTETE_SITE = "BBBBBBBBBB";

    private static final String DEFAULT_BAS_PAGE_SITE = "AAAAAAAAAA";
    private static final String UPDATED_BAS_PAGE_SITE = "BBBBBBBBBB";

    private static final String DEFAULT_NINEA_SITE = "AAAAAAAAAA";
    private static final String UPDATED_NINEA_SITE = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE_SITE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE_SITE = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL_SITE = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL_SITE = "BBBBBBBBBB";

    private static final String DEFAULT_SIGLE_SITE = "AAAAAAAAAA";
    private static final String UPDATED_SIGLE_SITE = "BBBBBBBBBB";

    private static final String DEFAULT_FAX_ECOLE = "AAAAAAAAAA";
    private static final String UPDATED_FAX_ECOLE = "BBBBBBBBBB";

    private static final Integer DEFAULT_ETAT_SITE = 1;
    private static final Integer UPDATED_ETAT_SITE = 2;

    private static final Integer DEFAULT_ENCOURS = 1;
    private static final Integer UPDATED_ENCOURS = 2;

    private static final Integer DEFAULT_RANG = 1;
    private static final Integer UPDATED_RANG = 2;

    @Autowired
    private SiteRepository siteRepository;

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

    private MockMvc restSiteMockMvc;

    private Site site;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SiteResource siteResource = new SiteResource(siteRepository);
        this.restSiteMockMvc = MockMvcBuilders.standaloneSetup(siteResource)
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
    public static Site createEntity(EntityManager em) {
        Site site = new Site()
            .codeSite(DEFAULT_CODE_SITE)
            .logoSite(DEFAULT_LOGO_SITE)
            .enteteSite(DEFAULT_ENTETE_SITE)
            .basPageSite(DEFAULT_BAS_PAGE_SITE)
            .nineaSite(DEFAULT_NINEA_SITE)
            .adresseSite(DEFAULT_ADRESSE_SITE)
            .telephone(DEFAULT_TELEPHONE)
            .emailSite(DEFAULT_EMAIL_SITE)
            .sigleSite(DEFAULT_SIGLE_SITE)
            .faxEcole(DEFAULT_FAX_ECOLE)
            .etatSite(DEFAULT_ETAT_SITE)
            .encours(DEFAULT_ENCOURS)
            .rang(DEFAULT_RANG);
        return site;
    }

    @Before
    public void initTest() {
        site = createEntity(em);
    }

    @Test
    @Transactional
    public void createSite() throws Exception {
        int databaseSizeBeforeCreate = siteRepository.findAll().size();

        // Create the Site
        restSiteMockMvc.perform(post("/api/sites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(site)))
            .andExpect(status().isCreated());

        // Validate the Site in the database
        List<Site> siteList = siteRepository.findAll();
        assertThat(siteList).hasSize(databaseSizeBeforeCreate + 1);
        Site testSite = siteList.get(siteList.size() - 1);
        assertThat(testSite.getCodeSite()).isEqualTo(DEFAULT_CODE_SITE);
        assertThat(testSite.getLogoSite()).isEqualTo(DEFAULT_LOGO_SITE);
        assertThat(testSite.getEnteteSite()).isEqualTo(DEFAULT_ENTETE_SITE);
        assertThat(testSite.getBasPageSite()).isEqualTo(DEFAULT_BAS_PAGE_SITE);
        assertThat(testSite.getNineaSite()).isEqualTo(DEFAULT_NINEA_SITE);
        assertThat(testSite.getAdresseSite()).isEqualTo(DEFAULT_ADRESSE_SITE);
        assertThat(testSite.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testSite.getEmailSite()).isEqualTo(DEFAULT_EMAIL_SITE);
        assertThat(testSite.getSigleSite()).isEqualTo(DEFAULT_SIGLE_SITE);
        assertThat(testSite.getFaxEcole()).isEqualTo(DEFAULT_FAX_ECOLE);
        assertThat(testSite.getEtatSite()).isEqualTo(DEFAULT_ETAT_SITE);
        assertThat(testSite.getEncours()).isEqualTo(DEFAULT_ENCOURS);
        assertThat(testSite.getRang()).isEqualTo(DEFAULT_RANG);
    }

    @Test
    @Transactional
    public void createSiteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = siteRepository.findAll().size();

        // Create the Site with an existing ID
        site.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSiteMockMvc.perform(post("/api/sites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(site)))
            .andExpect(status().isBadRequest());

        // Validate the Site in the database
        List<Site> siteList = siteRepository.findAll();
        assertThat(siteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSites() throws Exception {
        // Initialize the database
        siteRepository.saveAndFlush(site);

        // Get all the siteList
        restSiteMockMvc.perform(get("/api/sites?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(site.getId().intValue())))
            .andExpect(jsonPath("$.[*].codeSite").value(hasItem(DEFAULT_CODE_SITE.toString())))
            .andExpect(jsonPath("$.[*].logoSite").value(hasItem(DEFAULT_LOGO_SITE.toString())))
            .andExpect(jsonPath("$.[*].enteteSite").value(hasItem(DEFAULT_ENTETE_SITE.toString())))
            .andExpect(jsonPath("$.[*].basPageSite").value(hasItem(DEFAULT_BAS_PAGE_SITE.toString())))
            .andExpect(jsonPath("$.[*].nineaSite").value(hasItem(DEFAULT_NINEA_SITE.toString())))
            .andExpect(jsonPath("$.[*].adresseSite").value(hasItem(DEFAULT_ADRESSE_SITE.toString())))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE.toString())))
            .andExpect(jsonPath("$.[*].emailSite").value(hasItem(DEFAULT_EMAIL_SITE.toString())))
            .andExpect(jsonPath("$.[*].sigleSite").value(hasItem(DEFAULT_SIGLE_SITE.toString())))
            .andExpect(jsonPath("$.[*].faxEcole").value(hasItem(DEFAULT_FAX_ECOLE.toString())))
            .andExpect(jsonPath("$.[*].etatSite").value(hasItem(DEFAULT_ETAT_SITE)))
            .andExpect(jsonPath("$.[*].encours").value(hasItem(DEFAULT_ENCOURS)))
            .andExpect(jsonPath("$.[*].rang").value(hasItem(DEFAULT_RANG)));
    }

    @Test
    @Transactional
    public void getSite() throws Exception {
        // Initialize the database
        siteRepository.saveAndFlush(site);

        // Get the site
        restSiteMockMvc.perform(get("/api/sites/{id}", site.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(site.getId().intValue()))
            .andExpect(jsonPath("$.codeSite").value(DEFAULT_CODE_SITE.toString()))
            .andExpect(jsonPath("$.logoSite").value(DEFAULT_LOGO_SITE.toString()))
            .andExpect(jsonPath("$.enteteSite").value(DEFAULT_ENTETE_SITE.toString()))
            .andExpect(jsonPath("$.basPageSite").value(DEFAULT_BAS_PAGE_SITE.toString()))
            .andExpect(jsonPath("$.nineaSite").value(DEFAULT_NINEA_SITE.toString()))
            .andExpect(jsonPath("$.adresseSite").value(DEFAULT_ADRESSE_SITE.toString()))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE.toString()))
            .andExpect(jsonPath("$.emailSite").value(DEFAULT_EMAIL_SITE.toString()))
            .andExpect(jsonPath("$.sigleSite").value(DEFAULT_SIGLE_SITE.toString()))
            .andExpect(jsonPath("$.faxEcole").value(DEFAULT_FAX_ECOLE.toString()))
            .andExpect(jsonPath("$.etatSite").value(DEFAULT_ETAT_SITE))
            .andExpect(jsonPath("$.encours").value(DEFAULT_ENCOURS))
            .andExpect(jsonPath("$.rang").value(DEFAULT_RANG));
    }

    @Test
    @Transactional
    public void getNonExistingSite() throws Exception {
        // Get the site
        restSiteMockMvc.perform(get("/api/sites/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSite() throws Exception {
        // Initialize the database
        siteRepository.saveAndFlush(site);

        int databaseSizeBeforeUpdate = siteRepository.findAll().size();

        // Update the site
        Site updatedSite = siteRepository.findById(site.getId()).orElseThrow(() -> new IllegalStateException("Site not found in database"));;
        // Disconnect from session so that the updates on updatedSite are not directly saved in db
        em.detach(updatedSite);
        updatedSite
            .codeSite(UPDATED_CODE_SITE)
            .logoSite(UPDATED_LOGO_SITE)
            .enteteSite(UPDATED_ENTETE_SITE)
            .basPageSite(UPDATED_BAS_PAGE_SITE)
            .nineaSite(UPDATED_NINEA_SITE)
            .adresseSite(UPDATED_ADRESSE_SITE)
            .telephone(UPDATED_TELEPHONE)
            .emailSite(UPDATED_EMAIL_SITE)
            .sigleSite(UPDATED_SIGLE_SITE)
            .faxEcole(UPDATED_FAX_ECOLE)
            .etatSite(UPDATED_ETAT_SITE)
            .encours(UPDATED_ENCOURS)
            .rang(UPDATED_RANG);

        restSiteMockMvc.perform(put("/api/sites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSite)))
            .andExpect(status().isOk());

        // Validate the Site in the database
        List<Site> siteList = siteRepository.findAll();
        assertThat(siteList).hasSize(databaseSizeBeforeUpdate);
        Site testSite = siteList.get(siteList.size() - 1);
        assertThat(testSite.getCodeSite()).isEqualTo(UPDATED_CODE_SITE);
        assertThat(testSite.getLogoSite()).isEqualTo(UPDATED_LOGO_SITE);
        assertThat(testSite.getEnteteSite()).isEqualTo(UPDATED_ENTETE_SITE);
        assertThat(testSite.getBasPageSite()).isEqualTo(UPDATED_BAS_PAGE_SITE);
        assertThat(testSite.getNineaSite()).isEqualTo(UPDATED_NINEA_SITE);
        assertThat(testSite.getAdresseSite()).isEqualTo(UPDATED_ADRESSE_SITE);
        assertThat(testSite.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testSite.getEmailSite()).isEqualTo(UPDATED_EMAIL_SITE);
        assertThat(testSite.getSigleSite()).isEqualTo(UPDATED_SIGLE_SITE);
        assertThat(testSite.getFaxEcole()).isEqualTo(UPDATED_FAX_ECOLE);
        assertThat(testSite.getEtatSite()).isEqualTo(UPDATED_ETAT_SITE);
        assertThat(testSite.getEncours()).isEqualTo(UPDATED_ENCOURS);
        assertThat(testSite.getRang()).isEqualTo(UPDATED_RANG);
    }

    @Test
    @Transactional
    public void updateNonExistingSite() throws Exception {
        int databaseSizeBeforeUpdate = siteRepository.findAll().size();

        // Create the Site

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSiteMockMvc.perform(put("/api/sites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(site)))
            .andExpect(status().isBadRequest());

        // Validate the Site in the database
        List<Site> siteList = siteRepository.findAll();
        assertThat(siteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSite() throws Exception {
        // Initialize the database
        siteRepository.saveAndFlush(site);

        int databaseSizeBeforeDelete = siteRepository.findAll().size();

        // Delete the site
        restSiteMockMvc.perform(delete("/api/sites/{id}", site.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Site> siteList = siteRepository.findAll();
        assertThat(siteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Site.class);
        Site site1 = new Site();
        site1.setId(1L);
        Site site2 = new Site();
        site2.setId(site1.getId());
        assertThat(site1).isEqualTo(site2);
        site2.setId(2L);
        assertThat(site1).isNotEqualTo(site2);
        site1.setId(null);
        assertThat(site1).isNotEqualTo(site2);
    }
}
