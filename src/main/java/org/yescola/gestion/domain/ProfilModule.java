package org.yescola.gestion.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ProfilModule.
 */
@Entity
@Table(name = "profil_module")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProfilModule implements Serializable {

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
    private Module module;

    @ManyToOne
    @JsonIgnoreProperties()
    private SiteProfil siteProfil;

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

    public ProfilModule encours(Boolean encours) {
        this.encours = encours;
        return this;
    }

    public void setEncours(Boolean encours) {
        this.encours = encours;
    }

    public Profil getProfil() {
        return profil;
    }

    public ProfilModule profil(Profil profil) {
        this.profil = profil;
        return this;
    }

    public void setProfil(Profil profil) {
        this.profil = profil;
    }

    public Module getModule() {
        return module;
    }

    public ProfilModule module(Module module) {
        this.module = module;
        return this;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public SiteProfil getSiteProfil() {
        return siteProfil;
    }

    public ProfilModule siteProfil(SiteProfil siteProfil) {
        this.siteProfil = siteProfil;
        return this;
    }

    public void setSiteProfil(SiteProfil siteProfil) {
        this.siteProfil = siteProfil;
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
        ProfilModule profilModule = (ProfilModule) o;
        if (profilModule.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), profilModule.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProfilModule{" +
            "id=" + getId() +
            ", encours='" + isEncours() + "'" +
            "}";
    }
}
