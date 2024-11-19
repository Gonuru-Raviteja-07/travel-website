package com.example.server.Flights;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightsRepo extends JpaRepository<Flights, Integer> {
    List<Flights> findByFromPlaceAndToPlace(String fromPlace, String toPlace);

    List<Flights> findByToPlaceAndFromPlace(String toPlace, String fromPlace);
}
