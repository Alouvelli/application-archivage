package org.yescola.gestion.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Document.
 */
@Entity
@Table(name = "document")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Document implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "etat")
    private Boolean etat;

    @Lob
    @Column(name = "document_1")
    private byte[] document1;

    @Column(name = "document_1_content_type")
    private String document1ContentType;

    @Lob
    @Column(name = "document_2")
    private String document2;

    @Column(name = "jhi_ref")
    private Integer ref;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private TypeDocument typeDocument;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isEtat() {
        return etat;
    }

    public Document etat(Boolean etat) {
        this.etat = etat;
        return this;
    }

    public void setEtat(Boolean etat) {
        this.etat = etat;
    }

    public byte[] getDocument1() {
        return document1;
    }

    public Document document1(byte[] document1) {
        this.document1 = document1;
        return this;
    }

    public void setDocument1(byte[] document1) {
        this.document1 = document1;
    }

    public String getDocument1ContentType() {
        return document1ContentType;
    }

    public Document document1ContentType(String document1ContentType) {
        this.document1ContentType = document1ContentType;
        return this;
    }

    public void setDocument1ContentType(String document1ContentType) {
        this.document1ContentType = document1ContentType;
    }

    public String getDocument2() {
        return document2;
    }

    public Document document2(String document2) {
        this.document2 = document2;
        return this;
    }

    public void setDocument2(String document2) {
        this.document2 = document2;
    }

    public Integer getRef() {
        return ref;
    }

    public Document ref(Integer ref) {
        this.ref = ref;
        return this;
    }

    public void setRef(Integer ref) {
        this.ref = ref;
    }

    public TypeDocument getTypeDocument() {
        return typeDocument;
    }

    public Document typeDocument(TypeDocument typeDocument) {
        this.typeDocument = typeDocument;
        return this;
    }

    public void setTypeDocument(TypeDocument typeDocument) {
        this.typeDocument = typeDocument;
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
        Document document = (Document) o;
        if (document.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), document.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Document{" +
            "id=" + getId() +
            ", etat='" + isEtat() + "'" +
            ", document1='" + getDocument1() + "'" +
            ", document1ContentType='" + getDocument1ContentType() + "'" +
            ", document2='" + getDocument2() + "'" +
            ", ref=" + getRef() +
            "}";
    }
}
