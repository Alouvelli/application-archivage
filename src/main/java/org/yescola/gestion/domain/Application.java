package org.yescola.gestion.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Application.
 */
@Entity
@Table(name = "application")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Application implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom_application")
    private String nomApplication;

    @Column(name = "version_application")
    private String versionApplication;

    @Column(name = "logo_application")
    private String logoApplication;

    @Column(name = "cout_application")
    private String coutApplication;

    @Column(name = "date_vente")
    private LocalDate dateVente;

    @Column(name = "maintenance")
    private Integer maintenance;

    @Column(name = "contrat_maintenance")
    private String contratMaintenance;

    @Column(name = "date_debut")
    private LocalDate dateDebut;

    @Column(name = "date_fin")
    private LocalDate dateFin;

    @Column(name = "etat_application")
    private Integer etatApplication;

    @OneToOne(mappedBy = "application")
    @JsonIgnore
    private Ecole ecole;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomApplication() {
        return nomApplication;
    }

    public Application nomApplication(String nomApplication) {
        this.nomApplication = nomApplication;
        return this;
    }

    public void setNomApplication(String nomApplication) {
        this.nomApplication = nomApplication;
    }

    public String getVersionApplication() {
        return versionApplication;
    }

    public Application versionApplication(String versionApplication) {
        this.versionApplication = versionApplication;
        return this;
    }

    public void setVersionApplication(String versionApplication) {
        this.versionApplication = versionApplication;
    }

    public String getLogoApplication() {
        return logoApplication;
    }

    public Application logoApplication(String logoApplication) {
        this.logoApplication = logoApplication;
        return this;
    }

    public void setLogoApplication(String logoApplication) {
        this.logoApplication = logoApplication;
    }

    public String getCoutApplication() {
        return coutApplication;
    }

    public Application coutApplication(String coutApplication) {
        this.coutApplication = coutApplication;
        return this;
    }

    public void setCoutApplication(String coutApplication) {
        this.coutApplication = coutApplication;
    }

    public LocalDate getDateVente() {
        return dateVente;
    }

    public Application dateVente(LocalDate dateVente) {
        this.dateVente = dateVente;
        return this;
    }

    public void setDateVente(LocalDate dateVente) {
        this.dateVente = dateVente;
    }

    public Integer getMaintenance() {
        return maintenance;
    }

    public Application maintenance(Integer maintenance) {
        this.maintenance = maintenance;
        return this;
    }

    public void setMaintenance(Integer maintenance) {
        this.maintenance = maintenance;
    }

    public String getContratMaintenance() {
        return contratMaintenance;
    }

    public Application contratMaintenance(String contratMaintenance) {
        this.contratMaintenance = contratMaintenance;
        return this;
    }

    public void setContratMaintenance(String contratMaintenance) {
        this.contratMaintenance = contratMaintenance;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public Application dateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
        return this;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public Application dateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
        return this;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public Integer getEtatApplication() {
        return etatApplication;
    }

    public Application etatApplication(Integer etatApplication) {
        this.etatApplication = etatApplication;
        return this;
    }

    public void setEtatApplication(Integer etatApplication) {
        this.etatApplication = etatApplication;
    }

    public Ecole getEcole() {
        return ecole;
    }

    public Application ecole(Ecole ecole) {
        this.ecole = ecole;
        return this;
    }

    public void setEcole(Ecole ecole) {
        this.ecole = ecole;
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
        Application application = (Application) o;
        if (application.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), application.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Application{" +
            "id=" + getId() +
            ", nomApplication='" + getNomApplication() + "'" +
            ", versionApplication='" + getVersionApplication() + "'" +
            ", logoApplication='" + getLogoApplication() + "'" +
            ", coutApplication='" + getCoutApplication() + "'" +
            ", dateVente='" + getDateVente() + "'" +
            ", maintenance=" + getMaintenance() +
            ", contratMaintenance='" + getContratMaintenance() + "'" +
            ", dateDebut='" + getDateDebut() + "'" +
            ", dateFin='" + getDateFin() + "'" +
            ", etatApplication=" + getEtatApplication() +
            "}";
    }
}
