package org.yescola.gestion.domain;


import jakarta.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Documentexcel.
 */
@Entity
@Table(name = "documentexcel")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Documentexcel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "excel")
    private byte[] excel;

    @Column(name = "excel_content_type")
    private String excelContentType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getExcel() {
        return excel;
    }

    public Documentexcel excel(byte[] excel) {
        this.excel = excel;
        return this;
    }

    public void setExcel(byte[] excel) {
        this.excel = excel;
    }

    public String getExcelContentType() {
        return excelContentType;
    }

    public Documentexcel excelContentType(String excelContentType) {
        this.excelContentType = excelContentType;
        return this;
    }

    public void setExcelContentType(String excelContentType) {
        this.excelContentType = excelContentType;
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
        Documentexcel documentexcel = (Documentexcel) o;
        if (documentexcel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), documentexcel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Documentexcel{" +
            "id=" + getId() +
            ", excel='" + getExcel() + "'" +
            ", excelContentType='" + getExcelContentType() + "'" +
            "}";
    }
}
