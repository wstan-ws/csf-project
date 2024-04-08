package vttp.iss.backend.models;

import java.io.Serializable;

public class Message implements Serializable {
    
    private String username;

    private String message;

    private String timestamp;

    private String role;

    private String receiver;

    public Message() {
    }

    public Message(String username, String message, String timestamp, String role, String receiver) {
        this.username = username;
        this.message = message;
        this.timestamp = timestamp;
        this.role = role;
        this.receiver = receiver;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }
}
