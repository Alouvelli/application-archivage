package org.yescola.gestion.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A SiteProfil.
 */
@Entity
@Table(name = "site_profil")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SiteProfil implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "encours")
    private Boolean encours;

    @ManyToOne
    private Site site;

    @ManyToOne
    private Profil profil;

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

    public SiteProfil encours(Boolean encours) {
        this.encours = encours;
        return this;
    }

    public void setEncours(Boolean encours) {
        this.encours = encours;
    }

    public Site getSite() {
        return site;
    }

    public SiteProfil site(Site site) {
        this.site = site;
        return this;
    }

    public void setSite(Site site) {
        this.site = site;
    }

    public Profil getProfil() {
        return profil;
    }

    public SiteProfil profil(Profil profil) {
        this.profil = profil;
        return this;
    }

    public void setProfil(Profil profil) {
        this.profil = profil;
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
        SiteProfil siteProfil = (SiteProfil) o;
        if (siteProfil.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), siteProfil.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SiteProfil{" +
            "id=" + getId() +
            ", encours='" + isEncours() + "'" +
            "}";
    }
}
