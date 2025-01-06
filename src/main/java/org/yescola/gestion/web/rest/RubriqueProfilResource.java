package org.yescola.gestion.web.rest;
import org.yescola.gestion.domain.RubriqueProfil;
import org.yescola.gestion.repository.RubriqueProfilRepository;
import org.yescola.gestion.web.rest.errors.BadRequestAlertException;
import org.yescola.gestion.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing RubriqueProfil.
 */
@RestController
@RequestMapping("/api")
public class RubriqueProfilResource {

    private final Logger log = LoggerFactory.getLogger(RubriqueProfilResource.class);

    private static final String ENTITY_NAME = "rubriqueProfil";

    private final RubriqueProfilRepository rubriqueProfilRepository;

    public RubriqueProfilResource(RubriqueProfilRepository rubriqueProfilRepository) {
        this.rubriqueProfilRepository = rubriqueProfilRepository;
    }

    /**
     * POST  /rubrique-profils : Create a new rubriqueProfil.
     *
     * @param rubriqueProfil the rubriqueProfil to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rubriqueProfil, or with status 400 (Bad Request) if the rubriqueProfil has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rubrique-profils")
    public ResponseEntity<RubriqueProfil> createRubriqueProfil(@RequestBody RubriqueProfil rubriqueProfil) throws URISyntaxException {
        log.debug("REST request to save RubriqueProfil : {}", rubriqueProfil);
        if (rubriqueProfil.getId() != null) {
            throw new BadRequestAlertException("A new rubriqueProfil cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RubriqueProfil result = rubriqueProfilRepository.save(rubriqueProfil);
        return ResponseEntity.created(new URI("/api/rubrique-profils/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rubrique-profils : Updates an existing rubriqueProfil.
     *
     * @param rubriqueProfil the rubriqueProfil to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rubriqueProfil,
     * or with status 400 (Bad Request) if the rubriqueProfil is not valid,
     * or with status 500 (Internal Server Error) if the rubriqueProfil couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rubrique-profils")
    public ResponseEntity<RubriqueProfil> updateRubriqueProfil(@RequestBody RubriqueProfil rubriqueProfil) throws URISyntaxException {
        log.debug("REST request to update RubriqueProfil : {}", rubriqueProfil);
        if (rubriqueProfil.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RubriqueProfil result = rubriqueProfilRepository.save(rubriqueProfil);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rubriqueProfil.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rubrique-profils : get all the rubriqueProfils.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of rubriqueProfils in body
     */
    @GetMapping("/rubrique-profils")
    public List<RubriqueProfil> getAllRubriqueProfils() {
        log.debug("REST request to get all RubriqueProfils");
        return rubriqueProfilRepository.findAll();
    }

    /**
     * GET  /rubrique-profils/:id : get the "id" rubriqueProfil.
     *
     * @param id the id of the rubriqueProfil to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rubriqueProfil, or with status 404 (Not Found)
     */
    @GetMapping("/rubrique-profils/{id}")
    public ResponseEntity<RubriqueProfil> getRubriqueProfil(@PathVariable Long id) {
        log.debug("REST request to get RubriqueProfil : {}", id);
        Optional<RubriqueProfil> rubriqueProfil = rubriqueProfilRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rubriqueProfil);
    }

    /**
     * DELETE  /rubrique-profils/:id : delete the "id" rubriqueProfil.
     *
     * @param id the id of the rubriqueProfil to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rubrique-profils/{id}")
    public ResponseEntity<Void> deleteRubriqueProfil(@PathVariable Long id) {
        log.debug("REST request to delete RubriqueProfil : {}", id);
        rubriqueProfilRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/maxProfilRubrique/{id}/{id1}")
    public Object[] maxProfilRubrique(@PathVariable Long id,@PathVariable Long id1) {
        return this.rubriqueProfilRepository.RubriqueProfil(id,id1);
    }

    @GetMapping("/profilRubriqueAll/{id}")
    public List<RubriqueProfil> profilModuleAll(@PathVariable Long id) {
        return this.rubriqueProfilRepository.profilRubriqueAll(id);
    }

    @GetMapping("/profilRubriqueAllX/{id}/{id1}")
    public List<RubriqueProfil> profilRubriqueAllX(@PathVariable Long id,@PathVariable Long id1) {

        List<RubriqueProfil> profilRubriqueAllX= this.rubriqueProfilRepository.profilRubriqueAll2(id,id1);
        return profilRubriqueAllX;
    }
}
