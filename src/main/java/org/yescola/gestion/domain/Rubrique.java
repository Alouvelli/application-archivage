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
 * A Rubrique.
 */
@Entity
@Table(name = "rubrique")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Rubrique implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "libelle_rubrique")
    private String libelleRubrique;

    @Column(name = "rang_rubrique")
    private String rangRubrique;

    @Column(name = "icone_rubrique")
    private String iconeRubrique;

    @Column(name = "etat_rubrique")
    private Integer etatRubrique;

    @Column(name = "rang")
    private Integer rang;

    @OneToMany(mappedBy = "rubrique")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Menu> menus = new HashSet<>();
    @OneToMany(mappedBy = "rubrique")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RubriqueProfil> rubriqueProfils = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("rubriques")
    private Module module;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelleRubrique() {
        return libelleRubrique;
    }

    public Rubrique libelleRubrique(String libelleRubrique) {
        this.libelleRubrique = libelleRubrique;
        return this;
    }

    public void setLibelleRubrique(String libelleRubrique) {
        this.libelleRubrique = libelleRubrique;
    }

    public String getRangRubrique() {
        return rangRubrique;
    }

    public Rubrique rangRubrique(String rangRubrique) {
        this.rangRubrique = rangRubrique;
        return this;
    }

    public void setRangRubrique(String rangRubrique) {
        this.rangRubrique = rangRubrique;
    }

    public String getIconeRubrique() {
        return iconeRubrique;
    }

    public Rubrique iconeRubrique(String iconeRubrique) {
        this.iconeRubrique = iconeRubrique;
        return this;
    }

    public void setIconeRubrique(String iconeRubrique) {
        this.iconeRubrique = iconeRubrique;
    }

    public Integer getEtatRubrique() {
        return etatRubrique;
    }

    public Rubrique etatRubrique(Integer etatRubrique) {
        this.etatRubrique = etatRubrique;
        return this;
    }

    public void setEtatRubrique(Integer etatRubrique) {
        this.etatRubrique = etatRubrique;
    }

    public Integer getRang() {
        return rang;
    }

    public Rubrique rang(Integer rang) {
        this.rang = rang;
        return this;
    }

    public void setRang(Integer rang) {
        this.rang = rang;
    }

    public Set<Menu> getMenus() {
        return menus;
    }

    public Rubrique menus(Set<Menu> menus) {
        this.menus = menus;
        return this;
    }

    public Rubrique addMenu(Menu menu) {
        this.menus.add(menu);
        menu.setRubrique(this);
        return this;
    }

    public Rubrique removeMenu(Menu menu) {
        this.menus.remove(menu);
        menu.setRubrique(null);
        return this;
    }

    public void setMenus(Set<Menu> menus) {
        this.menus = menus;
    }

    public Set<RubriqueProfil> getRubriqueProfils() {
        return rubriqueProfils;
    }

    public Rubrique rubriqueProfils(Set<RubriqueProfil> rubriqueProfils) {
        this.rubriqueProfils = rubriqueProfils;
        return this;
    }

    public Rubrique addRubriqueProfil(RubriqueProfil rubriqueProfil) {
        this.rubriqueProfils.add(rubriqueProfil);
        rubriqueProfil.setRubrique(this);
        return this;
    }

    public Rubrique removeRubriqueProfil(RubriqueProfil rubriqueProfil) {
        this.rubriqueProfils.remove(rubriqueProfil);
        rubriqueProfil.setRubrique(null);
        return this;
    }

    public void setRubriqueProfils(Set<RubriqueProfil> rubriqueProfils) {
        this.rubriqueProfils = rubriqueProfils;
    }

    public Module getModule() {
        return module;
    }

    public Rubrique module(Module module) {
        this.module = module;
        return this;
    }

    public void setModule(Module module) {
        this.module = module;
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
        Rubrique rubrique = (Rubrique) o;
        if (rubrique.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), rubrique.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Rubrique{" +
            "id=" + getId() +
            ", libelleRubrique='" + getLibelleRubrique() + "'" +
            ", rangRubrique='" + getRangRubrique() + "'" +
            ", iconeRubrique='" + getIconeRubrique() + "'" +
            ", etatRubrique=" + getEtatRubrique() +
            ", rang=" + getRang() +
            "}";
    }
}
