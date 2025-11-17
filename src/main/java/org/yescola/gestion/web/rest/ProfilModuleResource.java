package org.yescola.gestion.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.yescola.gestion.domain.ProfilModule;
import org.yescola.gestion.repository.ProfilModuleRepository;
import org.yescola.gestion.web.rest.errors.BadRequestAlertException;
import org.yescola.gestion.web.rest.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ProfilModule.
 */
@RestController
@RequestMapping("/api")
public class ProfilModuleResource {

    private final Logger log = LoggerFactory.getLogger(ProfilModuleResource.class);

    private static final String ENTITY_NAME = "profilModule";

    private final ProfilModuleRepository profilModuleRepository;

    public ProfilModuleResource(ProfilModuleRepository profilModuleRepository) {
        this.profilModuleRepository = profilModuleRepository;
    }

    /**
     * POST  /profil-modules : Create a new profilModule.
     *
     * @param profilModule the profilModule to create
     * @return the ResponseEntity with status 201 (Created) and with body the new profilModule, or with status 400 (Bad Request) if the profilModule has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/profil-modules")
    public ResponseEntity<ProfilModule> createProfilModule(@RequestBody ProfilModule profilModule) throws URISyntaxException {
        log.debug("REST request to save ProfilModule : {}", profilModule);
        if (profilModule.getId() != null) {
            throw new BadRequestAlertException("A new profilModule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProfilModule result = profilModuleRepository.save(profilModule);
        return ResponseEntity.created(new URI("/api/profil-modules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /profil-modules : Updates an existing profilModule.
     *
     * @param profilModule the profilModule to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated profilModule,
     * or with status 400 (Bad Request) if the profilModule is not valid,
     * or with status 500 (Internal Server Error) if the profilModule couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/profil-modules")
    public ResponseEntity<ProfilModule> updateProfilModule(@RequestBody ProfilModule profilModule) throws URISyntaxException {
        log.debug("REST request to update ProfilModule : {}", profilModule);
        if (profilModule.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProfilModule result = profilModuleRepository.save(profilModule);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, profilModule.getId().toString()))
            .body(result);
    }

    /**
     * GET  /profil-modules : get all the profilModules.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of profilModules in body
     */
    @GetMapping("/profil-modules")
    public List<ProfilModule> getAllProfilModules() {
        log.debug("REST request to get all ProfilModules");
        return profilModuleRepository.findAll();
    }

    /**
     * GET  /profil-modules/:id : get the "id" profilModule.
     *
     * @param id the id of the profilModule to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the profilModule, or with status 404 (Not Found)
     */
    @GetMapping("/profil-modules/{id}")
    public ResponseEntity<ProfilModule> getProfilModule(@PathVariable Long id) {
        log.debug("REST request to get ProfilModule : {}", id);
        Optional<ProfilModule> profilModule = profilModuleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(profilModule);
    }

    /**
     * DELETE  /profil-modules/:id : delete the "id" profilModule.
     *
     * @param id the id of the profilModule to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/profil-modules/{id}")
    public ResponseEntity<Void> deleteProfilModule(@PathVariable Long id) {
        log.debug("REST request to delete ProfilModule : {}", id);
        profilModuleRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    @GetMapping("/maxProfilModule/{id}/{id1}")
    public Object[] maxProfilModule(@PathVariable Long id,@PathVariable Long id1) {
        return this.profilModuleRepository.ProfilModule(id,id1);
    }

    @GetMapping("/profilModuleAll/{id}")
    public List<ProfilModule> profilModuleAll(@PathVariable Long id) {
        return this.profilModuleRepository.profilModuleAll(id);
    }

    @GetMapping("/profilModuleAllX/{id}/{id1}")
    public List<ProfilModule> profilModuleAllX(@PathVariable Long id,@PathVariable Long id1) {

        List<ProfilModule> profilsmodulX = this.profilModuleRepository.profilModuleAll2(id,id1);
        return profilsmodulX;
    }
}
