package com.hms.backend.controller;

import com.hms.backend.service.DoctorService;
import com.hms.backend.service.PatientService;
import com.hms.backend.service.CaretakerService;
import com.hms.backend.service.MedicineService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search")
@CrossOrigin
public class SearchController {

    private final DoctorService doctorService;
    private final PatientService patientService;
    private final CaretakerService caretakerService;
    private final MedicineService pharmacyService;

    public SearchController(
            DoctorService doctorService,
            PatientService patientService,
            CaretakerService caretakerService,
            MedicineService pharmacyService
    ) {
        this.doctorService = doctorService;
        this.patientService = patientService;
        this.caretakerService = caretakerService;
        this.pharmacyService = pharmacyService;
    }

    @GetMapping("/{uid}")
    public Object searchByUid(@PathVariable String uid) {

        uid = uid.toUpperCase();

        if (uid.startsWith("DOC")) {
            return doctorService.findByUid(uid);
        }
        if (uid.startsWith("PAT")) {
            return patientService.findByUid(uid);
        }
        if (uid.startsWith("CT")) {
            return caretakerService.findByUid(uid);
        }
        if (uid.startsWith("PH")) {
            return pharmacyService.findByUid(uid);
        }

        return "Invalid UID format";
    }
}
