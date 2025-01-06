package org.yescola.gestion.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Menu.
 */
@Entity
@Table(name = "menu")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Menu implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code_menu")
    private String codeMenu;

    @Column(name = "libelle_menu")
    private String libelleMenu;

    @Column(name = "rang_menu")
    private String rangMenu;

    @Column(name = "url_menu")
    private String urlMenu;

    @Column(name = "icone_menu")
    private String iconeMenu;

    @Column(name = "etat_menu")
    private Integer etatMenu;

    @OneToMany(mappedBy = "menu")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ProfilMenu> profilMenus = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("menus")
    private Rubrique rubrique;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeMenu() {
        return codeMenu;
    }

    public Menu codeMenu(String codeMenu) {
        this.codeMenu = codeMenu;
        return this;
    }

    public void setCodeMenu(String codeMenu) {
        this.codeMenu = codeMenu;
    }

    public String getLibelleMenu() {
        return libelleMenu;
    }

    public Menu libelleMenu(String libelleMenu) {
        this.libelleMenu = libelleMenu;
        return this;
    }

    public void setLibelleMenu(String libelleMenu) {
        this.libelleMenu = libelleMenu;
    }

    public String getRangMenu() {
        return rangMenu;
    }

    public Menu rangMenu(String rangMenu) {
        this.rangMenu = rangMenu;
        return this;
    }

    public void setRangMenu(String rangMenu) {
        this.rangMenu = rangMenu;
    }

    public String getUrlMenu() {
        return urlMenu;
    }

    public Menu urlMenu(String urlMenu) {
        this.urlMenu = urlMenu;
        return this;
    }

    public void setUrlMenu(String urlMenu) {
        this.urlMenu = urlMenu;
    }

    public String getIconeMenu() {
        return iconeMenu;
    }

    public Menu iconeMenu(String iconeMenu) {
        this.iconeMenu = iconeMenu;
        return this;
    }

    public void setIconeMenu(String iconeMenu) {
        this.iconeMenu = iconeMenu;
    }

    public Integer getEtatMenu() {
        return etatMenu;
    }

    public Menu etatMenu(Integer etatMenu) {
        this.etatMenu = etatMenu;
        return this;
    }

    public void setEtatMenu(Integer etatMenu) {
        this.etatMenu = etatMenu;
    }

    public Set<ProfilMenu> getProfilMenus() {
        return profilMenus;
    }

    public Menu profilMenus(Set<ProfilMenu> profilMenus) {
        this.profilMenus = profilMenus;
        return this;
    }

    public Menu addProfilMenu(ProfilMenu profilMenu) {
        this.profilMenus.add(profilMenu);
        profilMenu.setMenu(this);
        return this;
    }

    public Menu removeProfilMenu(ProfilMenu profilMenu) {
        this.profilMenus.remove(profilMenu);
        profilMenu.setMenu(null);
        return this;
    }

    public void setProfilMenus(Set<ProfilMenu> profilMenus) {
        this.profilMenus = profilMenus;
    }

    public Rubrique getRubrique() {
        return rubrique;
    }

    public Menu rubrique(Rubrique rubrique) {
        this.rubrique = rubrique;
        return this;
    }

    public void setRubrique(Rubrique rubrique) {
        this.rubrique = rubrique;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Menu menu = (Menu) o;
        if (menu.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), menu.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Menu{" +
            "id=" + getId() +
            ", codeMenu='" + getCodeMenu() + "'" +
            ", libelleMenu='" + getLibelleMenu() + "'" +
            ", rangMenu='" + getRangMenu() + "'" +
            ", urlMenu='" + getUrlMenu() + "'" +
            ", iconeMenu='" + getIconeMenu() + "'" +
            ", etatMenu=" + getEtatMenu() +
            "}";
    }
}
