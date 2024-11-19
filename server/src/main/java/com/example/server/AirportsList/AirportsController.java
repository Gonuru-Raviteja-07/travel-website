package com.example.server.AirportsList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AirportsController {
    @Autowired
    AirportsRepo airportsRepo;

    @GetMapping("/airports")
    public Iterable<Airports> getAllAirports() {
        return airportsRepo.findAll();
    }

    @PostMapping("/airports/save")
    public void addAirportToDB(@RequestBody Airports newAirport) {
        airportsRepo.save(newAirport);
    }

    @GetMapping("/airports/search")
    public List<Airports> getFilteredData(@RequestParam("search") String searchText) {
        return airportsRepo.findByNameContainingIgnoreCase(searchText);
    }
}
