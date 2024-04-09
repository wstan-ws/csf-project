package vttp.iss.backend.repositories;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import vttp.iss.backend.Utils;
import vttp.iss.backend.models.JobRequest;

@Repository
public class JobRepository {
    
    @Autowired
    private JdbcTemplate template;

    public void postNewJobRequest(JobRequest jobRequest) {
        
        SqlRowSet rs = template.queryForRowSet(Utils.SQL_CHECK_JOB_REQUEST, 
            jobRequest.getUser(), 
            jobRequest.getMerchant(),
            0);

        if (!rs.next()) {
            template.update(
                Utils.SQL_POST_NEW_JOB_REQUEST,
                jobRequest.getJobId(),
                jobRequest.getTimestamp(),
                jobRequest.getUser(),
                jobRequest.getMerchant(),
                jobRequest.getType(),
                jobRequest.getScheduledDate(),
                jobRequest.getScheduledTime(),
                jobRequest.getUserPostalCode(),
                jobRequest.getMerchantPostalCode(),
                jobRequest.getStatus() 
                );
        }
    }

    public List<JobRequest> getAllRequest(String filter) {

        SqlRowSet rs = template.queryForRowSet(Utils.SQL_GET_JOBS,
            filter, 0);

        List<JobRequest> jobList = new ArrayList<>();
        while (rs.next()) {
            String jobId = rs.getString("job_id");
            String timestamp = rs.getString("timestamp");
            String user = rs.getString("user_username");
            String merchant = rs.getString("merchant_username");
            String type = rs.getString("type");
            String scheduledDate = rs.getString("scheduled_date");
            String scheduledTime = rs.getString("scheduled_time");
            String userPostalCode = rs.getString("user_postal_code");
            String merchantPostalCode = rs.getString("merchant_postal_code");
            int status = rs.getInt("status");
            String completedTimestamp = rs.getString("completed_timestamp");
            JobRequest jobRequest = new JobRequest(jobId, timestamp, user, merchant, type, scheduledDate, scheduledTime, userPostalCode, merchantPostalCode, status, completedTimestamp);
            jobList.add(jobRequest);
        }

        return jobList;
    }

    public void editJobRequestStatus(String usernames, String timestamp, int status) {

        template.update(Utils.SQL_EDIT_JOB_REQUEST_STATUS, 
            timestamp,
            status,
            usernames.split("-")[0],
            usernames.split("-")[1],
            0
        );
    }

    public List<JobRequest> getAllAcceptedJobs(String filter) {

        SqlRowSet rs = template.queryForRowSet(Utils.SQL_GET_JOBS, 
            filter, 1);

        List<JobRequest> jobList = new ArrayList<>();
        while (rs.next()) {
            String jobId = rs.getString("job_id");
            String timestamp = rs.getString("timestamp");
            String user = rs.getString("user_username");
            String merchant = rs.getString("merchant_username");
            String type = rs.getString("type");
            String scheduledDate = rs.getString("scheduled_date");
            String scheduledTime = rs.getString("scheduled_time");
            String userPostalCode = rs.getString("user_postal_code");
            String merchantPostalCode = rs.getString("merchant_postal_code");
            int status = rs.getInt("status");
            String completedTimestamp = rs.getString("completed_timestamp");
            JobRequest jobRequest = new JobRequest(jobId, timestamp, user, merchant, type, scheduledDate, scheduledTime, userPostalCode, merchantPostalCode, status, completedTimestamp);
            jobList.add(jobRequest);
        }

        return jobList;
    }

    public List<JobRequest> getUserServices(String filter) {

        SqlRowSet rs = template.queryForRowSet(Utils.SQL_GET_SERVICES,
            filter, 1);

        List<JobRequest> jobList = new ArrayList<>();
        while (rs.next()) {
            String jobId = rs.getString("job_id");
            String timestamp = rs.getString("timestamp");
            String user = rs.getString("user_username");
            String merchant = rs.getString("merchant_username");
            String type = rs.getString("type");
            String scheduledDate = rs.getString("scheduled_date");
            String scheduledTime = rs.getString("scheduled_time");
            String userPostalCode = rs.getString("user_postal_code");
            String merchantPostalCode = rs.getString("merchant_postal_code");
            int status = rs.getInt("status");
            String completedTimestamp = rs.getString("completed_timestamp");
            JobRequest jobRequest = new JobRequest(jobId, timestamp, user, merchant, type, scheduledDate, scheduledTime, userPostalCode, merchantPostalCode, status, completedTimestamp);
            jobList.add(jobRequest);
        }

        return jobList;
    }

