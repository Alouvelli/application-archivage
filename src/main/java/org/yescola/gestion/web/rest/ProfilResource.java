package org.yescola.gestion.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.yescola.gestion.domain.Menu;
import org.yescola.gestion.domain.Module;
import org.yescola.gestion.domain.Profil;
import org.yescola.gestion.domain.Rubrique;
import org.yescola.gestion.repository.MenuRepository;
import org.yescola.gestion.repository.ModuleRepository;
import org.yescola.gestion.repository.ProfilRepository;
import org.yescola.gestion.repository.RubriqueRepository;
import org.yescola.gestion.web.rest.errors.BadRequestAlertException;
import org.yescola.gestion.web.rest.util.HeaderUtil;
import org.yescola.gestion.web.rest.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Profil.
 */
@RestController
@RequestMapping("/api")
public class ProfilResource {

    private final Logger log = LoggerFactory.getLogger(ProfilResource.class);

    private static final String ENTITY_NAME = "profil";

    private final ProfilRepository profilRepository;
    private final ModuleRepository moduleRepository;
    private final RubriqueRepository rubriqueRepository;
    private final MenuRepository menuRepository;

    public ProfilResource(ProfilRepository profilRepository,MenuRepository menuRepository,ModuleRepository moduleRepository,RubriqueRepository rubriqueRepository) {
        this.profilRepository = profilRepository;
        this.menuRepository=menuRepository;
        this.moduleRepository=moduleRepository;
        this.rubriqueRepository=rubriqueRepository;
    }

    /**
     * POST  /profils : Create a new profil.
     *
     * @param profil the profil to create
     * @return the ResponseEntity with status 201 (Created) and with body the new profil, or with status 400 (Bad Request) if the profil has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/profils")
    public ResponseEntity<Profil> createProfil(@RequestBody Profil profil) throws URISyntaxException {
        log.debug("REST request to save Profil : {}", profil);
        if (profil.getId() != null) {
            throw new BadRequestAlertException("A new profil cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Profil result = profilRepository.save(profil);
        return ResponseEntity.created(new URI("/api/profils/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /profils : Updates an existing profil.
     *
     * @param profil the profil to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated profil,
     * or with status 400 (Bad Request) if the profil is not valid,
     * or with status 500 (Internal Server Error) if the profil couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/profils")
    public ResponseEntity<Profil> updateProfil(@RequestBody Profil profil) throws URISyntaxException {
        log.debug("REST request to update Profil : {}", profil);
        if (profil.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Profil result = profilRepository.save(profil);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, profil.getId().toString()))
            .body(result);
    }

    /**
     * GET  /profils : get all the profils.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of profils in body
     */
    @GetMapping("/profils")
    public ResponseEntity<List<Profil>> getAllProfils(Pageable pageable) {
        log.debug("REST request to get a page of Profils");
        Page<Profil> page = profilRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/profils");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /profils/:id : get the "id" profil.
     *
     * @param id the id of the profil to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the profil, or with status 404 (Not Found)
     */
    @GetMapping("/profils/{id}")
    public ResponseEntity<Profil> getProfil(@PathVariable Long id) {
        log.debug("REST request to get Profil : {}", id);
        Optional<Profil> profil = profilRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(profil);
    }

    /**
     * DELETE  /profils/:id : delete the "id" profil.
     *
     * @param id the id of the profil to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/profils/{id}")
    public ResponseEntity<Void> deleteProfil(@PathVariable Long id) {
        log.debug("REST request to delete Profil : {}", id);
        profilRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }



    @GetMapping("/allMenu")
    public List<Menu> allMenu() {
        return this.menuRepository.findAll();
    }
    @GetMapping("/allRubrique")
    public List<Rubrique> allRubrique() {
        return this.rubriqueRepository.findAll();
    }
    @GetMapping("/allModule")
    public List<Module> allModule() {
        return this.moduleRepository.findAll();
    }
    @GetMapping("/maxProfil")
    public Object[] maxProfil() {
        return this.profilRepository.maxProfil();
    }

    @GetMapping("/getModuleX/{id}")
    public List<Module> getModule(@PathVariable Long id) {

        return profilRepository.getModuleByProfil(id);
    }
    @GetMapping("/getMenuX/{id}")
    public List<Menu> getMenu(@PathVariable Long id) {

        return profilRepository.getMenuByProfil(id);
    }
    @GetMapping("/getRubriqueX/{id}")
    public List<Rubrique> getRubrique(@PathVariable Long id) {

        return profilRepository.getRubriqueByProfil(id);
    }

    @GetMapping("/getallModuleX/{id}")
    public List<Module> getallModuleX(@PathVariable Long id) {

        return profilRepository.getAllModule(id);
    }
    @GetMapping("/getallRubriqueX/{id}")
    public List<Rubrique> getallRubriqueX(@PathVariable Long id) {

        return profilRepository.getAllRubrique(id);
    }
    @GetMapping("/getallMenuX/{id}")
    public List<Menu> getallMenuX(@PathVariable Long id) {

        return profilRepository.getAllMenu(id);
    }

}
