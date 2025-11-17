package org.yescola.gestion.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.yescola.gestion.domain.Anneescolaire;
import org.yescola.gestion.repository.AnneescolaireRepository;
import org.yescola.gestion.web.rest.errors.BadRequestAlertException;
import org.yescola.gestion.web.rest.util.HeaderUtil;
import org.yescola.gestion.web.rest.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Anneescolaire.
 */
@RestController
@RequestMapping("/api")
public class AnneescolaireResource {

    private final Logger log = LoggerFactory.getLogger(AnneescolaireResource.class);

    private static final String ENTITY_NAME = "anneescolaire";

    private final AnneescolaireRepository anneescolaireRepository;

    public AnneescolaireResource(AnneescolaireRepository anneescolaireRepository) {
        this.anneescolaireRepository = anneescolaireRepository;
    }

    /**
     * POST  /anneescolaires : Create a new anneescolaire.
     *
     * @param anneescolaire the anneescolaire to create
     * @return the ResponseEntity with status 201 (Created) and with body the new anneescolaire, or with status 400 (Bad Request) if the anneescolaire has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/anneescolaires")
    public ResponseEntity<Anneescolaire> createAnneescolaire(@RequestBody Anneescolaire anneescolaire) throws URISyntaxException {
        log.debug("REST request to save Anneescolaire : {}", anneescolaire);
        if (anneescolaire.getId() != null) {
            throw new BadRequestAlertException("A new anneescolaire cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Anneescolaire result = anneescolaireRepository.save(anneescolaire);
        return ResponseEntity.created(new URI("/api/anneescolaires/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /anneescolaires : Updates an existing anneescolaire.
     *
     * @param anneescolaire the anneescolaire to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated anneescolaire,
     * or with status 400 (Bad Request) if the anneescolaire is not valid,
     * or with status 500 (Internal Server Error) if the anneescolaire couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/anneescolaires")
    public ResponseEntity<Anneescolaire> updateAnneescolaire(@RequestBody Anneescolaire anneescolaire) throws URISyntaxException {
        log.debug("REST request to update Anneescolaire : {}", anneescolaire);
        if (anneescolaire.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Anneescolaire result = anneescolaireRepository.save(anneescolaire);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, anneescolaire.getId().toString()))
            .body(result);
    }

    /**
     * GET  /anneescolaires : get all the anneescolaires.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of anneescolaires in body
     */
    @GetMapping("/anneescolaires")
    public ResponseEntity<List<Anneescolaire>> getAllAnneescolaires(Pageable pageable) {
        log.debug("REST request to get a page of Anneescolaires");
        Page<Anneescolaire> page = anneescolaireRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/anneescolaires");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /anneescolaires/:id : get the "id" anneescolaire.
     *
     * @param id the id of the anneescolaire to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the anneescolaire, or with status 404 (Not Found)
     */
    @GetMapping("/anneescolaires/{id}")
    public ResponseEntity<Anneescolaire> getAnneescolaire(@PathVariable Long id) {
        log.debug("REST request to get Anneescolaire : {}", id);
        Optional<Anneescolaire> anneescolaire = anneescolaireRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(anneescolaire);
    }

    /**
     * DELETE  /anneescolaires/:id : delete the "id" anneescolaire.
     *
     * @param id the id of the anneescolaire to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/anneescolaires/{id}")
    public ResponseEntity<Void> deleteAnneescolaire(@PathVariable Long id) {
        log.debug("REST request to delete Anneescolaire : {}", id);
        anneescolaireRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
