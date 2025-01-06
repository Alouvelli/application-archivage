package org.yescola.gestion.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Employe.
 */
@Entity
@Table(name = "employe")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Employe implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tel_utilisateur")
    private String telUtilisateur;

    @Column(name = "etat_utilisateur")
    private Integer etatUtilisateur;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("employes")
    private Profil profil;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTelUtilisateur() {
        return telUtilisateur;
    }

    public Employe telUtilisateur(String telUtilisateur) {
        this.telUtilisateur = telUtilisateur;
        return this;
    }

    public void setTelUtilisateur(String telUtilisateur) {
        this.telUtilisateur = telUtilisateur;
    }

    public Integer getEtatUtilisateur() {
        return etatUtilisateur;
    }

    public Employe etatUtilisateur(Integer etatUtilisateur) {
        this.etatUtilisateur = etatUtilisateur;
        return this;
    }

    public void setEtatUtilisateur(Integer etatUtilisateur) {
        this.etatUtilisateur = etatUtilisateur;
    }

    public User getUser() {
        return user;
    }

    public Employe user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Profil getProfil() {
        return profil;
    }

    public Employe profil(Profil profil) {
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
        Employe employe = (Employe) o;
        if (employe.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), employe.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Employe{" +
            "id=" + getId() +
            ", telUtilisateur='" + getTelUtilisateur() + "'" +
            ", etatUtilisateur=" + getEtatUtilisateur() +
            "}";
    }
}
