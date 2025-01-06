package org.yescola.gestion.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ProfilMenu.
 */
@Entity
@Table(name = "profil_menu")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProfilMenu implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "voir")
    private Integer voir;

    @Column(name = "ajouter")
    private Integer ajouter;

    @Column(name = "supprimer")
    private Integer supprimer;

    @Column(name = "modifier")
    private Integer modifier;

    @Column(name = "imprimer")
    private Integer imprimer;

    @ManyToOne
    @JsonIgnoreProperties()
    private Profil profil;

    @ManyToOne
    @JsonIgnoreProperties()
    private Menu menu;

    @ManyToOne
    @JsonIgnoreProperties()
    private RubriqueProfil rubriqueProfil;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getVoir() {
        return voir;
    }

    public ProfilMenu voir(Integer voir) {
        this.voir = voir;
        return this;
    }

    public void setVoir(Integer voir) {
        this.voir = voir;
    }

    public Integer getAjouter() {
        return ajouter;
    }

    public ProfilMenu ajouter(Integer ajouter) {
        this.ajouter = ajouter;
        return this;
    }

    public void setAjouter(Integer ajouter) {
        this.ajouter = ajouter;
    }

    public Integer getSupprimer() {
        return supprimer;
    }

    public ProfilMenu supprimer(Integer supprimer) {
        this.supprimer = supprimer;
        return this;
    }

    public void setSupprimer(Integer supprimer) {
        this.supprimer = supprimer;
    }

    public Integer getModifier() {
        return modifier;
    }

    public ProfilMenu modifier(Integer modifier) {
        this.modifier = modifier;
        return this;
    }

    public void setModifier(Integer modifier) {
        this.modifier = modifier;
    }

    public Integer getImprimer() {
        return imprimer;
    }

    public ProfilMenu imprimer(Integer imprimer) {
        this.imprimer = imprimer;
        return this;
    }

    public void setImprimer(Integer imprimer) {
        this.imprimer = imprimer;
    }

    public Profil getProfil() {
        return profil;
    }

    public ProfilMenu profil(Profil profil) {
        this.profil = profil;
        return this;
    }

    public void setProfil(Profil profil) {
        this.profil = profil;
    }

    public Menu getMenu() {
        return menu;
    }

    public ProfilMenu menu(Menu menu) {
        this.menu = menu;
        return this;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }

    public RubriqueProfil getRubriqueProfil() {
        return rubriqueProfil;
    }

    public ProfilMenu rubriqueProfil(RubriqueProfil rubriqueProfil) {
        this.rubriqueProfil = rubriqueProfil;
        return this;
    }

    public void setRubriqueProfil(RubriqueProfil rubriqueProfil) {
        this.rubriqueProfil = rubriqueProfil;
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
        ProfilMenu profilMenu = (ProfilMenu) o;
        if (profilMenu.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), profilMenu.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProfilMenu{" +
            "id=" + getId() +
            ", voir=" + getVoir() +
            ", ajouter=" + getAjouter() +
            ", supprimer=" + getSupprimer() +
            ", modifier=" + getModifier() +
            ", imprimer=" + getImprimer() +
            "}";
    }
}
