package org.yescola.gestion.web.rest;

import org.yescola.gestion.GestionEcoleApp;

import org.yescola.gestion.domain.Menu;
import org.yescola.gestion.repository.MenuRepository;
import org.yescola.gestion.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static org.yescola.gestion.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MenuResource REST controller.
 *
 * @see MenuResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionEcoleApp.class)
public class MenuResourceIntTest {

    private static final String DEFAULT_CODE_MENU = "AAAAAAAAAA";
    private static final String UPDATED_CODE_MENU = "BBBBBBBBBB";

    private static final String DEFAULT_LIBELLE_MENU = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE_MENU = "BBBBBBBBBB";

    private static final String DEFAULT_RANG_MENU = "AAAAAAAAAA";
    private static final String UPDATED_RANG_MENU = "BBBBBBBBBB";

    private static final String DEFAULT_URL_MENU = "AAAAAAAAAA";
    private static final String UPDATED_URL_MENU = "BBBBBBBBBB";

    private static final String DEFAULT_ICONE_MENU = "AAAAAAAAAA";
    private static final String UPDATED_ICONE_MENU = "BBBBBBBBBB";

    private static final Integer DEFAULT_ETAT_MENU = 1;
    private static final Integer UPDATED_ETAT_MENU = 2;

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restMenuMockMvc;

