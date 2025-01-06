package org.yescola.gestion.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Site.
 */
@Entity
@Table(name = "site")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Site implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code_site")
    private String codeSite;

    @Column(name = "logo_site")
    private String logoSite;

    @Column(name = "entete_site")
    private String enteteSite;

    @Column(name = "bas_page_site")
    private String basPageSite;

    @Column(name = "ninea_site")
    private String nineaSite;

    @Column(name = "adresse_site")
    private String adresseSite;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "email_site")
    private String emailSite;

    @Column(name = "sigle_site")
    private String sigleSite;

    @Column(name = "fax_ecole")
    private String faxEcole;

    @Column(name = "etat_site")
    private Integer etatSite;

    @Column(name = "encours")
    private Integer encours;

    @Column(name = "rang")
    private Integer rang;

    @ManyToOne
    @JsonIgnoreProperties("sites")
    private Ecole ecole;

    @OneToMany(mappedBy = "site")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Profil> profils = new HashSet<>();
    @ManyToMany(mappedBy = "sites")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Module> modules = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeSite() {
        return codeSite;
    }

    public Site codeSite(String codeSite) {
        this.codeSite = codeSite;
        return this;
    }

    public void setCodeSite(String codeSite) {
        this.codeSite = codeSite;
    }

    public String getLogoSite() {
        return logoSite;
    }

    public Site logoSite(String logoSite) {
        this.logoSite = logoSite;
        return this;
    }

    public void setLogoSite(String logoSite) {
        this.logoSite = logoSite;
    }

    public String getEnteteSite() {
        return enteteSite;
    }

    public Site enteteSite(String enteteSite) {
        this.enteteSite = enteteSite;
        return this;
    }

    public void setEnteteSite(String enteteSite) {
        this.enteteSite = enteteSite;
    }

    public String getBasPageSite() {
        return basPageSite;
    }

    public Site basPageSite(String basPageSite) {
        this.basPageSite = basPageSite;
        return this;
    }

    public void setBasPageSite(String basPageSite) {
        this.basPageSite = basPageSite;
    }

    public String getNineaSite() {
        return nineaSite;
    }

    public Site nineaSite(String nineaSite) {
        this.nineaSite = nineaSite;
        return this;
    }

    public void setNineaSite(String nineaSite) {
        this.nineaSite = nineaSite;
    }

    public String getAdresseSite() {
        return adresseSite;
    }

    public Site adresseSite(String adresseSite) {
        this.adresseSite = adresseSite;
        return this;
    }

    public void setAdresseSite(String adresseSite) {
        this.adresseSite = adresseSite;
    }

    public String getTelephone() {
        return telephone;
    }

    public Site telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmailSite() {
        return emailSite;
    }

    public Site emailSite(String emailSite) {
        this.emailSite = emailSite;
        return this;
    }

    public void setEmailSite(String emailSite) {
        this.emailSite = emailSite;
    }

    public String getSigleSite() {
        return sigleSite;
    }

    public Site sigleSite(String sigleSite) {
        this.sigleSite = sigleSite;
        return this;
    }

    public void setSigleSite(String sigleSite) {
        this.sigleSite = sigleSite;
    }

    public String getFaxEcole() {
        return faxEcole;
    }

    public Site faxEcole(String faxEcole) {
        this.faxEcole = faxEcole;
        return this;
    }

    public void setFaxEcole(String faxEcole) {
        this.faxEcole = faxEcole;
    }

    public Integer getEtatSite() {
        return etatSite;
    }

    public Site etatSite(Integer etatSite) {
        this.etatSite = etatSite;
        return this;
    }

    public void setEtatSite(Integer etatSite) {
        this.etatSite = etatSite;
    }

    public Integer getEncours() {
        return encours;
    }

    public Site encours(Integer encours) {
        this.encours = encours;
        return this;
    }

    public void setEncours(Integer encours) {
        this.encours = encours;
    }

    public Integer getRang() {
        return rang;
    }

    public Site rang(Integer rang) {
        this.rang = rang;
        return this;
    }

    public void setRang(Integer rang) {
        this.rang = rang;
    }

    public Ecole getEcole() {
        return ecole;
    }

    public Site ecole(Ecole ecole) {
        this.ecole = ecole;
        return this;
    }

    public void setEcole(Ecole ecole) {
        this.ecole = ecole;
    }

    public Set<Profil> getProfils() {
        return profils;
    }

    public Site profils(Set<Profil> profils) {
        this.profils = profils;
        return this;
    }

    public Site addProfil(Profil profil) {
        this.profils.add(profil);
        profil.setSite(this);
        return this;
    }

    public Site removeProfil(Profil profil) {
        this.profils.remove(profil);
        profil.setSite(null);
        return this;
    }

    public void setProfils(Set<Profil> profils) {
        this.profils = profils;
    }

    public Set<Module> getModules() {
        return modules;
    }

    public Site modules(Set<Module> modules) {
        this.modules = modules;
        return this;
    }

    public Site addModule(Module module) {
        this.modules.add(module);
        module.getSites().add(this);
        return this;
    }

    public Site removeModule(Module module) {
        this.modules.remove(module);
        module.getSites().remove(this);
        return this;
    }

    public void setModules(Set<Module> modules) {
        this.modules = modules;
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
        Site site = (Site) o;
        if (site.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), site.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Site{" +
            "id=" + getId() +
            ", codeSite='" + getCodeSite() + "'" +
            ", logoSite='" + getLogoSite() + "'" +
            ", enteteSite='" + getEnteteSite() + "'" +
            ", basPageSite='" + getBasPageSite() + "'" +
            ", nineaSite='" + getNineaSite() + "'" +
            ", adresseSite='" + getAdresseSite() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", emailSite='" + getEmailSite() + "'" +
            ", sigleSite='" + getSigleSite() + "'" +
            ", faxEcole='" + getFaxEcole() + "'" +
            ", etatSite=" + getEtatSite() +
            ", encours=" + getEncours() +
            ", rang=" + getRang() +
            "}";
    }
}
