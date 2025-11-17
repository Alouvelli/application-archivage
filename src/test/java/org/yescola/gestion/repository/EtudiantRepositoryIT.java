package org.yescola.gestion.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.dao.DataIntegrityViolationException;
import org.yescola.gestion.IntegrationTest;
import org.yescola.gestion.domain.Etudiant;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@IntegrationTest
public class EtudiantRepositoryIT {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Test
    public void shouldFindEtudiantById() {
        // Given
        Etudiant etudiant = new Etudiant()
            .nom("Doe")
            .prenom("John")
            .matricule("ET001")
            .email("john.doe@example.com")
            .tel("123456789")
            .etat(true);

        Etudiant savedEtudiant = entityManager.persistAndFlush(etudiant);

        // When
        Optional<Etudiant> found = etudiantRepository.findById(savedEtudiant.getId());

        // Then
        assertThat(found).isPresent();
        assertThat(found.orElseThrow().getNom()).isEqualTo("Doe");
        assertThat(found.orElseThrow().getPrenom()).isEqualTo("John");
        assertThat(found.orElseThrow().getMatricule()).isEqualTo("ET001");
    }

    @Test
    public void shouldFindAllEtudiants() {
        // Given
        Etudiant etudiant1 = new Etudiant()
            .nom("Doe")
            .prenom("John")
            .matricule("ET001")
            .etat(true);

        Etudiant etudiant2 = new Etudiant()
            .nom("Smith")
            .prenom("Jane")
            .matricule("ET002")
            .etat(true);

        entityManager.persistAndFlush(etudiant1);
        entityManager.persistAndFlush(etudiant2);

        // When
        List<Etudiant> etudiants = etudiantRepository.findAll();

        // Then
        assertThat(etudiants).hasSize(2);
        assertThat(etudiants).extracting(Etudiant::getMatricule)
            .containsExactlyInAnyOrder("ET001", "ET002");
    }

    @Test
    public void shouldSaveEtudiant() {
        // Given
        Etudiant etudiant = new Etudiant()
            .nom("Johnson")
            .prenom("Alice")
            .matricule("ET003")
            .email("alice.johnson@example.com")
            .tel("987654321")
            .adresse("123 Main Street")
            .dateNaissance("1995-05-15")
            .etat(true);

        // When
        Etudiant savedEtudiant = etudiantRepository.save(etudiant);

        // Then
        assertThat(savedEtudiant.getId()).isNotNull();
        assertThat(savedEtudiant.getNom()).isEqualTo("Johnson");
        assertThat(savedEtudiant.getPrenom()).isEqualTo("Alice");
        assertThat(savedEtudiant.getMatricule()).isEqualTo("ET003");
        assertThat(savedEtudiant.getEmail()).isEqualTo("alice.johnson@example.com");
    }

    @Test
    public void shouldDeleteEtudiant() {
        // Given
        Etudiant etudiant = new Etudiant()
            .nom("Brown")
            .prenom("Bob")
            .matricule("ET004")
            .etat(true);

        Etudiant savedEtudiant = entityManager.persistAndFlush(etudiant);
        Long etudiantId = savedEtudiant.getId();

        // When
        etudiantRepository.deleteById(etudiantId);

        // Then
        Optional<Etudiant> deletedEtudiant = etudiantRepository.findById(etudiantId);
        assertThat(deletedEtudiant).isEmpty();
    }

    @Test
    public void shouldFindEtudiantsByEtat() {
        // Given
        Etudiant activeEtudiant = new Etudiant()
            .nom("Active")
            .prenom("Student")
            .matricule("ET005")
            .etat(true);

        Etudiant inactiveEtudiant = new Etudiant()
            .nom("Inactive")
            .prenom("Student")
            .matricule("ET006")
            .etat(false);

        entityManager.persistAndFlush(activeEtudiant);
        entityManager.persistAndFlush(inactiveEtudiant);

        // When - Custom query would need to be implemented in repository
        List<Etudiant> allEtudiants = etudiantRepository.findAll();
        List<Etudiant> activeEtudiants = allEtudiants.stream()
            .filter(Etudiant::isEtat)
            .toList();

        // Then
        assertThat(activeEtudiants).hasSize(1);
        assertThat(activeEtudiants.get(0).getMatricule()).isEqualTo("ET005");
    }

    @Test
    public void shouldUpdateEtudiant() {
        // Given
        Etudiant etudiant = new Etudiant()
            .nom("Original")
            .prenom("Name")
            .matricule("ET007")
            .email("original@example.com")
            .etat(true);

        Etudiant savedEtudiant = entityManager.persistAndFlush(etudiant);

        // When
        savedEtudiant.setNom("Updated");
        savedEtudiant.setPrenom("NewName");
        savedEtudiant.setEmail("updated@example.com");
        Etudiant updatedEtudiant = etudiantRepository.save(savedEtudiant);

        // Then
        assertThat(updatedEtudiant.getNom()).isEqualTo("Updated");
        assertThat(updatedEtudiant.getPrenom()).isEqualTo("NewName");
        assertThat(updatedEtudiant.getEmail()).isEqualTo("updated@example.com");
        assertThat(updatedEtudiant.getMatricule()).isEqualTo("ET007"); // Should remain unchanged
    }

    @Test
    public void shouldFindEtudiantByMatricule() {
        // Given
        Etudiant etudiant = new Etudiant()
            .nom("Test")
            .prenom("Student")
            .matricule("ET008")
            .etat(true);

        entityManager.persistAndFlush(etudiant);

        // When - Custom query would need to be implemented in repository
        List<Etudiant> allEtudiants = etudiantRepository.findAll();
        Optional<Etudiant> foundEtudiant = allEtudiants.stream()
            .filter(e -> "ET008".equals(e.getMatricule()))
            .findFirst();

        // Then
        assertThat(foundEtudiant).isPresent();
        assertThat(foundEtudiant.orElseThrow().getNom()).isEqualTo("Test");
        assertThat(foundEtudiant.orElseThrow().getPrenom()).isEqualTo("Student");
    }

    @Test
    public void shouldHandleNullValues() {
        // Given
        Etudiant etudiant = new Etudiant()
            .nom("Required")
            .prenom("Fields")
            .matricule("ET009")
            .etat(true);
        // Optional fields are null

        // When
        Etudiant savedEtudiant = etudiantRepository.save(etudiant);

        // Then
        assertThat(savedEtudiant.getId()).isNotNull();
        assertThat(savedEtudiant.getEmail()).isNull();
        assertThat(savedEtudiant.getTel()).isNull();
        assertThat(savedEtudiant.getAdresse()).isNull();
        assertThat(savedEtudiant.getDateNaissance()).isNull();
    }
}
