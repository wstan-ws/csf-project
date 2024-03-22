package vttp.iss.backend.models;

import jakarta.json.JsonObject;

public class User {
    
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;
    private String postalCode;
    private String username;
    private String password;
    
    public User() {
    }

    public User(String firstName, String lastName, String email, String phoneNumber, String address, String postalCode,
            String username, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.postalCode = postalCode;
        this.username = username;
        this.password = password;
    }

    public static User toUser(JsonObject obj) {
        String firstName = obj.getString("firstName");
        String lastName = obj.getString("lastName");
        String email = obj.getString("email");
        String phoneNumber = obj.getString("phoneNumber");
        String address = obj.getString("address");
        String postalCode = obj.getString("postalCode");
        String username = obj.getString("username");
        String password = obj.getString("password");

        return new User(firstName, lastName, email, phoneNumber, address, postalCode, username, password);
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
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
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
    public String getPostalCode() {
        return postalCode;
    }
    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    @Override
    public String toString() {
        return "User [firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + ", phoneNumber="
                + phoneNumber + ", address=" + address + ", postalCode=" + postalCode + ", username=" + username
                + ", password=" + password + "]";
    }
}
