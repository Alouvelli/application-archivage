package org.yescola.gestion.web.rest;
import org.yescola.gestion.domain.Documentclasse;
import org.yescola.gestion.repository.DocumentclasseRepository;
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
 * REST controller for managing Documentclasse.
 */
@RestController
@RequestMapping("/api")
public class DocumentclasseResource {

    private final Logger log = LoggerFactory.getLogger(DocumentclasseResource.class);

    private static final String ENTITY_NAME = "documentclasse";

    private final DocumentclasseRepository documentclasseRepository;

    public DocumentclasseResource(DocumentclasseRepository documentclasseRepository) {
        this.documentclasseRepository = documentclasseRepository;
    }

    /**
     * POST  /documentclasses : Create a new documentclasse.
     *
     * @param documentclasse the documentclasse to create
     * @return the ResponseEntity with status 201 (Created) and with body the new documentclasse, or with status 400 (Bad Request) if the documentclasse has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/documentclasses")
    public ResponseEntity<Documentclasse> createDocumentclasse(@RequestBody Documentclasse documentclasse) throws URISyntaxException {
        log.debug("REST request to save Documentclasse : {}", documentclasse);
        if (documentclasse.getId() != null) {
            throw new BadRequestAlertException("A new documentclasse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Documentclasse result = documentclasseRepository.save(documentclasse);
        return ResponseEntity.created(new URI("/api/documentclasses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /documentclasses : Updates an existing documentclasse.
     *
     * @param documentclasse the documentclasse to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated documentclasse,
     * or with status 400 (Bad Request) if the documentclasse is not valid,
     * or with status 500 (Internal Server Error) if the documentclasse couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/documentclasses")
    public ResponseEntity<Documentclasse> updateDocumentclasse(@RequestBody Documentclasse documentclasse) throws URISyntaxException {
        log.debug("REST request to update Documentclasse : {}", documentclasse);
        if (documentclasse.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Documentclasse result = documentclasseRepository.save(documentclasse);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, documentclasse.getId().toString()))
            .body(result);
    }

    /**
     * GET  /documentclasses : get all the documentclasses.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of documentclasses in body
     */
    @GetMapping("/documentclasses")
    public ResponseEntity<List<Documentclasse>> getAllDocumentclasses(Pageable pageable) {
        log.debug("REST request to get a page of Documentclasses");
        Page<Documentclasse> page = documentclasseRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/documentclasses");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /documentclasses/:id : get the "id" documentclasse.
     *
     * @param id the id of the documentclasse to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the documentclasse, or with status 404 (Not Found)
     */
    @GetMapping("/documentclasses/{id}")
    public ResponseEntity<Documentclasse> getDocumentclasse(@PathVariable Long id) {
        log.debug("REST request to get Documentclasse : {}", id);
        Optional<Documentclasse> documentclasse = documentclasseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(documentclasse);
    }

    /**
     * DELETE  /documentclasses/:id : delete the "id" documentclasse.
     *
     * @param id the id of the documentclasse to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/documentclasses/{id}")
    public ResponseEntity<Void> deleteDocumentclasse(@PathVariable Long id) {
        log.debug("REST request to delete Documentclasse : {}", id);
        documentclasseRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    @GetMapping("/getAlldocumentClasse")
    public List<Documentclasse> getalldocumentClasse() {
        return this.documentclasseRepository.getAll();
    }
}
