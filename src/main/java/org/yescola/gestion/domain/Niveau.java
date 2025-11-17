package org.yescola.gestion.domain;


import jakarta.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Niveau.
 */
@Entity
@Table(name = "niveau")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Niveau implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "libelle")
    private String libelle;

    @Column(name = "description")
    private String description;

    @Column(name = "etat")
    private Boolean etat;

    @Column(name = "encours")
    private Boolean encours;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "niveau_type_document",
               joinColumns = @JoinColumn(name = "niveau_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "type_document_id", referencedColumnName = "id"))
    private Set<TypeDocument> typeDocuments = new HashSet<>();

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

    public Niveau libelle(String libelle) {
        this.libelle = libelle;
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getDescription() {
        return description;
    }

    public Niveau description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean isEtat() {
        return etat;
    }

    public Niveau etat(Boolean etat) {
        this.etat = etat;
        return this;
    }

    public void setEtat(Boolean etat) {
        this.etat = etat;
    }

    public Boolean isEncours() {
        return encours;
    }

    public Niveau encours(Boolean encours) {
        this.encours = encours;
        return this;
    }

    public void setEncours(Boolean encours) {
        this.encours = encours;
    }

    public Set<TypeDocument> getTypeDocuments() {
        return typeDocuments;
    }

    public Niveau typeDocuments(Set<TypeDocument> typeDocuments) {
        this.typeDocuments = typeDocuments;
        return this;
    }


    public void setTypeDocuments(Set<TypeDocument> typeDocuments) {
        this.typeDocuments = typeDocuments;
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
        Niveau niveau = (Niveau) o;
        if (niveau.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), niveau.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Niveau{" +
            "id=" + getId() +
            ", libelle='" + getLibelle() + "'" +
            ", description='" + getDescription() + "'" +
            ", etat='" + isEtat() + "'" +
            ", encours='" + isEncours() + "'" +
            "}";
    }
}
