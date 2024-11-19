package com.example.server.AirportsList;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Airports {
    @Id
    private int Id;

    private String airport_name;

    private String name;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getAirportName() {
        return airport_name;
    }

    public void setAirportName(String name) {
        this.name = name;
    }

    public String getAirportCode() {
        return name;
    }

    public void setAirportCode(String name) {
        this.name = name;
    }

    public Airports(int id, String airport_name, String name) {
        Id = id;
        this.airport_name=airport_name;
        this.name = name;
    }

    public Airports() {

    }

}
