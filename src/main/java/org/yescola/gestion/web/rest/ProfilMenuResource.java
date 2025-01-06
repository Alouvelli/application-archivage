package org.yescola.gestion.web.rest;
import org.yescola.gestion.domain.ProfilMenu;
import org.yescola.gestion.repository.ProfilMenuRepository;
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
 * REST controller for managing ProfilMenu.
 */
@RestController
@RequestMapping("/api")
public class ProfilMenuResource {

    private final Logger log = LoggerFactory.getLogger(ProfilMenuResource.class);

    private static final String ENTITY_NAME = "profilMenu";

    private final ProfilMenuRepository profilMenuRepository;

    public ProfilMenuResource(ProfilMenuRepository profilMenuRepository) {
        this.profilMenuRepository = profilMenuRepository;
    }

    /**
     * POST  /profil-menus : Create a new profilMenu.
     *
     * @param profilMenu the profilMenu to create
     * @return the ResponseEntity with status 201 (Created) and with body the new profilMenu, or with status 400 (Bad Request) if the profilMenu has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/profil-menus")
    public ResponseEntity<ProfilMenu> createProfilMenu(@RequestBody ProfilMenu profilMenu) throws URISyntaxException {
        log.debug("REST request to save ProfilMenu : {}", profilMenu);
        if (profilMenu.getId() != null) {
            throw new BadRequestAlertException("A new profilMenu cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProfilMenu result = profilMenuRepository.save(profilMenu);
        return ResponseEntity.created(new URI("/api/profil-menus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /profil-menus : Updates an existing profilMenu.
     *
     * @param profilMenu the profilMenu to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated profilMenu,
     * or with status 400 (Bad Request) if the profilMenu is not valid,
     * or with status 500 (Internal Server Error) if the profilMenu couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/profil-menus")
    public ResponseEntity<ProfilMenu> updateProfilMenu(@RequestBody ProfilMenu profilMenu) throws URISyntaxException {
        log.debug("REST request to update ProfilMenu : {}", profilMenu);
        if (profilMenu.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProfilMenu result = profilMenuRepository.save(profilMenu);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, profilMenu.getId().toString()))
            .body(result);
    }

    /**
     * GET  /profil-menus : get all the profilMenus.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of profilMenus in body
     */
    @GetMapping("/profil-menus")
    public ResponseEntity<List<ProfilMenu>> getAllProfilMenus(Pageable pageable) {
        log.debug("REST request to get a page of ProfilMenus");
        Page<ProfilMenu> page = profilMenuRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/profil-menus");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /profil-menus/:id : get the "id" profilMenu.
     *
     * @param id the id of the profilMenu to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the profilMenu, or with status 404 (Not Found)
     */
    @GetMapping("/profil-menus/{id}")
    public ResponseEntity<ProfilMenu> getProfilMenu(@PathVariable Long id) {
        log.debug("REST request to get ProfilMenu : {}", id);
        Optional<ProfilMenu> profilMenu = profilMenuRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(profilMenu);
    }

    /**
     * DELETE  /profil-menus/:id : delete the "id" profilMenu.
     *
     * @param id the id of the profilMenu to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/profil-menus/{id}")
    public ResponseEntity<Void> deleteProfilMenu(@PathVariable Long id) {
        log.debug("REST request to delete ProfilMenu : {}", id);
        profilMenuRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/profil-menus-all")
    public List<ProfilMenu> getProfilMenu() {

        List<ProfilMenu> profilMenu = profilMenuRepository.findAll();
        return profilMenu;
    }
    @GetMapping("/profilMenuAll/{id}")
    public List<ProfilMenu> profilMenuAll(@PathVariable Long id) {
        return this.profilMenuRepository.profilMenuAll(id);
    }
}
