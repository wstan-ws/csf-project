package vttp.iss.backend.models;

public class JobRequest {
    
    private String jobId;

    private String timestamp;

    private String user;

    private String merchant;

    private String type;

    private String scheduledDate;

    private String scheduledTime;

    private String userPostalCode;

    private String merchantPostalCode;

    private int status;

    private String completedTimestamp;

    public JobRequest(String jobId, String timestamp, String user, String type) {
        this.jobId = jobId;
        this.timestamp = timestamp;
        this.user = user;
        this.type = type;
    }

    public JobRequest(String jobId, String timestamp, String user, String type, String scheduledDate, String scheduledTime) {
        this.jobId = jobId;
        this.timestamp = timestamp;
        this.user = user;
        this.type = type;
        this.scheduledDate = scheduledDate;
        this.scheduledTime = scheduledTime;
    }

    public JobRequest(String jobId, String timestamp, String merchant, int status, String type) {
        this.jobId = jobId;
        this.timestamp = timestamp;
        this.merchant = merchant;
        this.status = status;
        this.type = type;
    }

    public JobRequest(String jobId, String timestamp, String merchant, int status, String type, String scheduledDate, String scheduledTime) {
        this.jobId = jobId;
        this.timestamp = timestamp;
        this.merchant = merchant;
        this.status = status;
        this.type = type;
        this.scheduledDate = scheduledDate;
        this.scheduledTime = scheduledTime;
    }

    public JobRequest(String jobId, String timestamp, String user, String merchant, String type, String scheduleDate, String scheduledTime, String userPostalCode,
            String merchantPostalCode, int status) {
        this.jobId = jobId;
        this.timestamp = timestamp;
        this.user = user;
        this.merchant = merchant;
        this.type = type;
        this.scheduledDate = scheduleDate;
        this.scheduledTime = scheduledTime;
        this.userPostalCode = userPostalCode;
        this.merchantPostalCode = merchantPostalCode;
        this.status = status;
    }

    public JobRequest(String jobId, String timestamp, String user, String merchant, String type, String scheduledDate,
            String scheduledTime, String userPostalCode, String merchantPostalCode, int status,
            String completedTimestamp) {
        this.jobId = jobId;
        this.timestamp = timestamp;
        this.user = user;
        this.merchant = merchant;
        this.type = type;
        this.scheduledDate = scheduledDate;
        this.scheduledTime = scheduledTime;
        this.userPostalCode = userPostalCode;
        this.merchantPostalCode = merchantPostalCode;
        this.status = status;
        this.completedTimestamp = completedTimestamp;
    }

    public String getJobId() {
        return jobId;
    }

    public void setJobId(String jobId) {
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getScheduledDate() {
        return scheduledDate;
    }

    public void setScheduledDate(String scheduledDate) {
        this.scheduledDate = scheduledDate;
    }

    public String getScheduledTime() {
        return scheduledTime;
    }

    public void setScheduledTime(String scheduledTime) {
        this.scheduledTime = scheduledTime;
    }
}
