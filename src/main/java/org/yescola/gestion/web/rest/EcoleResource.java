package org.yescola.gestion.web.rest;
import org.yescola.gestion.domain.Ecole;
import org.yescola.gestion.repository.EcoleRepository;
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
 * REST controller for managing Ecole.
 */
@RestController
@RequestMapping("/api")
public class EcoleResource {

    private final Logger log = LoggerFactory.getLogger(EcoleResource.class);

    private static final String ENTITY_NAME = "ecole";

    private final EcoleRepository ecoleRepository;

    public EcoleResource(EcoleRepository ecoleRepository) {
        this.ecoleRepository = ecoleRepository;
    }

    /**
     * POST  /ecoles : Create a new ecole.
     *
     * @param ecole the ecole to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ecole, or with status 400 (Bad Request) if the ecole has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ecoles")
    public ResponseEntity<Ecole> createEcole(@RequestBody Ecole ecole) throws URISyntaxException {
        log.debug("REST request to save Ecole : {}", ecole);
        if (ecole.getId() != null) {
            throw new BadRequestAlertException("A new ecole cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ecole result = ecoleRepository.save(ecole);
        return ResponseEntity.created(new URI("/api/ecoles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ecoles : Updates an existing ecole.
     *
     * @param ecole the ecole to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ecole,
     * or with status 400 (Bad Request) if the ecole is not valid,
     * or with status 500 (Internal Server Error) if the ecole couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ecoles")
    public ResponseEntity<Ecole> updateEcole(@RequestBody Ecole ecole) throws URISyntaxException {
        log.debug("REST request to update Ecole : {}", ecole);
        if (ecole.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ecole result = ecoleRepository.save(ecole);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ecole.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ecoles : get all the ecoles.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of ecoles in body
     */
    @GetMapping("/ecoles")
    public ResponseEntity<List<Ecole>> getAllEcoles(Pageable pageable) {
        log.debug("REST request to get a page of Ecoles");
        Page<Ecole> page = ecoleRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/ecoles");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /ecoles/:id : get the "id" ecole.
     *
     * @param id the id of the ecole to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ecole, or with status 404 (Not Found)
     */
    @GetMapping("/ecoles/{id}")
    public ResponseEntity<Ecole> getEcole(@PathVariable Long id) {
        log.debug("REST request to get Ecole : {}", id);
        Optional<Ecole> ecole = ecoleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ecole);
    }

    /**
     * DELETE  /ecoles/:id : delete the "id" ecole.
     *
     * @param id the id of the ecole to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ecoles/{id}")
    public ResponseEntity<Void> deleteEcole(@PathVariable Long id) {
        log.debug("REST request to delete Ecole : {}", id);
        ecoleRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
