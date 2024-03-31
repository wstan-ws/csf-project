package vttp.iss.backend.models;

public class JobRequest {
    
    private int jobId;

    private String date;

    private String time;

    private String user;

    private String merchant;

    private String userPostalCode;

    private String merchantPostalCode;

    private int status;

    private String completedTimestamp;

    public JobRequest(String date, String time, String user) {
        this.date = date;
        this.time = time;
        this.user = user;
    }

    public JobRequest(String date, String time, String merchant, int status) {
        this.date = date;
        this.time = time;
        this.merchant = merchant;
        this.status = status;
    }

    public JobRequest(String date, String time, String user, String merchant, String userPostalCode,
            String merchantPostalCode, int status) {
        this.date = date;
        this.time = time;
        this.user = user;
        this.merchant = merchant;
        this.userPostalCode = userPostalCode;
        this.merchantPostalCode = merchantPostalCode;
        this.status = status;
    }

    public JobRequest(int jobId, String date, String time, String user, String merchant, String userPostalCode,
            String merchantPostalCode, int status, String completedTimestamp) {
        this.jobId = jobId;
        this.date = date;
        this.time = time;
        this.user = user;
        this.merchant = merchant;
        this.userPostalCode = userPostalCode;
        this.merchantPostalCode = merchantPostalCode;
        this.status = status;
        this.completedTimestamp = completedTimestamp;
    }

    public int getJobId() {
        return jobId;
    }

    public void setJobId(int jobId) {
        this.jobId = jobId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getMerchant() {
        return merchant;
    }

    public void setMerchant(String merchant) {
        this.merchant = merchant;
    }

    public String getUserPostalCode() {
        return userPostalCode;
    }

    public void setUserPostalCode(String userPostalCode) {
        this.userPostalCode = userPostalCode;
    }

    public String getMerchantPostalCode() {
        return merchantPostalCode;
    }

    public void setMerchantPostalCode(String merchantPostalCode) {
        this.merchantPostalCode = merchantPostalCode;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getCompletedTimestamp() {
        return completedTimestamp;
    }

    public void setCompletedTimestamp(String completedTimestamp) {
        this.completedTimestamp = completedTimestamp;
    }
    
}
