package vttp.iss.backend.models;

import java.io.Serializable;
import java.util.Date;

public class Message implements Serializable {
    
    private String username;

    private String message;

    private Date timestamp;

    public Message() {
    }

    public Message(String username, String message, Date timestamp) {
        this.username = username;
        this.message = message;
        this.timestamp = timestamp;
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

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "Message [username=" + username + ", message=" + message + ", timestamp=" + timestamp + "]";
    }
}
