package com.example.server.BookedFlights;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookFlightsDataService {
    @Autowired
    BookedFlightsDataRepo repo;

    public void saveFlight(BookedFlightsData flight) {
        repo.save(flight);    
    }
}
