package org.yescola.gestion.web.rest;
import afu.org.checkerframework.checker.igj.qual.I;
import org.yescola.gestion.domain.Inscription;
import org.yescola.gestion.repository.InscriptionRepository;
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
 * REST controller for managing Inscription.
 */
@RestController
@RequestMapping("/api")
public class InscriptionResource {

    private final Logger log = LoggerFactory.getLogger(InscriptionResource.class);

    private static final String ENTITY_NAME = "inscription";

    private final InscriptionRepository inscriptionRepository;

    public InscriptionResource(InscriptionRepository inscriptionRepository) {
        this.inscriptionRepository = inscriptionRepository;
    }

    /**
     * POST  /inscriptions : Create a new inscription.
     *
     * @param inscription the inscription to create
     * @return the ResponseEntity with status 201 (Created) and with body the new inscription, or with status 400 (Bad Request) if the inscription has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/inscriptions")
    public ResponseEntity<Inscription> createInscription(@RequestBody Inscription inscription) throws URISyntaxException {
        log.debug("REST request to save Inscription : {}", inscription);
        if (inscription.getId() != null) {
            throw new BadRequestAlertException("A new inscription cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Inscription result = inscriptionRepository.save(inscription);
        return ResponseEntity.created(new URI("/api/inscriptions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /inscriptions : Updates an existing inscription.
     *
     * @param inscription the inscription to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated inscription,
     * or with status 400 (Bad Request) if the inscription is not valid,
     * or with status 500 (Internal Server Error) if the inscription couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/inscriptions")
    public ResponseEntity<Inscription> updateInscription(@RequestBody Inscription inscription) throws URISyntaxException {
        log.debug("REST request to update Inscription : {}", inscription);
        if (inscription.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Inscription result = inscriptionRepository.save(inscription);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, inscription.getId().toString()))
            .body(result);
    }

    /**
     * GET  /inscriptions : get all the inscriptions.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of inscriptions in body
     */
    @GetMapping("/inscriptions")
    public ResponseEntity<List<Inscription>> getAllInscriptions(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Inscriptions");
        Page<Inscription> page;
        if (eagerload) {
            page = inscriptionRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = inscriptionRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/inscriptions?eagerload=%b", eagerload));
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /inscriptions/:id : get the "id" inscription.
     *
     * @param id the id of the inscription to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the inscription, or with status 404 (Not Found)
     */
    @GetMapping("/inscriptions/{id}")
    public ResponseEntity<Inscription> getInscription(@PathVariable Long id) {
        log.debug("REST request to get Inscription : {}", id);
        Optional<Inscription> inscription = inscriptionRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(inscription);
    }

    /**
     * DELETE  /inscriptions/:id : delete the "id" inscription.
     *
     * @param id the id of the inscription to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/inscriptions/{id}")
    public ResponseEntity<Void> deleteInscription(@PathVariable Long id) {
        log.debug("REST request to delete Inscription : {}", id);
        inscriptionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    @GetMapping("/maxInscription")
    public Object[] maxInscription() {
        return this.inscriptionRepository.maxInscription();
    }

    @GetMapping("/allInscription/{id}")
    public Inscription allInscription(@PathVariable Long id) {
        return this.inscriptionRepository.allInscription(id);
    }

    @GetMapping("/getAllInscription")
    public List<Inscription> getallInscription() {
        return this.inscriptionRepository.getAll();
    }

}
