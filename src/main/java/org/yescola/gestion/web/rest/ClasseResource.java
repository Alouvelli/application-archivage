package org.yescola.gestion.web.rest;

import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.yescola.gestion.domain.Classe;
import org.yescola.gestion.repository.ClasseRepository;
import org.yescola.gestion.repository.NiveauRepository;
import org.yescola.gestion.web.rest.errors.BadRequestAlertException;
import org.yescola.gestion.web.rest.util.HeaderUtil;
import org.yescola.gestion.web.rest.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Classe.
 */
@RestController
@RequestMapping("/api")
public class ClasseResource {

    private final Logger log = LoggerFactory.getLogger(ClasseResource.class);

    private static final String ENTITY_NAME = "classe";

    private final ClasseRepository classeRepository;
    private final NiveauRepository niveauRepository;

    public ClasseResource(ClasseRepository classeRepository, NiveauRepository niveauRepository) {
        this.classeRepository = classeRepository;
        this.niveauRepository = niveauRepository;
    }

    /**
     * POST  /classes : Create a new classe.
     *
     * @param classe the classe to create
     * @return the ResponseEntity with status 201 (Created) and with body the new classe, or with status 400 (Bad Request) if the classe has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/classes")
    public ResponseEntity<Classe> createClasse(@Valid @RequestBody Classe classe) throws URISyntaxException {
        log.debug("REST request to save Classe : {}", classe);
        if (classe.getId() != null) {
            throw new BadRequestAlertException("A new classe cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Classe result = classeRepository.save(classe);
        return ResponseEntity.created(new URI("/api/classes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /classes : Updates an existing classe.
     *
     * @param classe the classe to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated classe,
     * or with status 400 (Bad Request) if the classe is not valid,
     * or with status 500 (Internal Server Error) if the classe couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/classes")
    public ResponseEntity<Classe> updateClasse(@Valid @RequestBody Classe classe) throws URISyntaxException {
        log.debug("REST request to update Classe : {}", classe);
        if (classe.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Classe result = classeRepository.save(classe);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, classe.getId().toString()))
            .body(result);
    }

    /**
     * GET  /classes : get all the classes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of classes in body
     */
    @GetMapping("/classes")
    public ResponseEntity<List<Classe>> getAllClasses(Pageable pageable) {
        log.debug("REST request to get a page of Classes");
        Page<Classe> page = classeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/classes");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /classes/:id : get the "id" classe.
     *
     * @param id the id of the classe to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the classe, or with status 404 (Not Found)
     */
    @GetMapping("/classes/{id}")
    public ResponseEntity<Classe> getClasse(@PathVariable Long id) {
        log.debug("REST request to get Classe : {}", id);
        Optional<Classe> classe = classeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(classe);
    }

    /**
     * DELETE  /classes/:id : delete the "id" classe.
     *
     * @param id the id of the classe to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/classes/{id}")
    public ResponseEntity<Void> deleteClasse(@PathVariable Long id) {
        log.debug("REST request to delete Classe : {}", id);
        classeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/allClasse")
    public List<Classe> allClasse() {
         List<Classe> classe = classeRepository.findAll();
        for (Classe c:
             classe ){

           c.getNiveau().setTypeDocuments( this.niveauRepository.typedocByIdNiv(c.getNiveau().getId()));

        }

        return classe;
    }
    @GetMapping("/findclasseById/{id}")
    public List<Classe> findclasseById(@PathVariable Long id) {

        List<Classe> classe = classeRepository.findClasseByID(id);
        return classe;
    }

}
