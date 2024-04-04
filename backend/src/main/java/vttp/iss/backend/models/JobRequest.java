package vttp.iss.backend.models;

public class JobRequest {
    
    private int jobId;

    private String timestamp;

    private String user;

    private String merchant;

    private String userPostalCode;

    private String merchantPostalCode;

    private int status;

    private String completedTimestamp;

    public JobRequest(String timestamp, String user) {
        this.timestamp = timestamp;
        this.user = user;
    }

    public JobRequest(String timestamp, String merchant, int status) {
        this.timestamp = timestamp;
        this.merchant = merchant;
        this.status = status;
    }

    public JobRequest(String timestamp, String user, String merchant, String userPostalCode,
            String merchantPostalCode, int status) {
        this.timestamp = timestamp;
        this.user = user;
        this.merchant = merchant;
        this.userPostalCode = userPostalCode;
        this.merchantPostalCode = merchantPostalCode;
        this.status = status;
    }

    public JobRequest(int jobId, String timestamp, String user, String merchant, String userPostalCode,
            String merchantPostalCode, int status, String completedTimestamp) {
        this.jobId = jobId;
        this.timestamp = timestamp;
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

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
