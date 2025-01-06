package org.yescola.gestion.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Documentclasse.
 */
@Entity
@Table(name = "documentclasse")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Documentclasse implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "document_1")
    private byte[] document1;

    @Column(name = "document_1_content_type")
    private String document1ContentType;

    @Column(name = "jhi_ref")
    private String ref;

    @Column(name = "nomdocument")
    private String nomdocument;

    @ManyToOne
    @JsonIgnoreProperties("documentclasses")
    private Classe classe;

    @ManyToOne
    @JsonIgnoreProperties("documentclasses")
    private Semestre semestre;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getDocument1() {
        return document1;
    }

    public Documentclasse document1(byte[] document1) {
        this.document1 = document1;
        return this;
    }

    public void setDocument1(byte[] document1) {
        this.document1 = document1;
    }

    public String getDocument1ContentType() {
        return document1ContentType;
    }

    public Documentclasse document1ContentType(String document1ContentType) {
        this.document1ContentType = document1ContentType;
        return this;
    }

    public void setDocument1ContentType(String document1ContentType) {
        this.document1ContentType = document1ContentType;
    }

    public String getRef() {
        return ref;
    }

    public Documentclasse ref(String ref) {
        this.ref = ref;
        return this;
    }

    public void setRef(String ref) {
        this.ref = ref;
    }

    public String getNomdocument() {
        return nomdocument;
    }

    public Documentclasse nomdocument(String nomdocument) {
        this.nomdocument = nomdocument;
        return this;
    }

    public void setNomdocument(String nomdocument) {
        this.nomdocument = nomdocument;
    }

    public Classe getClasse() {
        return classe;
    }

    public Documentclasse classe(Classe classe) {
        this.classe = classe;
        return this;
    }

    public void setClasse(Classe classe) {
        this.classe = classe;
    }

    public Semestre getSemestre() {
        return semestre;
    }

    public Documentclasse semestre(Semestre semestre) {
        this.semestre = semestre;
        return this;
    }

    public void setSemestre(Semestre semestre) {
        this.semestre = semestre;
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
        Documentclasse documentclasse = (Documentclasse) o;
        if (documentclasse.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), documentclasse.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Documentclasse{" +
            "id=" + getId() +
            ", document1='" + getDocument1() + "'" +
            ", document1ContentType='" + getDocument1ContentType() + "'" +
            ", ref='" + getRef() + "'" +
            ", nomdocument='" + getNomdocument() + "'" +
            "}";
    }
}
