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
import org.yescola.gestion.domain.Documentclasse;
import org.yescola.gestion.repository.DocumentclasseRepository;
import org.yescola.gestion.web.rest.errors.ExceptionTranslator;

import jakarta.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.yescola.gestion.web.rest.TestUtil.createFormattingConversionService;

/**
 * Test class for the DocumentclasseResource REST controller.
 *
 * @see DocumentclasseResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionEcoleApp.class)
public class DocumentclasseResourceIT {

    private static final byte[] DEFAULT_DOCUMENT_1 = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_DOCUMENT_1 = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_DOCUMENT_1_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_DOCUMENT_1_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_REF = "AAAAAAAAAA";
    private static final String UPDATED_REF = "BBBBBBBBBB";

    private static final String DEFAULT_NOMDOCUMENT = "AAAAAAAAAA";
    private static final String UPDATED_NOMDOCUMENT = "BBBBBBBBBB";

    @Autowired
    private DocumentclasseRepository documentclasseRepository;

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

    private MockMvc restDocumentclasseMockMvc;

    private Documentclasse documentclasse;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DocumentclasseResource documentclasseResource = new DocumentclasseResource(documentclasseRepository);
        this.restDocumentclasseMockMvc = MockMvcBuilders.standaloneSetup(documentclasseResource)
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
    public static Documentclasse createEntity(EntityManager em) {
        Documentclasse documentclasse = new Documentclasse()
            .document1(DEFAULT_DOCUMENT_1)
            .document1ContentType(DEFAULT_DOCUMENT_1_CONTENT_TYPE)
            .ref(DEFAULT_REF)
            .nomdocument(DEFAULT_NOMDOCUMENT);
        return documentclasse;
    }

    @Before
    public void initTest() {
        documentclasse = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocumentclasse() throws Exception {
        int databaseSizeBeforeCreate = documentclasseRepository.findAll().size();

        // Create the Documentclasse
        restDocumentclasseMockMvc.perform(post("/api/documentclasses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentclasse)))
            .andExpect(status().isCreated());

        // Validate the Documentclasse in the database
        List<Documentclasse> documentclasseList = documentclasseRepository.findAll();
        assertThat(documentclasseList).hasSize(databaseSizeBeforeCreate + 1);
        Documentclasse testDocumentclasse = documentclasseList.get(documentclasseList.size() - 1);
        assertThat(testDocumentclasse.getDocument1()).isEqualTo(DEFAULT_DOCUMENT_1);
        assertThat(testDocumentclasse.getDocument1ContentType()).isEqualTo(DEFAULT_DOCUMENT_1_CONTENT_TYPE);
        assertThat(testDocumentclasse.getRef()).isEqualTo(DEFAULT_REF);
        assertThat(testDocumentclasse.getNomdocument()).isEqualTo(DEFAULT_NOMDOCUMENT);
    }

    @Test
    @Transactional
    public void createDocumentclasseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = documentclasseRepository.findAll().size();

        // Create the Documentclasse with an existing ID
        documentclasse.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocumentclasseMockMvc.perform(post("/api/documentclasses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentclasse)))
            .andExpect(status().isBadRequest());

        // Validate the Documentclasse in the database
        List<Documentclasse> documentclasseList = documentclasseRepository.findAll();
        assertThat(documentclasseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDocumentclasses() throws Exception {
        // Initialize the database
        documentclasseRepository.saveAndFlush(documentclasse);

        // Get all the documentclasseList
        restDocumentclasseMockMvc.perform(get("/api/documentclasses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentclasse.getId().intValue())))
            .andExpect(jsonPath("$.[*].document1ContentType").value(hasItem(DEFAULT_DOCUMENT_1_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].document1").value(hasItem(Base64.getEncoder().encodeToString(DEFAULT_DOCUMENT_1))))
            .andExpect(jsonPath("$.[*].ref").value(hasItem(DEFAULT_REF.toString())))
            .andExpect(jsonPath("$.[*].nomdocument").value(hasItem(DEFAULT_NOMDOCUMENT.toString())));
    }

    @Test
    @Transactional
    public void getDocumentclasse() throws Exception {
        // Initialize the database
        documentclasseRepository.saveAndFlush(documentclasse);

        // Get the documentclasse
        restDocumentclasseMockMvc.perform(get("/api/documentclasses/{id}", documentclasse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(documentclasse.getId().intValue()))
            .andExpect(jsonPath("$.document1ContentType").value(DEFAULT_DOCUMENT_1_CONTENT_TYPE))
            .andExpect(jsonPath("$.document1").value(Base64.getEncoder().encodeToString(DEFAULT_DOCUMENT_1)))
            .andExpect(jsonPath("$.ref").value(DEFAULT_REF.toString()))
            .andExpect(jsonPath("$.nomdocument").value(DEFAULT_NOMDOCUMENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDocumentclasse() throws Exception {
        // Get the documentclasse
        restDocumentclasseMockMvc.perform(get("/api/documentclasses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocumentclasse() throws Exception {
        // Initialize the database
        documentclasseRepository.saveAndFlush(documentclasse);

        int databaseSizeBeforeUpdate = documentclasseRepository.findAll().size();

        // Update the documentclasse
        Documentclasse updatedDocumentclasse = documentclasseRepository.findById(documentclasse.getId())
            .orElseThrow(() -> new IllegalStateException("Document Classe not found in database"));
        // Disconnect from session so that the updates on updatedDocumentclasse are not directly saved in db
        em.detach(updatedDocumentclasse);
        updatedDocumentclasse
            .document1(UPDATED_DOCUMENT_1)
            .document1ContentType(UPDATED_DOCUMENT_1_CONTENT_TYPE)
            .ref(UPDATED_REF)
            .nomdocument(UPDATED_NOMDOCUMENT);

        restDocumentclasseMockMvc.perform(put("/api/documentclasses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDocumentclasse)))
            .andExpect(status().isOk());

        // Validate the Documentclasse in the database
        List<Documentclasse> documentclasseList = documentclasseRepository.findAll();
        assertThat(documentclasseList).hasSize(databaseSizeBeforeUpdate);
        Documentclasse testDocumentclasse = documentclasseList.get(documentclasseList.size() - 1);
        assertThat(testDocumentclasse.getDocument1()).isEqualTo(UPDATED_DOCUMENT_1);
        assertThat(testDocumentclasse.getDocument1ContentType()).isEqualTo(UPDATED_DOCUMENT_1_CONTENT_TYPE);
        assertThat(testDocumentclasse.getRef()).isEqualTo(UPDATED_REF);
        assertThat(testDocumentclasse.getNomdocument()).isEqualTo(UPDATED_NOMDOCUMENT);
    }

    @Test
    @Transactional
    public void updateNonExistingDocumentclasse() throws Exception {
        int databaseSizeBeforeUpdate = documentclasseRepository.findAll().size();

        // Create the Documentclasse

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDocumentclasseMockMvc.perform(put("/api/documentclasses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentclasse)))
            .andExpect(status().isBadRequest());

        // Validate the Documentclasse in the database
        List<Documentclasse> documentclasseList = documentclasseRepository.findAll();
        assertThat(documentclasseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDocumentclasse() throws Exception {
        // Initialize the database
        documentclasseRepository.saveAndFlush(documentclasse);

        int databaseSizeBeforeDelete = documentclasseRepository.findAll().size();

        // Delete the documentclasse
        restDocumentclasseMockMvc.perform(delete("/api/documentclasses/{id}", documentclasse.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Documentclasse> documentclasseList = documentclasseRepository.findAll();
        assertThat(documentclasseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Documentclasse.class);
        Documentclasse documentclasse1 = new Documentclasse();
        documentclasse1.setId(1L);
        Documentclasse documentclasse2 = new Documentclasse();
        documentclasse2.setId(documentclasse1.getId());
        assertThat(documentclasse1).isEqualTo(documentclasse2);
        documentclasse2.setId(2L);
        assertThat(documentclasse1).isNotEqualTo(documentclasse2);
        documentclasse1.setId(null);
        assertThat(documentclasse1).isNotEqualTo(documentclasse2);
    }
}
