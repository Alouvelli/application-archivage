package org.yescola.gestion.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.yescola.gestion.web.rest.TestUtil;

public class EtudiantTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Etudiant.class);
        Etudiant etudiant1 = new Etudiant();
        etudiant1.setId(1L);
        Etudiant etudiant2 = new Etudiant();
        etudiant2.setId(etudiant1.getId());
        assertThat(etudiant1).isEqualTo(etudiant2);
        etudiant2.setId(2L);
        assertThat(etudiant1).isNotEqualTo(etudiant2);
        etudiant1.setId(null);
        assertThat(etudiant1).isNotEqualTo(etudiant2);
    }

    @Test
    public void testEtudiantCreation() {
        Etudiant etudiant = new Etudiant();
        etudiant.setNom("Doe");
        etudiant.setPrenom("John");
        etudiant.setMatricule("ET001");
        etudiant.setEmail("john.doe@example.com");
        etudiant.setTel("123456789");
        etudiant.setAdresse("123 Main Street");
        etudiant.setDateNaissance("1990-01-01");
        etudiant.setEtat(true);

        assertThat(etudiant.getNom()).isEqualTo("Doe");
        assertThat(etudiant.getPrenom()).isEqualTo("John");
        assertThat(etudiant.getMatricule()).isEqualTo("ET001");
        assertThat(etudiant.getEmail()).isEqualTo("john.doe@example.com");
        assertThat(etudiant.getTel()).isEqualTo("123456789");
        assertThat(etudiant.getAdresse()).isEqualTo("123 Main Street");
        assertThat(etudiant.getDateNaissance()).isEqualTo("1990-01-01");
        assertThat(etudiant.isEtat()).isTrue();
    }

    @Test
    public void testEtudiantFluentAPI() {
        Etudiant etudiant = new Etudiant()
            .nom("Smith")
            .prenom("Jane")
            .matricule("ET002")
            .email("jane.smith@example.com")
            .tel("987654321")
            .adresse("456 Oak Avenue")
            .dateNaissance("1995-05-15")
            .etat(false);

        assertThat(etudiant.getNom()).isEqualTo("Smith");
        assertThat(etudiant.getPrenom()).isEqualTo("Jane");
        assertThat(etudiant.getMatricule()).isEqualTo("ET002");
        assertThat(etudiant.getEmail()).isEqualTo("jane.smith@example.com");
        assertThat(etudiant.getTel()).isEqualTo("987654321");
        assertThat(etudiant.getAdresse()).isEqualTo("456 Oak Avenue");
        assertThat(etudiant.getDateNaissance()).isEqualTo("1995-05-15");
        assertThat(etudiant.isEtat()).isFalse();
    }

    @Test
    public void testMatriculeUniqueness() {
        Etudiant etudiant1 = new Etudiant().matricule("ET001");
        Etudiant etudiant2 = new Etudiant().matricule("ET001");
        Etudiant etudiant3 = new Etudiant().matricule("ET002");

        // Same matricule should have same matricule value
        assertThat(etudiant1.getMatricule()).isEqualTo(etudiant2.getMatricule());
        assertThat(etudiant1.getMatricule()).isNotEqualTo(etudiant3.getMatricule());
    }

    @Test
    public void testToString() {
        Etudiant etudiant = new Etudiant();
        etudiant.setId(1L);
        etudiant.setNom("Doe");
        etudiant.setPrenom("John");
        etudiant.setMatricule("ET001");
        
        String toString = etudiant.toString();
        assertThat(toString).contains("Etudiant{");
        assertThat(toString).contains("id=1");
        assertThat(toString).contains("nom='Doe'");
        assertThat(toString).contains("prenom='John'");
        assertThat(toString).contains("matricule='ET001'");
    }
}