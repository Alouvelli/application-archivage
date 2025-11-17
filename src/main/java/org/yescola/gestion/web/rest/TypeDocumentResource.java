package org.yescola.gestion.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.yescola.gestion.domain.TypeDocument;
import org.yescola.gestion.repository.TypeDocumentRepository;
import org.yescola.gestion.web.rest.errors.BadRequestAlertException;
import org.yescola.gestion.web.rest.util.HeaderUtil;
import org.yescola.gestion.web.rest.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TypeDocument.
 */
@RestController
@RequestMapping("/api")
public class TypeDocumentResource {

    private final Logger log = LoggerFactory.getLogger(TypeDocumentResource.class);

    private static final String ENTITY_NAME = "typeDocument";

    private final TypeDocumentRepository typeDocumentRepository;

    public TypeDocumentResource(TypeDocumentRepository typeDocumentRepository) {
        this.typeDocumentRepository = typeDocumentRepository;
    }

    /**
     * POST  /type-documents : Create a new typeDocument.
     *
     * @param typeDocument the typeDocument to create
     * @return the ResponseEntity with status 201 (Created) and with body the new typeDocument, or with status 400 (Bad Request) if the typeDocument has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/type-documents")
    public ResponseEntity<TypeDocument> createTypeDocument(@RequestBody TypeDocument typeDocument) throws URISyntaxException {
        log.debug("REST request to save TypeDocument : {}", typeDocument);
        if (typeDocument.getId() != null) {
            throw new BadRequestAlertException("A new typeDocument cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TypeDocument result = typeDocumentRepository.save(typeDocument);
        return ResponseEntity.created(new URI("/api/type-documents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /type-documents : Updates an existing typeDocument.
     *
     * @param typeDocument the typeDocument to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated typeDocument,
     * or with status 400 (Bad Request) if the typeDocument is not valid,
     * or with status 500 (Internal Server Error) if the typeDocument couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/type-documents")
    public ResponseEntity<TypeDocument> updateTypeDocument(@RequestBody TypeDocument typeDocument) throws URISyntaxException {
        log.debug("REST request to update TypeDocument : {}", typeDocument);
        if (typeDocument.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TypeDocument result = typeDocumentRepository.save(typeDocument);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, typeDocument.getId().toString()))
            .body(result);
    }

    /**
     * GET  /type-documents : get all the typeDocuments.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of typeDocuments in body
     */
    @GetMapping("/type-documents")
    public ResponseEntity<List<TypeDocument>> getAllTypeDocuments(Pageable pageable) {
        log.debug("REST request to get a page of TypeDocuments");
        Page<TypeDocument> page = typeDocumentRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/type-documents");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /type-documents/:id : get the "id" typeDocument.
     *
     * @param id the id of the typeDocument to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the typeDocument, or with status 404 (Not Found)
     */
    @GetMapping("/type-documents/{id}")
    public ResponseEntity<TypeDocument> getTypeDocument(@PathVariable Long id) {
        log.debug("REST request to get TypeDocument : {}", id);
        Optional<TypeDocument> typeDocument = typeDocumentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(typeDocument);
    }

    /**
     * DELETE  /type-documents/:id : delete the "id" typeDocument.
     *
     * @param id the id of the typeDocument to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/type-documents/{id}")
    public ResponseEntity<Void> deleteTypeDocument(@PathVariable Long id) {
        log.debug("REST request to delete TypeDocument : {}", id);
        typeDocumentRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    @GetMapping("/typeDocument/{id}")
    public List<TypeDocument> typeDocument(@PathVariable Long id) {
        return this.typeDocumentRepository.gettypedocument(id);
    }
}
