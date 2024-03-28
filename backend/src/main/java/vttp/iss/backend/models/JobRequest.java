package vttp.iss.backend.models;

import java.util.Date;

public class JobRequest {
    
    private int jobId;

    private Date timestamp;

    private String user;

    private String merchant;

    private String userPostalCode;

    private String merchantPostalCode;

    private int status;

    public JobRequest(String user) {
        this.user = user;
    }

    public JobRequest(String user, String merchant, String userPostalCode, String merchantPostalCode,
            int status) {
        this.user = user;
        this.merchant = merchant;
        this.userPostalCode = userPostalCode;
        this.merchantPostalCode = merchantPostalCode;
        this.status = status;
    }

    public JobRequest(int jobId, Date timestamp, String user, String merchant, String userPostalCode,
            String merchantPostalCode, int status) {
        this.jobId = jobId;
        this.timestamp = timestamp;
        this.user = user;
        this.merchant = merchant;
        this.userPostalCode = userPostalCode;
        this.merchantPostalCode = merchantPostalCode;
        this.status = status;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public int getJobId() {
        return jobId;
    }

    public void setJobId(int jobId) {
        this.jobId = jobId;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
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

    @Override
    public String toString() {
        return "JobRequest [jobId=" + jobId + ", timestamp=" + timestamp + ", user=" + user + ", merchant=" + merchant
                + ", userPostalCode=" + userPostalCode + ", merchantPostalCode=" + merchantPostalCode + ", status="
                + status + "]";
    }
}
