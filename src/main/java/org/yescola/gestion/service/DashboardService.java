package org.yescola.gestion.service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.yescola.gestion.domain.Inscription;
import org.yescola.gestion.repository.ClasseRepository;
import org.yescola.gestion.repository.DocumentRepository;
import org.yescola.gestion.repository.EtudiantRepository;
import org.yescola.gestion.repository.InscriptionRepository;
import org.yescola.gestion.service.dto.DashboardStatsDTO;

@Service
@Transactional(readOnly = true)
public class DashboardService {

    private final DocumentRepository documentRepository;
    private final EtudiantRepository etudiantRepository;
    private final ClasseRepository classeRepository;
    private final InscriptionRepository inscriptionRepository;

    public DashboardService(
        DocumentRepository documentRepository,
        EtudiantRepository etudiantRepository,
        ClasseRepository classeRepository,
        InscriptionRepository inscriptionRepository
    ) {
        this.documentRepository = documentRepository;
        this.etudiantRepository = etudiantRepository;
        this.classeRepository = classeRepository;
        this.inscriptionRepository = inscriptionRepository;
    }

    public DashboardStatsDTO buildStats() {
        long documentsTotal = documentRepository.count();
        long documentsEnCours = documentRepository.countByEtatIsFalseOrEtatIsNull();
        long etudiantsActifs = etudiantRepository.count();
        long classesTotal = classeRepository.count();

        var volumeMensuel = buildVolumeMensuel();
        var statutDocuments = buildStatutDocuments();
        var activites = buildActivites();

        return new DashboardStatsDTO(documentsTotal, documentsEnCours, etudiantsActifs, classesTotal, volumeMensuel, statutDocuments, activites);
    }

    private List<DashboardStatsDTO.MonthlyPoint> buildVolumeMensuel() {
        LocalDate start = LocalDate.now().minusMonths(5).withDayOfMonth(1);
        List<Object[]> results = inscriptionRepository.countMonthlySince(start);
        List<DashboardStatsDTO.MonthlyPoint> points = new ArrayList<>();
        for (Object[] row : results) {
            Integer year = (Integer) row[0];
            Integer month = (Integer) row[1];
            Long value = (Long) row[2];
            String label = monthLabel(year, month);
            points.add(new DashboardStatsDTO.MonthlyPoint(label, value != null ? value : 0));
        }
        return points;
    }

    private List<DashboardStatsDTO.StatusSlice> buildStatutDocuments() {
        List<Object[]> rows = documentRepository.countGroupByEtat();
        List<DashboardStatsDTO.StatusSlice> slices = new ArrayList<>();
        for (Object[] row : rows) {
            Boolean etat = (Boolean) row[0];
            Long value = (Long) row[1];
            String label = Boolean.TRUE.equals(etat) ? "Validés" : "En cours";
            String color = Boolean.TRUE.equals(etat) ? "#4ad991" : "#ffb600";
            slices.add(new DashboardStatsDTO.StatusSlice(label, value != null ? value : 0, color));
        }
        if (slices.isEmpty()) {
            slices.add(new DashboardStatsDTO.StatusSlice("En cours", 0, "#ffb600"));
        }
        return slices;
    }

    private List<DashboardStatsDTO.ActivityItem> buildActivites() {
        List<Inscription> inscriptions = inscriptionRepository.findTop5ByDateIsNotNullOrderByDateDesc();
        List<DashboardStatsDTO.ActivityItem> items = new ArrayList<>();
        for (Inscription inscription : inscriptions) {
            String title = inscription.getClasse() != null ? inscription.getClasse().getLibelle() : "Inscription";
            String detail = inscription.getEtudiant() != null ? inscription.getEtudiant().getNom() : "Etudiant";
            Instant time = inscription.getDate() != null ? inscription.getDate().atStartOfDay(ZoneId.systemDefault()).toInstant() : Instant.now();
            String status = Boolean.TRUE.equals(inscription.isManquant()) ? "warning" : "success";
            items.add(new DashboardStatsDTO.ActivityItem(title, detail, time, status));
        }
        return items;
    }

    private String monthLabel(Integer year, Integer month) {
        if (year == null || month == null) {
            return "";
        }
        return LocalDate.of(year, month, 1)
            .getMonth()
            .getDisplayName(TextStyle.SHORT, Locale.getDefault()) + " " + year;
    }
}
