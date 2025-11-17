package org.yescola.gestion.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.yescola.gestion.domain.SiteProfil;
import org.yescola.gestion.repository.SiteProfilRepository;
import org.yescola.gestion.web.rest.errors.BadRequestAlertException;
import org.yescola.gestion.web.rest.util.HeaderUtil;
import org.yescola.gestion.web.rest.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SiteProfil.
 */
@RestController
@RequestMapping("/api")
public class SiteProfilResource {

    private final Logger log = LoggerFactory.getLogger(SiteProfilResource.class);

    private static final String ENTITY_NAME = "siteProfil";

    private final SiteProfilRepository siteProfilRepository;

    public SiteProfilResource(SiteProfilRepository siteProfilRepository) {
        this.siteProfilRepository = siteProfilRepository;
    }

    /**
     * POST  /site-profils : Create a new siteProfil.
     *
     * @param siteProfil the siteProfil to create
     * @return the ResponseEntity with status 201 (Created) and with body the new siteProfil, or with status 400 (Bad Request) if the siteProfil has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/site-profils")
    public ResponseEntity<SiteProfil> createSiteProfil(@RequestBody SiteProfil siteProfil) throws URISyntaxException {
        log.debug("REST request to save SiteProfil : {}", siteProfil);
        if (siteProfil.getId() != null) {
            throw new BadRequestAlertException("A new siteProfil cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SiteProfil result = siteProfilRepository.save(siteProfil);
        return ResponseEntity.created(new URI("/api/site-profils/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /site-profils : Updates an existing siteProfil.
     *
     * @param siteProfil the siteProfil to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated siteProfil,
     * or with status 400 (Bad Request) if the siteProfil is not valid,
     * or with status 500 (Internal Server Error) if the siteProfil couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/site-profils")
    public ResponseEntity<SiteProfil> updateSiteProfil(@RequestBody SiteProfil siteProfil) throws URISyntaxException {
        log.debug("REST request to update SiteProfil : {}", siteProfil);
        if (siteProfil.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SiteProfil result = siteProfilRepository.save(siteProfil);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, siteProfil.getId().toString()))
            .body(result);
    }

    /**
     * GET  /site-profils : get all the siteProfils.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of siteProfils in body
     */
    @GetMapping("/site-profils")
    public ResponseEntity<List<SiteProfil>> getAllSiteProfils(Pageable pageable) {
        log.debug("REST request to get a page of SiteProfils");
        Page<SiteProfil> page = siteProfilRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/site-profils");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /site-profils/:id : get the "id" siteProfil.
     *
     * @param id the id of the siteProfil to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the siteProfil, or with status 404 (Not Found)
     */
    @GetMapping("/site-profils/{id}")
    public ResponseEntity<SiteProfil> getSiteProfil(@PathVariable Long id) {
        log.debug("REST request to get SiteProfil : {}", id);
        Optional<SiteProfil> siteProfil = siteProfilRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(siteProfil);
    }

    /**
     * DELETE  /site-profils/:id : delete the "id" siteProfil.
     *
     * @param id the id of the siteProfil to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/site-profils/{id}")
    public ResponseEntity<Void> deleteSiteProfil(@PathVariable Long id) {
        log.debug("REST request to delete SiteProfil : {}", id);
        siteProfilRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/maxSiteProfil/{id}")
    public Object[] maxSiteProfil(@PathVariable Long id) {
        return this.siteProfilRepository.SiteProfil(id);
    }

    @GetMapping("/site-all/{id}")
    public List<SiteProfil> getProfilMenu(@PathVariable Long id) {

        List<SiteProfil> siteProfils = siteProfilRepository.siteProfilall(id);
        return siteProfils;
    }

    @GetMapping("/profilSiteAll/{id}/{id1}")
    public List<SiteProfil> profilSiteAll(@PathVariable Long id,@PathVariable Long id1) {

        List<SiteProfil> siteProfils = siteProfilRepository.siteProfilall2(id,id1);
        return siteProfils;
    }
}
