package com.example.server.BookedFlights;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class BookedFlightsDataController {

    @Autowired
    BookFlightsDataService service;

    @Autowired
    BookedFlightsDataRepo repo;

    @PostMapping("/booked-flights/save")
    public void saveBookedFlights(@RequestBody List<BookedFlightsData> flightsDTOs) {
        System.out.println(flightsDTOs.toString());
    
        flightsDTOs.forEach(flightsDTO -> {
            // Use flightsDTO directly instead of creating a new object
            BookedFlightsData flight = new BookedFlightsData();
            flight.setPnrNumber(flightsDTO.getPnrNumber());
            flight.setFullName(flightsDTO.getFullName());
            flight.setFlightNumber(flightsDTO.getFlightNumber());
            flight.setSelectedCabin(flightsDTO.getSelectedCabin());
            flight.setFromDate(flightsDTO.getFromDate());
            flight.setToDate(flightsDTO.getToDate());
            flight.setFrom(flightsDTO.getFrom());
            flight.setTo(flightsDTO.getTo());
            flight.setDepartureTime(flightsDTO.getDepartureTime());
            flight.setArrivalTime(flightsDTO.getArrivalTime());
            flight.setAirLine(flightsDTO.getAirLine());
    
            service.saveFlight(flight);
        });
    }

    @GetMapping("/booked-flights/search")
    public List<BookedFlightsData> getFilteredFromAndToPlaceFlights(@RequestParam("pnrNo") String pnrNo){
        return repo.findByPnrNumber(pnrNo);
    }
}
