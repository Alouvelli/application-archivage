package org.yescola.gestion.service.dto;

import java.time.Instant;
import java.util.List;

public record DashboardStatsDTO(
    long documentsTotal,
    long documentsEnCours,
    long etudiantsActifs,
    long classesTotal,
    List<MonthlyPoint> volumeMensuel,
    List<StatusSlice> statutDocuments,
    List<ActivityItem> activites
) {
    public record MonthlyPoint(String label, long value) {}

    public record StatusSlice(String label, long value, String color) {}

    public record ActivityItem(String title, String detail, Instant time, String status) {}
}
