package com.example.server.Flights;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class FlightsController {

    @Autowired
    FlightsRepo flightRepo;

    @PostMapping("/flights/save")
    public void addFlightToDB(@RequestBody Flights flight) {
        flightRepo.save(flight);
    }

    @GetMapping("/flights")
    public Iterable<Flights> getFlightDetailsByID(){
        return flightRepo.findAll();
    }

    @GetMapping("/flights/search")
    public List<Flights> getFilteredFromAndToPlaceFlights(@RequestParam("from") String from,
                                                          @RequestParam("to") String to){
        return flightRepo.findByFromPlaceAndToPlace(from,to);
    }

    @GetMapping("/flights/return")
    public List<Flights> getFilteredToAndFromPlaceFlights(@RequestParam("to") String to,
                                                          @RequestParam("from") String from){
        return flightRepo.findByToPlaceAndFromPlace(to,from);
    }

}
