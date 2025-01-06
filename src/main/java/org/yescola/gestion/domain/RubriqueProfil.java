package org.yescola.gestion.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A RubriqueProfil.
 */
@Entity
@Table(name = "rubrique_profil")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RubriqueProfil implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "encours")
    private Boolean encours;

    @ManyToOne
    @JsonIgnoreProperties()
    private Profil profil;

    @ManyToOne
    @JsonIgnoreProperties()
    private Rubrique rubrique;

    @ManyToOne
    @JsonIgnoreProperties()
    private ProfilModule profilModule;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isEncours() {
        return encours;
    }

    public RubriqueProfil encours(Boolean encours) {
        this.encours = encours;
        return this;
    }

    public void setEncours(Boolean encours) {
        this.encours = encours;
    }

    public Profil getProfil() {
        return profil;
    }

    public RubriqueProfil profil(Profil profil) {
        this.profil = profil;
        return this;
    }

    public void setProfil(Profil profil) {
        this.profil = profil;
    }

    public Rubrique getRubrique() {
        return rubrique;
    }

    public RubriqueProfil rubrique(Rubrique rubrique) {
        this.rubrique = rubrique;
        return this;
    }

    public void setRubrique(Rubrique rubrique) {
        this.rubrique = rubrique;
    }

    public ProfilModule getProfilModule() {
        return profilModule;
    }

    public RubriqueProfil profilModule(ProfilModule profilModule) {
        this.profilModule = profilModule;
        return this;
    }

    public void setProfilModule(ProfilModule profilModule) {
        this.profilModule = profilModule;
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
        RubriqueProfil rubriqueProfil = (RubriqueProfil) o;
        if (rubriqueProfil.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), rubriqueProfil.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RubriqueProfil{" +
            "id=" + getId() +
            ", encours='" + isEncours() + "'" +
            "}";
    }
}
