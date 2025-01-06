package org.yescola.gestion.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Module.
 */
@Entity
@Table(name = "module")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Module implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "libelle_module")
    private String libelleModule;

    @Column(name = "logo_module")
    private String logoModule;

    @Column(name = "etat_module")
    private Integer etatModule;

    @Column(name = "rang")
    private Integer rang;

    @OneToMany(mappedBy = "module")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Rubrique> rubriques = new HashSet<>();
    @OneToMany(mappedBy = "module")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ProfilModule> profilModules = new HashSet<>();
    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "module_site",
               joinColumns = @JoinColumn(name = "module_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "site_id", referencedColumnName = "id"))
    private Set<Site> sites = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelleModule() {
        return libelleModule;
    }

    public Module libelleModule(String libelleModule) {
        this.libelleModule = libelleModule;
        return this;
    }

    public void setLibelleModule(String libelleModule) {
        this.libelleModule = libelleModule;
    }

    public String getLogoModule() {
        return logoModule;
    }

    public Module logoModule(String logoModule) {
        this.logoModule = logoModule;
        return this;
    }

    public void setLogoModule(String logoModule) {
        this.logoModule = logoModule;
    }

    public Integer getEtatModule() {
        return etatModule;
    }

    public Module etatModule(Integer etatModule) {
        this.etatModule = etatModule;
        return this;
    }

    public void setEtatModule(Integer etatModule) {
        this.etatModule = etatModule;
    }

    public Integer getRang() {
        return rang;
    }

    public Module rang(Integer rang) {
        this.rang = rang;
        return this;
    }

    public void setRang(Integer rang) {
        this.rang = rang;
    }

    public Set<Rubrique> getRubriques() {
        return rubriques;
    }

    public Module rubriques(Set<Rubrique> rubriques) {
        this.rubriques = rubriques;
        return this;
    }

    public Module addRubrique(Rubrique rubrique) {
        this.rubriques.add(rubrique);
        rubrique.setModule(this);
        return this;
    }

    public Module removeRubrique(Rubrique rubrique) {
        this.rubriques.remove(rubrique);
        rubrique.setModule(null);
        return this;
    }

    public void setRubriques(Set<Rubrique> rubriques) {
        this.rubriques = rubriques;
    }

    public Set<ProfilModule> getProfilModules() {
        return profilModules;
    }

    public Module profilModules(Set<ProfilModule> profilModules) {
        this.profilModules = profilModules;
        return this;
    }

    public Module addProfilModule(ProfilModule profilModule) {
        this.profilModules.add(profilModule);
        profilModule.setModule(this);
        return this;
    }

    public Module removeProfilModule(ProfilModule profilModule) {
        this.profilModules.remove(profilModule);
        profilModule.setModule(null);
        return this;
    }

    public void setProfilModules(Set<ProfilModule> profilModules) {
        this.profilModules = profilModules;
    }

    public Set<Site> getSites() {
        return sites;
    }

    public Module sites(Set<Site> sites) {
        this.sites = sites;
        return this;
    }

    public Module addSite(Site site) {
        this.sites.add(site);
        site.getModules().add(this);
        return this;
    }

    public Module removeSite(Site site) {
        this.sites.remove(site);
        site.getModules().remove(this);
        return this;
    }

    public void setSites(Set<Site> sites) {
        this.sites = sites;
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
        Module module = (Module) o;
        if (module.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), module.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Module{" +
            "id=" + getId() +
            ", libelleModule='" + getLibelleModule() + "'" +
            ", logoModule='" + getLogoModule() + "'" +
            ", etatModule=" + getEtatModule() +
            ", rang=" + getRang() +
            "}";
    }
}
