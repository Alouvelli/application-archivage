package org.yescola.gestion.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "module_site")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Module_site implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "module_id",nullable = false)
    private Long moduleId;

    @Id
    @Column(name = "site_id",nullable = false)
    private Long siteId;


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getModuleId() {

        return  this.moduleId;
    }
    public Long getSiteId() {

        return  this.siteId;
    }
    public void setModuleId(Long moduleId) {
        this.moduleId =moduleId;
    }

    public void setSiteId(Long siteId) {
        this.siteId = siteId;
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
        Module_site boutique_route = (Module_site) o;
        if (boutique_route.getModuleId()== null || getModuleId() == null) {
            return false;
        }
        return Objects.equals(getModuleId(), boutique_route.getModuleId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getModuleId());
    }

    @Override
    public String toString() {
        return "Article{" +
            "boutiqueId=" + getModuleId() +
            ", routeId='" + getSiteId() + "'" +
            "}";
    }
}
