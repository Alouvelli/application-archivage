package org.yescola.gestion.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Inscription.
 */
@Entity
@Table(name = "inscription")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Inscription implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Column(name = "manquant")
    private Boolean manquant;

    @ManyToOne
    @JsonIgnoreProperties("inscriptions")
    private Etudiant etudiant;

    @ManyToOne
    @JsonIgnoreProperties("inscriptions")
    private Classe classe;

    @ManyToOne
    @JsonIgnoreProperties("inscriptions")
    private Anneescolaire anneescolaire;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "inscription_document",
               joinColumns = @JoinColumn(name = "inscription_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "document_id", referencedColumnName = "id"))
    private Set<Document> documents = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public Inscription date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Boolean isManquant() {
        return manquant;
    }

    public Inscription manquant(Boolean manquant) {
        this.manquant = manquant;
        return this;
    }

    public void setManquant(Boolean manquant) {
        this.manquant = manquant;
    }

    public Etudiant getEtudiant() {
        return etudiant;
    }

    public Inscription etudiant(Etudiant etudiant) {
        this.etudiant = etudiant;
        return this;
    }

    public void setEtudiant(Etudiant etudiant) {
        this.etudiant = etudiant;
    }

    public Classe getClasse() {
        return classe;
    }

    public Inscription classe(Classe classe) {
        this.classe = classe;
        return this;
    }

    public void setClasse(Classe classe) {
        this.classe = classe;
    }

    public Anneescolaire getAnneescolaire() {
        return anneescolaire;
    }

    public Inscription anneescolaire(Anneescolaire anneescolaire) {
        this.anneescolaire = anneescolaire;
        return this;
    }

    public void setAnneescolaire(Anneescolaire anneescolaire) {
        this.anneescolaire = anneescolaire;
    }

    public Set<Document> getDocuments() {
        return documents;
    }

    public Inscription documents(Set<Document> documents) {
        this.documents = documents;
        return this;
    }



    public void setDocuments(Set<Document> documents) {
        this.documents = documents;
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
        Inscription inscription = (Inscription) o;
        if (inscription.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), inscription.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Inscription{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", manquant='" + isManquant() + "'" +
            "}";
    }
}
