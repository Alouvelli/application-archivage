package org.yescola.gestion.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.yescola.gestion.domain.Module;
import org.yescola.gestion.domain.Rubrique;
import org.yescola.gestion.repository.ModuleRepository;
import org.yescola.gestion.web.rest.errors.BadRequestAlertException;
import org.yescola.gestion.web.rest.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Module.
 */
@RestController
@RequestMapping("/api")
public class ModuleResource {

    private final Logger log = LoggerFactory.getLogger(ModuleResource.class);

    private static final String ENTITY_NAME = "module";

    private final ModuleRepository moduleRepository;

    public ModuleResource(ModuleRepository moduleRepository) {
        this.moduleRepository = moduleRepository;
    }

    /**
     * POST  /modules : Create a new module.
     *
     * @param module the module to create
     * @return the ResponseEntity with status 201 (Created) and with body the new module, or with status 400 (Bad Request) if the module has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/modules")
    public ResponseEntity<Module> createModule(@RequestBody Module module) throws URISyntaxException {
        log.debug("REST request to save Module : {}", module);
        if (module.getId() != null) {
            throw new BadRequestAlertException("A new module cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Module result = moduleRepository.save(module);
        return ResponseEntity.created(new URI("/api/modules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /modules : Updates an existing module.
     *
     * @param module the module to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated module,
     * or with status 400 (Bad Request) if the module is not valid,
     * or with status 500 (Internal Server Error) if the module couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/modules")
    public ResponseEntity<Module> updateModule(@RequestBody Module module) throws URISyntaxException {
        log.debug("REST request to update Module : {}", module);
        if (module.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Module result = moduleRepository.save(module);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, module.getId().toString()))
            .body(result);
    }

    /**
     * GET  /modules : get all the modules.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of modules in body
     */
    @GetMapping("/modules")
    public List<Module> getAllModules(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Modules");
        return moduleRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /modules/:id : get the "id" module.
     *
     * @param id the id of the module to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the module, or with status 404 (Not Found)
     */
    @GetMapping("/modules/{id}")
    public ResponseEntity<Module> getModule(@PathVariable Long id) {
        log.debug("REST request to get Module : {}", id);
        Optional<Module> module = moduleRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(module);
    }

    /**
     * DELETE  /modules/:id : delete the "id" module.
     *
     * @param id the id of the module to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/modules/{id}")
    public ResponseEntity<Void> deleteModule(@PathVariable Long id) {
        log.debug("REST request to delete Module : {}", id);
        moduleRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    @GetMapping("/getRubriques/{id}")
    public List<Rubrique> getRubriques(@PathVariable Long id){

        return moduleRepository.findRubrique(id);
    }
}
