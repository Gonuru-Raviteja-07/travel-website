package com.example.server.AirportsList;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AirportsRepo extends JpaRepository<Airports, Integer> {
    List<Airports> findByNameContainingIgnoreCase(String name);
}