    private Menu menu;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MenuResource menuResource = new MenuResource(menuRepository);
        this.restMenuMockMvc = MockMvcBuilders.standaloneSetup(menuResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Menu createEntity(EntityManager em) {
        Menu menu = new Menu()
            .codeMenu(DEFAULT_CODE_MENU)
            .libelleMenu(DEFAULT_LIBELLE_MENU)
            .rangMenu(DEFAULT_RANG_MENU)
            .urlMenu(DEFAULT_URL_MENU)
            .iconeMenu(DEFAULT_ICONE_MENU)
            .etatMenu(DEFAULT_ETAT_MENU);
        return menu;
    }

    @Before
    public void initTest() {
        menu = createEntity(em);
    }

    @Test
    @Transactional
    public void createMenu() throws Exception {
        int databaseSizeBeforeCreate = menuRepository.findAll().size();

        // Create the Menu
        restMenuMockMvc.perform(post("/api/menus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(menu)))
            .andExpect(status().isCreated());

        // Validate the Menu in the database
        List<Menu> menuList = menuRepository.findAll();
        assertThat(menuList).hasSize(databaseSizeBeforeCreate + 1);
        Menu testMenu = menuList.get(menuList.size() - 1);
        assertThat(testMenu.getCodeMenu()).isEqualTo(DEFAULT_CODE_MENU);
        assertThat(testMenu.getLibelleMenu()).isEqualTo(DEFAULT_LIBELLE_MENU);
        assertThat(testMenu.getRangMenu()).isEqualTo(DEFAULT_RANG_MENU);
        assertThat(testMenu.getUrlMenu()).isEqualTo(DEFAULT_URL_MENU);
        assertThat(testMenu.getIconeMenu()).isEqualTo(DEFAULT_ICONE_MENU);
        assertThat(testMenu.getEtatMenu()).isEqualTo(DEFAULT_ETAT_MENU);
    }

    @Test
    @Transactional
    public void createMenuWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = menuRepository.findAll().size();

        // Create the Menu with an existing ID
        menu.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMenuMockMvc.perform(post("/api/menus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(menu)))
            .andExpect(status().isBadRequest());

        // Validate the Menu in the database
        List<Menu> menuList = menuRepository.findAll();
        assertThat(menuList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMenus() throws Exception {
        // Initialize the database
        menuRepository.saveAndFlush(menu);

        // Get all the menuList
        restMenuMockMvc.perform(get("/api/menus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(menu.getId().intValue())))
            .andExpect(jsonPath("$.[*].codeMenu").value(hasItem(DEFAULT_CODE_MENU.toString())))
            .andExpect(jsonPath("$.[*].libelleMenu").value(hasItem(DEFAULT_LIBELLE_MENU.toString())))
            .andExpect(jsonPath("$.[*].rangMenu").value(hasItem(DEFAULT_RANG_MENU.toString())))
            .andExpect(jsonPath("$.[*].urlMenu").value(hasItem(DEFAULT_URL_MENU.toString())))
            .andExpect(jsonPath("$.[*].iconeMenu").value(hasItem(DEFAULT_ICONE_MENU.toString())))
            .andExpect(jsonPath("$.[*].etatMenu").value(hasItem(DEFAULT_ETAT_MENU)));
    }
    
    @Test
    @Transactional
    public void getMenu() throws Exception {
        // Initialize the database
        menuRepository.saveAndFlush(menu);

        // Get the menu
        restMenuMockMvc.perform(get("/api/menus/{id}", menu.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(menu.getId().intValue()))
            .andExpect(jsonPath("$.codeMenu").value(DEFAULT_CODE_MENU.toString()))
            .andExpect(jsonPath("$.libelleMenu").value(DEFAULT_LIBELLE_MENU.toString()))
            .andExpect(jsonPath("$.rangMenu").value(DEFAULT_RANG_MENU.toString()))
            .andExpect(jsonPath("$.urlMenu").value(DEFAULT_URL_MENU.toString()))
            .andExpect(jsonPath("$.iconeMenu").value(DEFAULT_ICONE_MENU.toString()))
            .andExpect(jsonPath("$.etatMenu").value(DEFAULT_ETAT_MENU));
    }

    @Test
    @Transactional
    public void getNonExistingMenu() throws Exception {
        // Get the menu
        restMenuMockMvc.perform(get("/api/menus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMenu() throws Exception {
        // Initialize the database
        menuRepository.saveAndFlush(menu);

        int databaseSizeBeforeUpdate = menuRepository.findAll().size();

        // Update the menu
        Menu updatedMenu = menuRepository.findById(menu.getId()).get();
        // Disconnect from session so that the updates on updatedMenu are not directly saved in db
        em.detach(updatedMenu);
        updatedMenu
            .codeMenu(UPDATED_CODE_MENU)
            .libelleMenu(UPDATED_LIBELLE_MENU)
            .rangMenu(UPDATED_RANG_MENU)
            .urlMenu(UPDATED_URL_MENU)
            .iconeMenu(UPDATED_ICONE_MENU)
            .etatMenu(UPDATED_ETAT_MENU);

        restMenuMockMvc.perform(put("/api/menus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMenu)))
            .andExpect(status().isOk());

        // Validate the Menu in the database
        List<Menu> menuList = menuRepository.findAll();
        assertThat(menuList).hasSize(databaseSizeBeforeUpdate);
        Menu testMenu = menuList.get(menuList.size() - 1);
        assertThat(testMenu.getCodeMenu()).isEqualTo(UPDATED_CODE_MENU);
        assertThat(testMenu.getLibelleMenu()).isEqualTo(UPDATED_LIBELLE_MENU);
        assertThat(testMenu.getRangMenu()).isEqualTo(UPDATED_RANG_MENU);
        assertThat(testMenu.getUrlMenu()).isEqualTo(UPDATED_URL_MENU);
        assertThat(testMenu.getIconeMenu()).isEqualTo(UPDATED_ICONE_MENU);
        assertThat(testMenu.getEtatMenu()).isEqualTo(UPDATED_ETAT_MENU);
    }

    @Test
    @Transactional
    public void updateNonExistingMenu() throws Exception {
        int databaseSizeBeforeUpdate = menuRepository.findAll().size();

        // Create the Menu

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMenuMockMvc.perform(put("/api/menus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(menu)))
            .andExpect(status().isBadRequest());

        // Validate the Menu in the database
        List<Menu> menuList = menuRepository.findAll();
        assertThat(menuList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMenu() throws Exception {
        // Initialize the database
        menuRepository.saveAndFlush(menu);

        int databaseSizeBeforeDelete = menuRepository.findAll().size();

        // Delete the menu
        restMenuMockMvc.perform(delete("/api/menus/{id}", menu.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Menu> menuList = menuRepository.findAll();
        assertThat(menuList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Menu.class);
        Menu menu1 = new Menu();
        menu1.setId(1L);
        Menu menu2 = new Menu();
        menu2.setId(menu1.getId());
        assertThat(menu1).isEqualTo(menu2);
        menu2.setId(2L);
        assertThat(menu1).isNotEqualTo(menu2);
        menu1.setId(null);
        assertThat(menu1).isNotEqualTo(menu2);
    }
}
