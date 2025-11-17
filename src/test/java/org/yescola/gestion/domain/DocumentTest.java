package org.yescola.gestion.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.yescola.gestion.web.rest.TestUtil;

public class DocumentTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Document.class);
        Document document1 = new Document();
        document1.setId(1L);
        Document document2 = new Document();
        document2.setId(document1.getId());
        assertThat(document1).isEqualTo(document2);
        document2.setId(2L);
        assertThat(document1).isNotEqualTo(document2);
        document1.setId(null);
        assertThat(document1).isNotEqualTo(document2);
    }

    @Test
    public void testDocumentCreation() {
        Document document = new Document();
        document.setEtat(true);
        document.setRef(12345);
        document.setDocument1ContentType("application/pdf");
        document.setDocument2("Test document content");

        assertThat(document.isEtat()).isTrue();
        assertThat(document.getRef()).isEqualTo(12345);
        assertThat(document.getDocument1ContentType()).isEqualTo("application/pdf");
        assertThat(document.getDocument2()).isEqualTo("Test document content");
    }

    @Test
    public void testDocumentFluentAPI() {
        TypeDocument typeDocument = new TypeDocument();
        typeDocument.setId(1L);
        
        byte[] testContent = "test content".getBytes();
        
        Document document = new Document()
            .etat(true)
            .document1(testContent)
            .document1ContentType("application/pdf")
            .document2("Test document text")
            .ref(123)
            .typeDocument(typeDocument);

        assertThat(document.isEtat()).isTrue();
        assertThat(document.getDocument1()).isEqualTo(testContent);
        assertThat(document.getDocument1ContentType()).isEqualTo("application/pdf");
        assertThat(document.getDocument2()).isEqualTo("Test document text");
        assertThat(document.getRef()).isEqualTo(123);
        assertThat(document.getTypeDocument()).isEqualTo(typeDocument);
    }

    @Test
    public void testToString() {
        Document document = new Document();
        document.setId(1L);
        document.setEtat(true);
        document.setRef(123);
        
        String toString = document.toString();
        assertThat(toString).contains("Document{");
        assertThat(toString).contains("id=1");
        assertThat(toString).contains("etat='true'");
        assertThat(toString).contains("ref=123");
    }
}