package vttp.iss.backend.models;

import jakarta.json.JsonObject;

public class Merchant {
    
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String companyName;
    private String username;
    private String password;
    private Boolean elec;
    private String elecLicenseNo;
    private Boolean plum;
    private String plumLicenseNo;
    private Boolean aircon;
    private String airconLicenseNo;
    private Boolean active;

    public Merchant(String firstName, String lastName, String email, String phoneNumber, String companyName,
            String username, String password, Boolean elec, String elecLicenseNo, Boolean plum, String plumLicenseNo,
            Boolean aircon, String airconLicenseNo) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.companyName = companyName;
        this.username = username;
        this.password = password;
        this.elec = elec;
        this.elecLicenseNo = elecLicenseNo;
        this.plum = plum;
        this.plumLicenseNo = plumLicenseNo;
        this.aircon = aircon;
        this.airconLicenseNo = airconLicenseNo;
    }

    public Merchant(String firstName, String lastName, String email, String phoneNumber, String companyName,
            String username, String password, Boolean elec, String elecLicenseNo, Boolean plum, String plumLicenseNo,
            Boolean aircon, String airconLicenseNo, Boolean active) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.companyName = companyName;
        this.username = username;
        this.password = password;
        this.elec = elec;
        this.elecLicenseNo = elecLicenseNo;
        this.plum = plum;
        this.plumLicenseNo = plumLicenseNo;
        this.aircon = aircon;
        this.airconLicenseNo = airconLicenseNo;
        this.active = active;
    }

    public static Merchant toMerchant(JsonObject obj) {

        String firstName = obj.getString("firstName");
        String lastName = obj.getString("lastName");
        String email = obj.getString("email");
        String phoneNumber = obj.getString("phoneNumber");
        String companyName = obj.getString("companyName");
        String username = obj.getString("username");
        String password = obj.getString("password");
        Boolean elec = obj.getBoolean("elec");
        String elecLicenseNo = obj.getString("elecLicenseNo");
        Boolean plum = obj.getBoolean("plum");
        String plumLicenseNo = obj.getString("plumLicenseNo");
        Boolean aircon = obj.getBoolean("aircon");
        String airconLicenseNo = obj.getString("airconLicenseNo");

        return new Merchant(firstName, lastName, email, phoneNumber, companyName, username, password, elec, elecLicenseNo, plum, plumLicenseNo, aircon, airconLicenseNo);
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getElec() {
        return elec;
    }

    public void setElec(Boolean elec) {
        this.elec = elec;
    }

    public String getElecLicenseNo() {
        return elecLicenseNo;
    }

    public void setElecLicenseNo(String elecLicenseNo) {
        this.elecLicenseNo = elecLicenseNo;
    }

    public Boolean getPlum() {
        return plum;
    }

    public void setPlum(Boolean plum) {
        this.plum = plum;
    }

    public String getPlumLicenseNo() {
        return plumLicenseNo;
    }

    public void setPlumLicenseNo(String plumLicenseNo) {
        this.plumLicenseNo = plumLicenseNo;
    }

    public Boolean getAircon() {
        return aircon;
    }

    public void setAircon(Boolean aircon) {
        this.aircon = aircon;
    }

    public String getAirconLicenseNo() {
        return airconLicenseNo;
    }

    public void setAirconLicenseNo(String airconLicenseNo) {
        this.airconLicenseNo = airconLicenseNo;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    @Override
    public String toString() {
        return "Merchant [firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + ", phoneNumber="
                + phoneNumber + ", companyName=" + companyName + ", username=" + username + ", password=" + password
                + ", elec=" + elec + ", elecLicenseNo=" + elecLicenseNo + ", plum=" + plum + ", plumLicenseNo="
                + plumLicenseNo + ", aircon=" + aircon + ", airconLicenseNo=" + airconLicenseNo + ", active=" + active
                + "]";
    }
}
