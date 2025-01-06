package org.yescola.gestion.web.rest;
import org.yescola.gestion.domain.Documentexcel;
import org.yescola.gestion.repository.DocumentexcelRepository;
import org.yescola.gestion.web.rest.errors.BadRequestAlertException;
import org.yescola.gestion.web.rest.util.HeaderUtil;
import org.yescola.gestion.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Documentexcel.
 */
@RestController
@RequestMapping("/api")
public class DocumentexcelResource {

    private final Logger log = LoggerFactory.getLogger(DocumentexcelResource.class);

    private static final String ENTITY_NAME = "documentexcel";

    private final DocumentexcelRepository documentexcelRepository;

    public DocumentexcelResource(DocumentexcelRepository documentexcelRepository) {
        this.documentexcelRepository = documentexcelRepository;
    }

    /**
     * POST  /documentexcels : Create a new documentexcel.
     *
     * @param documentexcel the documentexcel to create
     * @return the ResponseEntity with status 201 (Created) and with body the new documentexcel, or with status 400 (Bad Request) if the documentexcel has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/documentexcels")
    public ResponseEntity<Documentexcel> createDocumentexcel(@RequestBody Documentexcel documentexcel) throws URISyntaxException {
        log.debug("REST request to save Documentexcel : {}", documentexcel);
        if (documentexcel.getId() != null) {
            throw new BadRequestAlertException("A new documentexcel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Documentexcel result = documentexcelRepository.save(documentexcel);
        return ResponseEntity.created(new URI("/api/documentexcels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /documentexcels : Updates an existing documentexcel.
     *
     * @param documentexcel the documentexcel to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated documentexcel,
     * or with status 400 (Bad Request) if the documentexcel is not valid,
     * or with status 500 (Internal Server Error) if the documentexcel couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/documentexcels")
    public ResponseEntity<Documentexcel> updateDocumentexcel(@RequestBody Documentexcel documentexcel) throws URISyntaxException {
        log.debug("REST request to update Documentexcel : {}", documentexcel);
        if (documentexcel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Documentexcel result = documentexcelRepository.save(documentexcel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, documentexcel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /documentexcels : get all the documentexcels.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of documentexcels in body
     */
    @GetMapping("/documentexcels")
    public ResponseEntity<List<Documentexcel>> getAllDocumentexcels(Pageable pageable) {
        log.debug("REST request to get a page of Documentexcels");
        Page<Documentexcel> page = documentexcelRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/documentexcels");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /documentexcels/:id : get the "id" documentexcel.
     *
     * @param id the id of the documentexcel to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the documentexcel, or with status 404 (Not Found)
     */
    @GetMapping("/documentexcels/{id}")
    public ResponseEntity<Documentexcel> getDocumentexcel(@PathVariable Long id) {
        log.debug("REST request to get Documentexcel : {}", id);
        Optional<Documentexcel> documentexcel = documentexcelRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(documentexcel);
    }

    /**
     * DELETE  /documentexcels/:id : delete the "id" documentexcel.
     *
     * @param id the id of the documentexcel to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/documentexcels/{id}")
    public ResponseEntity<Void> deleteDocumentexcel(@PathVariable Long id) {
        log.debug("REST request to delete Documentexcel : {}", id);
        documentexcelRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
