package vttp.iss.backend.models;

public class Review {
    
    private Integer reviewId;

    private String jobId;

    private Integer rating;

    private String comments;

    private String date;

    private String time;

    public Review() {
    }

    public Review(String jobId, Integer rating, String comments, String date, String time) {
        this.jobId = jobId;
        this.rating = rating;
        this.comments = comments;
        this.date = date;
        this.time = time;
    }

    public Review(Integer reviewId, String jobId, Integer rating, String comments, String date, String time) {
        this.reviewId = reviewId;
        this.jobId = jobId;
        this.rating = rating;
        this.comments = comments;
        this.date = date;
        this.time = time;
    }

    public Integer getReviewId() {
        return reviewId;
    }

    public void setReviewId(Integer reviewId) {
        this.reviewId = reviewId;
    }

    public String getJobId() {
        return jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
