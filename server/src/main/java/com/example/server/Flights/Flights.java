package com.example.server.Flights;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Flights {

    @Id
    private int id;
    private String flightNumber;
    private String airLine;
    private String fromPlace;
    private String toPlace;
    private String departureTime;
    private String arrivalTime;
    private String duration;
    private String price;
    private String seatsAvailable;
    private String stops;
    private String classType;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getAirLine() {
        return airLine;
    }

    public void setAirLine(String airLine) {
        this.airLine = airLine;
    }

    public String getFrom() {
        return fromPlace;
    }

    public void setFrom(String fromPlace) {
        this.fromPlace = fromPlace;
    }

    public String getTo() {
        return toPlace;
    }

    public void setTo(String toPlace) {
        this.toPlace = toPlace;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getSeatsAvailable() {
        return seatsAvailable;
    }

    public void setSeatsAvailable(String seatsAvailable) {
        this.seatsAvailable = seatsAvailable;
    }

    public String getStops() {
        return stops;
    }

    public void setStops(String stops) {
        this.stops = stops;
    }

    public String getClassType() {
        return classType;
    }

    public void setClassType(String classType) {
        this.classType = classType;
    }

    public Flights(int id, String flightNumber, String airLine, String fromPlace, String toPlace, String departureTime,
            String arrivalTime, String duration, String price, String seatsAvailable, String stops, String classType) {
        this.id = id;
        this.flightNumber = flightNumber;
        this.airLine = airLine;
        this.fromPlace = fromPlace;
        this.toPlace = toPlace;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.duration = duration;
        this.price = price;
        this.seatsAvailable = seatsAvailable;
        this.stops = stops;
        this.classType = classType;
    }

    public Flights() {

    }
}