    public JobRequest getOngoingJob(String filter) {

        SqlRowSet rs = template.queryForRowSet(Utils.SQL_USER_GET_ONGOING_JOBS,
            filter, 1);

        JobRequest jobRequest = null;

        while (rs.next()) {
            String jobId = rs.getString("job_id");
            String timestamp = rs.getString("timestamp");
            String user = rs.getString("user_username");
            String merchant = rs.getString("merchant_username");
            String type = rs.getString("type");
            String scheduledDate = rs.getString("scheduled_date");
            String scheduledTime = rs.getString("scheduled_time");
            String userPostalCode = rs.getString("user_postal_code");
            String merchantPostalCode = rs.getString("merchant_postal_code");
            int status = rs.getInt("status");
            String completedTimestamp = rs.getString("completed_timestamp");
            jobRequest = new JobRequest(jobId, timestamp, user, merchant, type, scheduledDate, scheduledTime, userPostalCode, merchantPostalCode, status, completedTimestamp);
        }

        return jobRequest;
    }

    public void completeRequest(String usernames, int status, String completedTimestamp, String jobId) {

        String user = usernames.split("-")[0];
        String merchant = usernames.split("-")[1];

        template.update(Utils.SQL_COMPLETE_REQUEST,
            status, completedTimestamp, user, merchant, 1, jobId);
    }

    public List<JobRequest> getUserJobHistory(String username) {

        SqlRowSet rs = template.queryForRowSet(Utils.SQL_GET_USER_HISTORY, username, 2, 3);

        List<JobRequest> jobList = new ArrayList<>();
        while (rs.next()) {
            String jobId = rs.getString("job_id");
            String timestamp = rs.getString("timestamp");
            String user = rs.getString("user_username");
            String merchant = rs.getString("merchant_username");
            String type = rs.getString("type");
            String scheduledDate = rs.getString("scheduled_date");
            String scheduledTime = rs.getString("scheduled_time");
            String userPostalCode = rs.getString("user_postal_code");
            String merchantPostalCode = rs.getString("merchant_postal_code");
            int status = rs.getInt("status");
            String completedTimestamp = rs.getString("completed_timestamp");
            JobRequest jobRequest = new JobRequest(jobId, timestamp, user, merchant, type, scheduledDate, scheduledTime, userPostalCode, merchantPostalCode, status, completedTimestamp);
            jobList.add(jobRequest);
        }

        return jobList;
    }

    public List<JobRequest> getMerchantJobHistory(String username) {

        SqlRowSet rs = template.queryForRowSet(Utils.SQL_GET_MERCHANT_HISTORY, username, 2, 3);

        List<JobRequest> jobList = new ArrayList<>();
        while (rs.next()) {
            String jobId = rs.getString("job_id");
            String timestamp = rs.getString("timestamp");
            String user = rs.getString("user_username");
            String merchant = rs.getString("merchant_username");
            String type = rs.getString("type");
            String scheduledDate = rs.getString("scheduled_date");
            String scheduledTime = rs.getString("scheduled_time");
            String userPostalCode = rs.getString("user_postal_code");
            String merchantPostalCode = rs.getString("merchant_postal_code");
            int status = rs.getInt("status");
            String completedTimestamp = rs.getString("completed_timestamp");
            JobRequest jobRequest = new JobRequest(jobId, timestamp, user, merchant, type, scheduledDate, scheduledTime, userPostalCode, merchantPostalCode, status, completedTimestamp);
            jobList.add(jobRequest);
        }

        return jobList;
    }
}
