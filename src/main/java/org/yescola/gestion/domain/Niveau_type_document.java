
package org.yescola.gestion.domain;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "niveau_type_document")

public class Niveau_type_document implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "niveau_id",nullable = false)
    private Long niveau_Id;

    @Id
    @Column(name = "type_document_id",nullable = false)
    private Long type_document_id;


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long gettype_document_id() {

        return  this.type_document_id;
    }
    public Long getniveau_Id() {

        return  this.niveau_Id;
    }
    public void settype_document_id(Long typesalle_Id) {
        this.type_document_id= typesalle_Id;
    }

    public void setniveau_Id(Long niveau_Id) {
        this.niveau_Id= niveau_Id;
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
        Niveau_type_document typesalle_equipement = (Niveau_type_document) o;
        if (typesalle_equipement.getniveau_Id()== null || getniveau_Id() == null) {
            return false;
        }
        return Objects.equals(getniveau_Id(), typesalle_equipement.getniveau_Id());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getniveau_Id());
    }

    @Override
    public String toString() {
        return "Article{" +
            "boutiqueId=" + getniveau_Id() +
            ", routeId='" + getniveau_Id() + "'" +
            "}";
    }
}
