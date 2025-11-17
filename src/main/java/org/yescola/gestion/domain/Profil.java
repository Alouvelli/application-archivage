package org.yescola.gestion.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Profil.
 */
@Entity
@Table(name = "profil")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Profil implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "etat_profil")
    private Integer etatProfil;

    @Column(name = "libelle_profil")
    private String libelleProfil;

    @ManyToOne
    @JsonIgnoreProperties("profils")
    private Ecole ecole;

    @ManyToOne
    @JsonIgnoreProperties("profils")
    private Site site;

    @OneToMany(mappedBy = "profil")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Employe> employes = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getEtatProfil() {
        return etatProfil;
    }

    public Profil etatProfil(Integer etatProfil) {
        this.etatProfil = etatProfil;
        return this;
    }

    public void setEtatProfil(Integer etatProfil) {
        this.etatProfil = etatProfil;
    }

    public String getLibelleProfil() {
        return libelleProfil;
    }

    public Profil libelleProfil(String libelleProfil) {
        this.libelleProfil = libelleProfil;
        return this;
    }

    public void setLibelleProfil(String libelleProfil) {
        this.libelleProfil = libelleProfil;
    }

    public Ecole getEcole() {
        return ecole;
    }

    public Profil ecole(Ecole ecole) {
        this.ecole = ecole;
        return this;
    }

    public void setEcole(Ecole ecole) {
        this.ecole = ecole;
    }

    public Site getSite() {
        return site;
    }

    public Profil site(Site site) {
        this.site = site;
        return this;
    }

    public void setSite(Site site) {
        this.site = site;
    }

    public Set<Employe> getEmployes() {
        return employes;
    }

    public Profil employes(Set<Employe> employes) {
        this.employes = employes;
        return this;
    }

    public Profil addEmploye(Employe employe) {
        this.employes.add(employe);
        employe.setProfil(this);
        return this;
    }

    public Profil removeEmploye(Employe employe) {
        this.employes.remove(employe);
        employe.setProfil(null);
        return this;
    }

    public void setEmployes(Set<Employe> employes) {
        this.employes = employes;
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
        Profil profil = (Profil) o;
        if (profil.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), profil.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Profil{" +
            "id=" + getId() +
            ", etatProfil=" + getEtatProfil() +
            ", libelleProfil='" + getLibelleProfil() + "'" +
            "}";
    }
}
