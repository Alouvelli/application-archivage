package org.yescola.gestion.web.rest;
import org.yescola.gestion.domain.Semestre;
import org.yescola.gestion.repository.SemestreRepository;
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
 * REST controller for managing Semestre.
 */
@RestController
@RequestMapping("/api")
public class SemestreResource {

    private final Logger log = LoggerFactory.getLogger(SemestreResource.class);

    private static final String ENTITY_NAME = "semestre";

    private final SemestreRepository semestreRepository;

    public SemestreResource(SemestreRepository semestreRepository) {
        this.semestreRepository = semestreRepository;
    }

    /**
     * POST  /semestres : Create a new semestre.
     *
     * @param semestre the semestre to create
     * @return the ResponseEntity with status 201 (Created) and with body the new semestre, or with status 400 (Bad Request) if the semestre has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/semestres")
    public ResponseEntity<Semestre> createSemestre(@RequestBody Semestre semestre) throws URISyntaxException {
        log.debug("REST request to save Semestre : {}", semestre);
        if (semestre.getId() != null) {
            throw new BadRequestAlertException("A new semestre cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Semestre result = semestreRepository.save(semestre);
        return ResponseEntity.created(new URI("/api/semestres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /semestres : Updates an existing semestre.
     *
     * @param semestre the semestre to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated semestre,
     * or with status 400 (Bad Request) if the semestre is not valid,
     * or with status 500 (Internal Server Error) if the semestre couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/semestres")
    public ResponseEntity<Semestre> updateSemestre(@RequestBody Semestre semestre) throws URISyntaxException {
        log.debug("REST request to update Semestre : {}", semestre);
        if (semestre.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Semestre result = semestreRepository.save(semestre);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, semestre.getId().toString()))
            .body(result);
    }

    /**
     * GET  /semestres : get all the semestres.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of semestres in body
     */
    @GetMapping("/semestres")
    public ResponseEntity<List<Semestre>> getAllSemestres(Pageable pageable) {
        log.debug("REST request to get a page of Semestres");
        Page<Semestre> page = semestreRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/semestres");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /semestres/:id : get the "id" semestre.
     *
     * @param id the id of the semestre to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the semestre, or with status 404 (Not Found)
     */
    @GetMapping("/semestres/{id}")
    public ResponseEntity<Semestre> getSemestre(@PathVariable Long id) {
        log.debug("REST request to get Semestre : {}", id);
        Optional<Semestre> semestre = semestreRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(semestre);
    }

    /**
     * DELETE  /semestres/:id : delete the "id" semestre.
     *
     * @param id the id of the semestre to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/semestres/{id}")
    public ResponseEntity<Void> deleteSemestre(@PathVariable Long id) {
        log.debug("REST request to delete Semestre : {}", id);
        semestreRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
