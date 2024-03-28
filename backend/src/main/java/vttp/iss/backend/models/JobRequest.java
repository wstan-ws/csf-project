package vttp.iss.backend.models;

public class JobRequest {
    
    private String user;

    public JobRequest(String user) {
        this.user = user;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "JobRequest [user=" + user + "]";
    }
}
