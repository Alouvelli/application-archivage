package org.yescola.gestion.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Anneescolaire.
 */
@Entity
@Table(name = "anneescolaire")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Anneescolaire implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "libelle")
    private String libelle;

    @Column(name = "encours")
    private String encours;

    @Column(name = "etat")
    private String etat;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public Anneescolaire libelle(String libelle) {
        this.libelle = libelle;
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getEncours() {
        return encours;
    }

    public Anneescolaire encours(String encours) {
        this.encours = encours;
        return this;
    }

    public void setEncours(String encours) {
        this.encours = encours;
    }

    public String getEtat() {
        return etat;
    }

    public Anneescolaire etat(String etat) {
        this.etat = etat;
        return this;
    }

    public void setEtat(String etat) {
        this.etat = etat;
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
        Anneescolaire anneescolaire = (Anneescolaire) o;
        if (anneescolaire.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), anneescolaire.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Anneescolaire{" +
            "id=" + getId() +
            ", libelle='" + getLibelle() + "'" +
            ", encours='" + getEncours() + "'" +
            ", etat='" + getEtat() + "'" +
            "}";
    }
}
