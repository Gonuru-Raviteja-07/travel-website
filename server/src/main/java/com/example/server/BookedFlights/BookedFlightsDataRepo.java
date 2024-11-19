package com.example.server.BookedFlights;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface BookedFlightsDataRepo extends JpaRepository<BookedFlightsData, Integer> {
    List<BookedFlightsData> findByPnrNumber(String pnrNo);
}
