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
import java.util.Base64;
import org.springframework.validation.Validator;
import org.yescola.gestion.GestionEcoleApp;
import org.yescola.gestion.GestionEcoleApp;
import org.yescola.gestion.domain.Documentexcel;
import org.yescola.gestion.repository.DocumentexcelRepository;
import org.yescola.gestion.web.rest.errors.ExceptionTranslator;

import jakarta.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.yescola.gestion.web.rest.TestUtil.createFormattingConversionService;

/**
 * Test class for the DocumentexcelResource REST controller.
 *
 * @see DocumentexcelResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionEcoleApp.class)
public class DocumentexcelResourceIT {

    private static final byte[] DEFAULT_EXCEL = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_EXCEL = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_EXCEL_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_EXCEL_CONTENT_TYPE = "image/png";

    @Autowired
    private DocumentexcelRepository documentexcelRepository;

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

    private MockMvc restDocumentexcelMockMvc;

    private Documentexcel documentexcel;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DocumentexcelResource documentexcelResource = new DocumentexcelResource(documentexcelRepository);
        this.restDocumentexcelMockMvc = MockMvcBuilders.standaloneSetup(documentexcelResource)
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
    public static Documentexcel createEntity(EntityManager em) {
        Documentexcel documentexcel = new Documentexcel()
            .excel(DEFAULT_EXCEL)
            .excelContentType(DEFAULT_EXCEL_CONTENT_TYPE);
        return documentexcel;
    }

    @Before
    public void initTest() {
        documentexcel = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocumentexcel() throws Exception {
        int databaseSizeBeforeCreate = documentexcelRepository.findAll().size();

        // Create the Documentexcel
        restDocumentexcelMockMvc.perform(post("/api/documentexcels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentexcel)))
            .andExpect(status().isCreated());

        // Validate the Documentexcel in the database
        List<Documentexcel> documentexcelList = documentexcelRepository.findAll();
        assertThat(documentexcelList).hasSize(databaseSizeBeforeCreate + 1);
        Documentexcel testDocumentexcel = documentexcelList.get(documentexcelList.size() - 1);
        assertThat(testDocumentexcel.getExcel()).isEqualTo(DEFAULT_EXCEL);
        assertThat(testDocumentexcel.getExcelContentType()).isEqualTo(DEFAULT_EXCEL_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createDocumentexcelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = documentexcelRepository.findAll().size();

        // Create the Documentexcel with an existing ID
        documentexcel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocumentexcelMockMvc.perform(post("/api/documentexcels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentexcel)))
            .andExpect(status().isBadRequest());

        // Validate the Documentexcel in the database
        List<Documentexcel> documentexcelList = documentexcelRepository.findAll();
        assertThat(documentexcelList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDocumentexcels() throws Exception {
        // Initialize the database
        documentexcelRepository.saveAndFlush(documentexcel);

        // Get all the documentexcelList
        restDocumentexcelMockMvc.perform(get("/api/documentexcels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentexcel.getId().intValue())))
            .andExpect(jsonPath("$.[*].excelContentType").value(hasItem(DEFAULT_EXCEL_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].excel").value(hasItem(Base64.getEncoder().encodeToString(DEFAULT_EXCEL))));
    }

    @Test
    @Transactional
    public void getDocumentexcel() throws Exception {
        // Initialize the database
        documentexcelRepository.saveAndFlush(documentexcel);

        // Get the documentexcel
        restDocumentexcelMockMvc.perform(get("/api/documentexcels/{id}", documentexcel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(documentexcel.getId().intValue()))
            .andExpect(jsonPath("$.excelContentType").value(DEFAULT_EXCEL_CONTENT_TYPE))
            .andExpect(jsonPath("$.excel").value(Base64.getEncoder().encodeToString(DEFAULT_EXCEL)));
    }

    @Test
    @Transactional
    public void getNonExistingDocumentexcel() throws Exception {
        // Get the documentexcel
        restDocumentexcelMockMvc.perform(get("/api/documentexcels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocumentexcel() throws Exception {
        // Initialize the database
        documentexcelRepository.saveAndFlush(documentexcel);

        int databaseSizeBeforeUpdate = documentexcelRepository.findAll().size();

        // Update the documentexcel
        Documentexcel updatedDocumentexcel = documentexcelRepository.findById(documentexcel.getId())
            .orElseThrow(() -> new IllegalStateException("Document Excel not found in database"));
        // Disconnect from session so that the updates on updatedDocumentexcel are not directly saved in db
        em.detach(updatedDocumentexcel);
        updatedDocumentexcel
            .excel(UPDATED_EXCEL)
            .excelContentType(UPDATED_EXCEL_CONTENT_TYPE);

        restDocumentexcelMockMvc.perform(put("/api/documentexcels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDocumentexcel)))
            .andExpect(status().isOk());

        // Validate the Documentexcel in the database
        List<Documentexcel> documentexcelList = documentexcelRepository.findAll();
        assertThat(documentexcelList).hasSize(databaseSizeBeforeUpdate);
        Documentexcel testDocumentexcel = documentexcelList.get(documentexcelList.size() - 1);
        assertThat(testDocumentexcel.getExcel()).isEqualTo(UPDATED_EXCEL);
        assertThat(testDocumentexcel.getExcelContentType()).isEqualTo(UPDATED_EXCEL_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingDocumentexcel() throws Exception {
        int databaseSizeBeforeUpdate = documentexcelRepository.findAll().size();

        // Create the Documentexcel

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDocumentexcelMockMvc.perform(put("/api/documentexcels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentexcel)))
            .andExpect(status().isBadRequest());

        // Validate the Documentexcel in the database
        List<Documentexcel> documentexcelList = documentexcelRepository.findAll();
        assertThat(documentexcelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDocumentexcel() throws Exception {
        // Initialize the database
        documentexcelRepository.saveAndFlush(documentexcel);

        int databaseSizeBeforeDelete = documentexcelRepository.findAll().size();

        // Delete the documentexcel
        restDocumentexcelMockMvc.perform(delete("/api/documentexcels/{id}", documentexcel.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Documentexcel> documentexcelList = documentexcelRepository.findAll();
        assertThat(documentexcelList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Documentexcel.class);
        Documentexcel documentexcel1 = new Documentexcel();
        documentexcel1.setId(1L);
        Documentexcel documentexcel2 = new Documentexcel();
        documentexcel2.setId(documentexcel1.getId());
        assertThat(documentexcel1).isEqualTo(documentexcel2);
        documentexcel2.setId(2L);
        assertThat(documentexcel1).isNotEqualTo(documentexcel2);
        documentexcel1.setId(null);
        assertThat(documentexcel1).isNotEqualTo(documentexcel2);
    }
}
