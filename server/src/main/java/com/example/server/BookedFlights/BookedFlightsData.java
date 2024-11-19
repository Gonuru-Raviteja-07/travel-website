package com.example.server.BookedFlights;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class BookedFlightsData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String pnrNumber;
    private String fullName;
    private String flightNumber;
    private String selectedCabin;
    private String fromDate;
    private String toDate;
    @Column(name = "`from`")
    private String from;
    @Column(name = "`to`")
    private String to;
    private String departureTime;
    private String arrivalTime;
    private String airLine;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPnrNumber() {
        return pnrNumber;
    }

    public void setPnrNumber(String pnrNumber) {
        this.pnrNumber = pnrNumber;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getSelectedCabin() {
        return selectedCabin;
    }

    public void setSelectedCabin(String selectedCabin) {
        this.selectedCabin = selectedCabin;
    }

    public String getFromDate() {
        return fromDate;
    }

    public void setFromDate(String fromDate) {
        this.fromDate = fromDate;
    }

    public String getToDate() {
        return toDate;
    }

    public void setToDate(String toDate) {
        this.toDate = toDate;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
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

    public String getAirLine() {
        return airLine;
    }

    public void setAirLine(String airLine) {
        this.airLine = airLine;
    }

    public BookedFlightsData(int id, String pnrNumber, String fullName, String flightNumber, String selectedCabin,
            String fromDate, String toDate, String from, String to, String departureTime, String arrivalTime,
            String airLine) {
        this.id = id;
        this.pnrNumber = pnrNumber;
        this.fullName = fullName;
        this.flightNumber = flightNumber;
        this.selectedCabin = selectedCabin;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.from = from;
        this.to = to;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.airLine = airLine;
    }

    public BookedFlightsData() {

    }

    @Override
    public String toString() {
        return "BookedFlightsData [id=" + id + ", pnrNumber=" + pnrNumber + ", fullName=" + fullName + ", flightNumber="
                + flightNumber + ", selectedCabin=" + selectedCabin + ", fromDate=" + fromDate + ", toDate=" + toDate
                + ", from=" + from + ", to=" + to + ", departureTime=" + departureTime + ", arrivalTime=" + arrivalTime
                + ", airLine=" + airLine + "]";
    }

}
