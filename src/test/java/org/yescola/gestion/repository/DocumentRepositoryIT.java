package org.yescola.gestion.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.yescola.gestion.IntegrationTest;
import org.yescola.gestion.domain.Document;
import org.yescola.gestion.domain.TypeDocument;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@IntegrationTest
public class DocumentRepositoryIT {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private TypeDocumentRepository typeDocumentRepository;

    @Test
    public void shouldFindDocumentById() {
        // Given
        Document document = new Document()
            .etat(true)
            .document2("Test document content")
            .ref(12345);

        Document savedDocument = entityManager.persistAndFlush(document);

        // When
        Optional<Document> found = documentRepository.findById(savedDocument.getId());

        // Then
        assertThat(found).isPresent();
        assertThat(found.orElseThrow().isEtat()).isTrue();
        assertThat(found.orElseThrow().getDocument2()).isEqualTo("Test document content");
        assertThat(found.orElseThrow().getRef()).isEqualTo(12345);
    }

    @Test
    public void shouldFindAllDocuments() {
        // Given
        Document doc1 = new Document().etat(true).ref(1);
        Document doc2 = new Document().etat(false).ref(2);

        entityManager.persistAndFlush(doc1);
        entityManager.persistAndFlush(doc2);

        // When
        List<Document> documents = documentRepository.findAll();

        // Then
        assertThat(documents).hasSize(2);
        assertThat(documents).extracting(Document::getRef).containsExactlyInAnyOrder(1, 2);
    }

    @Test
    public void shouldSaveDocument() {
        // Given
        Document document = new Document()
            .etat(true)
            .document1("Binary content".getBytes())
            .document1ContentType("application/pdf")
            .document2("Text content")
            .ref(999);

        // When
        Document savedDocument = documentRepository.save(document);

        // Then
        assertThat(savedDocument.getId()).isNotNull();
        assertThat(savedDocument.isEtat()).isTrue();
        assertThat(savedDocument.getDocument1ContentType()).isEqualTo("application/pdf");
        assertThat(savedDocument.getRef()).isEqualTo(999);
    }

    @Test
    public void shouldDeleteDocument() {
        // Given
        Document document = new Document().etat(true).ref(123);
        Document savedDocument = entityManager.persistAndFlush(document);
        Long documentId = savedDocument.getId();

        // When
        documentRepository.deleteById(documentId);

        // Then
        Optional<Document> deletedDocument = documentRepository.findById(documentId);
        assertThat(deletedDocument).isEmpty();
    }

    @Test
    public void shouldFindDocumentsByEtat() {
        // Given
        Document activeDoc = new Document().etat(true).ref(1);
        Document inactiveDoc = new Document().etat(false).ref(2);

        entityManager.persistAndFlush(activeDoc);
        entityManager.persistAndFlush(inactiveDoc);

        // When - Custom query would need to be implemented in repository
        List<Document> allDocuments = documentRepository.findAll();
        List<Document> activeDocuments = allDocuments.stream()
            .filter(Document::isEtat)
            .toList();

        // Then
        assertThat(activeDocuments).hasSize(1);
        assertThat(activeDocuments.get(0).getRef()).isEqualTo(1);
    }

    @Test
    public void shouldFindDocumentsByTypeDocument() {
        // Given
        TypeDocument typeDoc = new TypeDocument()
            .libelle("PDF Documents")
            .etat(true);
        TypeDocument savedTypeDoc = entityManager.persistAndFlush(typeDoc);

        Document doc1 = new Document()
            .etat(true)
            .ref(1)
            .typeDocument(savedTypeDoc);
        Document doc2 = new Document()
            .etat(true)
            .ref(2)
            .typeDocument(savedTypeDoc);

        entityManager.persistAndFlush(doc1);
        entityManager.persistAndFlush(doc2);

        // When
        List<Document> allDocuments = documentRepository.findAll();
        List<Document> documentsOfType = allDocuments.stream()
            .filter(doc -> doc.getTypeDocument() != null &&
                          doc.getTypeDocument().getId().equals(savedTypeDoc.getId()))
            .toList();

        // Then
        assertThat(documentsOfType).hasSize(2);
        assertThat(documentsOfType).extracting(Document::getRef).containsExactlyInAnyOrder(1, 2);
    }

    @Test
    public void shouldHandleBinaryContent() {
        // Given
        byte[] binaryContent = "This is binary content for testing".getBytes();
        Document document = new Document()
            .etat(true)
            .document1(binaryContent)
            .document1ContentType("application/octet-stream")
            .ref(777);

        // When
        Document savedDocument = documentRepository.save(document);
        Optional<Document> foundDocument = documentRepository.findById(savedDocument.getId());

        // Then
        assertThat(foundDocument).isPresent();
        assertThat(foundDocument.orElseThrow().getDocument1()).isEqualTo(binaryContent);
        assertThat(foundDocument.orElseThrow().getDocument1ContentType()).isEqualTo("application/octet-stream");
    }
}
