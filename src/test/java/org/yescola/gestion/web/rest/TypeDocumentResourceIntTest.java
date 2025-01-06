package org.yescola.gestion.web.rest;

import org.yescola.gestion.GestionEcoleApp;

import org.yescola.gestion.domain.TypeDocument;
import org.yescola.gestion.repository.TypeDocumentRepository;
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
 * Test class for the TypeDocumentResource REST controller.
 *
 * @see TypeDocumentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionEcoleApp.class)
public class TypeDocumentResourceIntTest {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ETAT = false;
    private static final Boolean UPDATED_ETAT = true;

    @Autowired
    private TypeDocumentRepository typeDocumentRepository;

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

    private MockMvc restTypeDocumentMockMvc;

    private TypeDocument typeDocument;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TypeDocumentResource typeDocumentResource = new TypeDocumentResource(typeDocumentRepository);
        this.restTypeDocumentMockMvc = MockMvcBuilders.standaloneSetup(typeDocumentResource)
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
    public static TypeDocument createEntity(EntityManager em) {
        TypeDocument typeDocument = new TypeDocument()
            .libelle(DEFAULT_LIBELLE)
            .description(DEFAULT_DESCRIPTION)
            .etat(DEFAULT_ETAT);
        return typeDocument;
    }

    @Before
    public void initTest() {
        typeDocument = createEntity(em);
    }

    @Test
    @Transactional
    public void createTypeDocument() throws Exception {
        int databaseSizeBeforeCreate = typeDocumentRepository.findAll().size();

        // Create the TypeDocument
        restTypeDocumentMockMvc.perform(post("/api/type-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeDocument)))
            .andExpect(status().isCreated());

        // Validate the TypeDocument in the database
        List<TypeDocument> typeDocumentList = typeDocumentRepository.findAll();
        assertThat(typeDocumentList).hasSize(databaseSizeBeforeCreate + 1);
        TypeDocument testTypeDocument = typeDocumentList.get(typeDocumentList.size() - 1);
        assertThat(testTypeDocument.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testTypeDocument.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testTypeDocument.isEtat()).isEqualTo(DEFAULT_ETAT);
    }

    @Test
    @Transactional
    public void createTypeDocumentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = typeDocumentRepository.findAll().size();

        // Create the TypeDocument with an existing ID
        typeDocument.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTypeDocumentMockMvc.perform(post("/api/type-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeDocument)))
            .andExpect(status().isBadRequest());

        // Validate the TypeDocument in the database
        List<TypeDocument> typeDocumentList = typeDocumentRepository.findAll();
        assertThat(typeDocumentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTypeDocuments() throws Exception {
        // Initialize the database
        typeDocumentRepository.saveAndFlush(typeDocument);

        // Get all the typeDocumentList
        restTypeDocumentMockMvc.perform(get("/api/type-documents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeDocument.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getTypeDocument() throws Exception {
        // Initialize the database
        typeDocumentRepository.saveAndFlush(typeDocument);

        // Get the typeDocument
        restTypeDocumentMockMvc.perform(get("/api/type-documents/{id}", typeDocument.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(typeDocument.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.etat").value(DEFAULT_ETAT.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTypeDocument() throws Exception {
        // Get the typeDocument
        restTypeDocumentMockMvc.perform(get("/api/type-documents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTypeDocument() throws Exception {
        // Initialize the database
        typeDocumentRepository.saveAndFlush(typeDocument);

        int databaseSizeBeforeUpdate = typeDocumentRepository.findAll().size();

        // Update the typeDocument
        TypeDocument updatedTypeDocument = typeDocumentRepository.findById(typeDocument.getId()).get();
        // Disconnect from session so that the updates on updatedTypeDocument are not directly saved in db
        em.detach(updatedTypeDocument);
        updatedTypeDocument
            .libelle(UPDATED_LIBELLE)
            .description(UPDATED_DESCRIPTION)
            .etat(UPDATED_ETAT);

        restTypeDocumentMockMvc.perform(put("/api/type-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTypeDocument)))
            .andExpect(status().isOk());

        // Validate the TypeDocument in the database
        List<TypeDocument> typeDocumentList = typeDocumentRepository.findAll();
        assertThat(typeDocumentList).hasSize(databaseSizeBeforeUpdate);
        TypeDocument testTypeDocument = typeDocumentList.get(typeDocumentList.size() - 1);
        assertThat(testTypeDocument.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testTypeDocument.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTypeDocument.isEtat()).isEqualTo(UPDATED_ETAT);
    }

    @Test
    @Transactional
    public void updateNonExistingTypeDocument() throws Exception {
        int databaseSizeBeforeUpdate = typeDocumentRepository.findAll().size();

        // Create the TypeDocument

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeDocumentMockMvc.perform(put("/api/type-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeDocument)))
            .andExpect(status().isBadRequest());

        // Validate the TypeDocument in the database
        List<TypeDocument> typeDocumentList = typeDocumentRepository.findAll();
        assertThat(typeDocumentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTypeDocument() throws Exception {
        // Initialize the database
        typeDocumentRepository.saveAndFlush(typeDocument);

        int databaseSizeBeforeDelete = typeDocumentRepository.findAll().size();

        // Delete the typeDocument
        restTypeDocumentMockMvc.perform(delete("/api/type-documents/{id}", typeDocument.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TypeDocument> typeDocumentList = typeDocumentRepository.findAll();
        assertThat(typeDocumentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypeDocument.class);
        TypeDocument typeDocument1 = new TypeDocument();
        typeDocument1.setId(1L);
        TypeDocument typeDocument2 = new TypeDocument();
        typeDocument2.setId(typeDocument1.getId());
        assertThat(typeDocument1).isEqualTo(typeDocument2);
        typeDocument2.setId(2L);
        assertThat(typeDocument1).isNotEqualTo(typeDocument2);
        typeDocument1.setId(null);
        assertThat(typeDocument1).isNotEqualTo(typeDocument2);
    }
}
