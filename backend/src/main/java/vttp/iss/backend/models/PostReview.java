package vttp.iss.backend.models;

public class PostReview {
    
    private String user;
    private String comments;
    private Integer rating;
    private String date;

    public PostReview() {
    }

    public PostReview(String user, String comments, Integer rating, String date) {
        this.user = user;
        this.comments = comments;
        this.rating = rating;
        this.date = date;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
