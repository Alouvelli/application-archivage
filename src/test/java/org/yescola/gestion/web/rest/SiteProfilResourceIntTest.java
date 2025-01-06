package org.yescola.gestion.web.rest;

import org.yescola.gestion.GestionEcoleApp;

import org.yescola.gestion.domain.SiteProfil;
import org.yescola.gestion.repository.SiteProfilRepository;
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
 * Test class for the SiteProfilResource REST controller.
 *
 * @see SiteProfilResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionEcoleApp.class)
public class SiteProfilResourceIntTest {

    private static final Boolean DEFAULT_ENCOURS = false;
    private static final Boolean UPDATED_ENCOURS = true;

    @Autowired
    private SiteProfilRepository siteProfilRepository;

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

    private MockMvc restSiteProfilMockMvc;

    private SiteProfil siteProfil;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SiteProfilResource siteProfilResource = new SiteProfilResource(siteProfilRepository);
        this.restSiteProfilMockMvc = MockMvcBuilders.standaloneSetup(siteProfilResource)
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
    public static SiteProfil createEntity(EntityManager em) {
        SiteProfil siteProfil = new SiteProfil()
            .encours(DEFAULT_ENCOURS);
        return siteProfil;
    }

    @Before
    public void initTest() {
        siteProfil = createEntity(em);
    }

    @Test
    @Transactional
    public void createSiteProfil() throws Exception {
        int databaseSizeBeforeCreate = siteProfilRepository.findAll().size();

        // Create the SiteProfil
        restSiteProfilMockMvc.perform(post("/api/site-profils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(siteProfil)))
            .andExpect(status().isCreated());

        // Validate the SiteProfil in the database
        List<SiteProfil> siteProfilList = siteProfilRepository.findAll();
        assertThat(siteProfilList).hasSize(databaseSizeBeforeCreate + 1);
        SiteProfil testSiteProfil = siteProfilList.get(siteProfilList.size() - 1);
        assertThat(testSiteProfil.isEncours()).isEqualTo(DEFAULT_ENCOURS);
    }

    @Test
    @Transactional
    public void createSiteProfilWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = siteProfilRepository.findAll().size();

        // Create the SiteProfil with an existing ID
        siteProfil.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSiteProfilMockMvc.perform(post("/api/site-profils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(siteProfil)))
            .andExpect(status().isBadRequest());

        // Validate the SiteProfil in the database
        List<SiteProfil> siteProfilList = siteProfilRepository.findAll();
        assertThat(siteProfilList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSiteProfils() throws Exception {
        // Initialize the database
        siteProfilRepository.saveAndFlush(siteProfil);

        // Get all the siteProfilList
        restSiteProfilMockMvc.perform(get("/api/site-profils?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(siteProfil.getId().intValue())))
            .andExpect(jsonPath("$.[*].encours").value(hasItem(DEFAULT_ENCOURS.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getSiteProfil() throws Exception {
        // Initialize the database
        siteProfilRepository.saveAndFlush(siteProfil);

        // Get the siteProfil
        restSiteProfilMockMvc.perform(get("/api/site-profils/{id}", siteProfil.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(siteProfil.getId().intValue()))
            .andExpect(jsonPath("$.encours").value(DEFAULT_ENCOURS.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSiteProfil() throws Exception {
        // Get the siteProfil
        restSiteProfilMockMvc.perform(get("/api/site-profils/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSiteProfil() throws Exception {
        // Initialize the database
        siteProfilRepository.saveAndFlush(siteProfil);

        int databaseSizeBeforeUpdate = siteProfilRepository.findAll().size();

        // Update the siteProfil
        SiteProfil updatedSiteProfil = siteProfilRepository.findById(siteProfil.getId()).get();
        // Disconnect from session so that the updates on updatedSiteProfil are not directly saved in db
        em.detach(updatedSiteProfil);
        updatedSiteProfil
            .encours(UPDATED_ENCOURS);

        restSiteProfilMockMvc.perform(put("/api/site-profils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSiteProfil)))
            .andExpect(status().isOk());

        // Validate the SiteProfil in the database
        List<SiteProfil> siteProfilList = siteProfilRepository.findAll();
        assertThat(siteProfilList).hasSize(databaseSizeBeforeUpdate);
        SiteProfil testSiteProfil = siteProfilList.get(siteProfilList.size() - 1);
        assertThat(testSiteProfil.isEncours()).isEqualTo(UPDATED_ENCOURS);
    }

    @Test
    @Transactional
    public void updateNonExistingSiteProfil() throws Exception {
        int databaseSizeBeforeUpdate = siteProfilRepository.findAll().size();

        // Create the SiteProfil

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSiteProfilMockMvc.perform(put("/api/site-profils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(siteProfil)))
            .andExpect(status().isBadRequest());

        // Validate the SiteProfil in the database
        List<SiteProfil> siteProfilList = siteProfilRepository.findAll();
        assertThat(siteProfilList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSiteProfil() throws Exception {
        // Initialize the database
        siteProfilRepository.saveAndFlush(siteProfil);

        int databaseSizeBeforeDelete = siteProfilRepository.findAll().size();

        // Delete the siteProfil
        restSiteProfilMockMvc.perform(delete("/api/site-profils/{id}", siteProfil.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SiteProfil> siteProfilList = siteProfilRepository.findAll();
        assertThat(siteProfilList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SiteProfil.class);
        SiteProfil siteProfil1 = new SiteProfil();
        siteProfil1.setId(1L);
        SiteProfil siteProfil2 = new SiteProfil();
        siteProfil2.setId(siteProfil1.getId());
        assertThat(siteProfil1).isEqualTo(siteProfil2);
        siteProfil2.setId(2L);
        assertThat(siteProfil1).isNotEqualTo(siteProfil2);
        siteProfil1.setId(null);
        assertThat(siteProfil1).isNotEqualTo(siteProfil2);
    }
}
