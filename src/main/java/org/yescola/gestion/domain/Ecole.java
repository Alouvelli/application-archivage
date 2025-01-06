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
 * A Ecole.
 */
@Entity
@Table(name = "ecole")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ecole implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code_ecole")
    private String codeEcole;

    @Column(name = "logo_ecole")
    private String logoEcole;

    @Column(name = "entete_ecole")
    private String enteteEcole;

    @Column(name = "bas_page_ecole")
    private String basPageEcole;

    @Column(name = "ninea_ecole")
    private String nineaEcole;

    @Column(name = "adresse_ecole")
    private String adresseEcole;

    @Column(name = "telephone_ecole")
    private String telephoneEcole;

    @Column(name = "email_ecole")
    private String emailEcole;

    @Column(name = "sigle_ecole")
    private String sigleEcole;

    @Column(name = "fax_ecole")
    private String faxEcole;

    @Column(name = "etat_ecole")
    private Integer etatEcole;

    @Column(name = "encours")
    private Integer encours;

    @Column(name = "rang")
    private Integer rang;

    @OneToOne
    @JoinColumn(unique = true)
    private Application application;

    @OneToMany(mappedBy = "ecole")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Site> sites = new HashSet<>();
    @OneToMany(mappedBy = "ecole")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Profil> profils = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeEcole() {
        return codeEcole;
    }

    public Ecole codeEcole(String codeEcole) {
        this.codeEcole = codeEcole;
        return this;
    }

    public void setCodeEcole(String codeEcole) {
        this.codeEcole = codeEcole;
    }

    public String getLogoEcole() {
        return logoEcole;
    }

    public Ecole logoEcole(String logoEcole) {
        this.logoEcole = logoEcole;
        return this;
    }

    public void setLogoEcole(String logoEcole) {
        this.logoEcole = logoEcole;
    }

    public String getEnteteEcole() {
        return enteteEcole;
    }

    public Ecole enteteEcole(String enteteEcole) {
        this.enteteEcole = enteteEcole;
        return this;
    }

    public void setEnteteEcole(String enteteEcole) {
        this.enteteEcole = enteteEcole;
    }

    public String getBasPageEcole() {
        return basPageEcole;
    }

    public Ecole basPageEcole(String basPageEcole) {
        this.basPageEcole = basPageEcole;
        return this;
    }

    public void setBasPageEcole(String basPageEcole) {
        this.basPageEcole = basPageEcole;
    }

    public String getNineaEcole() {
        return nineaEcole;
    }

    public Ecole nineaEcole(String nineaEcole) {
        this.nineaEcole = nineaEcole;
        return this;
    }

    public void setNineaEcole(String nineaEcole) {
        this.nineaEcole = nineaEcole;
    }

    public String getAdresseEcole() {
        return adresseEcole;
    }

    public Ecole adresseEcole(String adresseEcole) {
        this.adresseEcole = adresseEcole;
        return this;
    }

    public void setAdresseEcole(String adresseEcole) {
        this.adresseEcole = adresseEcole;
    }

    public String getTelephoneEcole() {
        return telephoneEcole;
    }

    public Ecole telephoneEcole(String telephoneEcole) {
        this.telephoneEcole = telephoneEcole;
        return this;
    }

    public void setTelephoneEcole(String telephoneEcole) {
        this.telephoneEcole = telephoneEcole;
    }

    public String getEmailEcole() {
        return emailEcole;
    }

    public Ecole emailEcole(String emailEcole) {
        this.emailEcole = emailEcole;
        return this;
    }

    public void setEmailEcole(String emailEcole) {
        this.emailEcole = emailEcole;
    }

    public String getSigleEcole() {
        return sigleEcole;
    }

    public Ecole sigleEcole(String sigleEcole) {
        this.sigleEcole = sigleEcole;
        return this;
    }

    public void setSigleEcole(String sigleEcole) {
        this.sigleEcole = sigleEcole;
    }

    public String getFaxEcole() {
        return faxEcole;
    }

    public Ecole faxEcole(String faxEcole) {
        this.faxEcole = faxEcole;
        return this;
    }

    public void setFaxEcole(String faxEcole) {
        this.faxEcole = faxEcole;
    }

    public Integer getEtatEcole() {
        return etatEcole;
    }

    public Ecole etatEcole(Integer etatEcole) {
        this.etatEcole = etatEcole;
        return this;
    }

    public void setEtatEcole(Integer etatEcole) {
        this.etatEcole = etatEcole;
    }

    public Integer getEncours() {
        return encours;
    }

    public Ecole encours(Integer encours) {
        this.encours = encours;
        return this;
    }

    public void setEncours(Integer encours) {
        this.encours = encours;
    }

    public Integer getRang() {
        return rang;
    }

    public Ecole rang(Integer rang) {
        this.rang = rang;
        return this;
    }

    public void setRang(Integer rang) {
        this.rang = rang;
    }

    public Application getApplication() {
        return application;
    }

    public Ecole application(Application application) {
        this.application = application;
        return this;
    }

    public void setApplication(Application application) {
        this.application = application;
    }

    public Set<Site> getSites() {
        return sites;
    }

    public Ecole sites(Set<Site> sites) {
        this.sites = sites;
        return this;
    }

    public Ecole addSite(Site site) {
        this.sites.add(site);
        site.setEcole(this);
        return this;
    }

    public Ecole removeSite(Site site) {
        this.sites.remove(site);
        site.setEcole(null);
        return this;
    }

    public void setSites(Set<Site> sites) {
        this.sites = sites;
    }

    public Set<Profil> getProfils() {
        return profils;
    }

    public Ecole profils(Set<Profil> profils) {
        this.profils = profils;
        return this;
    }

    public Ecole addProfil(Profil profil) {
        this.profils.add(profil);
        profil.setEcole(this);
        return this;
    }

    public Ecole removeProfil(Profil profil) {
        this.profils.remove(profil);
        profil.setEcole(null);
        return this;
    }

    public void setProfils(Set<Profil> profils) {
        this.profils = profils;
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
        Ecole ecole = (Ecole) o;
        if (ecole.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ecole.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ecole{" +
            "id=" + getId() +
            ", codeEcole='" + getCodeEcole() + "'" +
            ", logoEcole='" + getLogoEcole() + "'" +
            ", enteteEcole='" + getEnteteEcole() + "'" +
            ", basPageEcole='" + getBasPageEcole() + "'" +
            ", nineaEcole='" + getNineaEcole() + "'" +
            ", adresseEcole='" + getAdresseEcole() + "'" +
            ", telephoneEcole='" + getTelephoneEcole() + "'" +
            ", emailEcole='" + getEmailEcole() + "'" +
            ", sigleEcole='" + getSigleEcole() + "'" +
            ", faxEcole='" + getFaxEcole() + "'" +
            ", etatEcole=" + getEtatEcole() +
            ", encours=" + getEncours() +
            ", rang=" + getRang() +
            "}";
    }
}
