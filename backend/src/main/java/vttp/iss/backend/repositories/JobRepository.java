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
                jobRequest.getDate(),
                jobRequest.getTime(),
                jobRequest.getUser(),
                jobRequest.getMerchant(),
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
            int jobId = rs.getInt("job_id");
            String date = rs.getString("date");
            String time = rs.getString("time");
            String user = rs.getString("user_username");
            String merchant = rs.getString("merchant_username");
            String userPostalCode = rs.getString("user_postal_code");
            String merchantPostalCode = rs.getString("merchant_postal_code");
            int status = rs.getInt("status");
            String completedTimestamp = rs.getString("completed_timestamp");
            JobRequest jobRequest = new JobRequest(jobId, date, time, user, merchant, userPostalCode, merchantPostalCode, status, completedTimestamp);
            jobList.add(jobRequest);
        }

        return jobList;
    }

    public void editJobRequestStatus(String usernames, String date, String time, int status) {

        template.update(Utils.SQL_EDIT_JOB_REQUEST_STATUS, 
            date,
            time,
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
            int jobId = rs.getInt("job_id");
            String date = rs.getString("date");
            String time = rs.getString("time");
            String user = rs.getString("user_username");
            String merchant = rs.getString("merchant_username");
            String userPostalCode = rs.getString("user_postal_code");
            String merchantPostalCode = rs.getString("merchant_postal_code");
            int status = rs.getInt("status");
            String completedTimestamp = rs.getString("completed_timestamp");
            JobRequest jobRequest = new JobRequest(jobId, date, time, user, merchant, userPostalCode, merchantPostalCode, status, completedTimestamp);
            jobList.add(jobRequest);
        }

        return jobList;
    }

    public List<JobRequest> getUserServices(String filter) {

        SqlRowSet rs = template.queryForRowSet(Utils.SQL_GET_SERVICES,
            filter, 1);

        List<JobRequest> jobList = new ArrayList<>();
        while (rs.next()) {
            int jobId = rs.getInt("job_id");
            String date = rs.getString("date");
            String time = rs.getString("time");
            String user = rs.getString("user_username");
            String merchant = rs.getString("merchant_username");
            String userPostalCode = rs.getString("user_postal_code");
            String merchantPostalCode = rs.getString("merchant_postal_code");
            int status = rs.getInt("status");
            String completedTimestamp = rs.getString("completed_timestamp");
            JobRequest jobRequest = new JobRequest(jobId, date, time, user, merchant, userPostalCode, merchantPostalCode, status, completedTimestamp);
            jobList.add(jobRequest);
        }

        return jobList;
    }

    public JobRequest getOngoingJob(String filter) {

        String userUsername = filter.split("-")[0];
        String merchantUsername = filter.split("-")[1];

        SqlRowSet rs = template.queryForRowSet(Utils.SQL_USER_GET_ONGOING_JOBS,
            userUsername, merchantUsername, 1);

        JobRequest jobRequest = null;

        while (rs.next()) {
            int jobId = rs.getInt("job_id");
            String date = rs.getString("date");
            String time = rs.getString("time");
            String user = rs.getString("user_username");
            String merchant = rs.getString("merchant_username");
            String userPostalCode = rs.getString("user_postal_code");
            String merchantPostalCode = rs.getString("merchant_postal_code");
            int status = rs.getInt("status");
            String completedTimestamp = rs.getString("completed_timestamp");
            jobRequest = new JobRequest(jobId, date, time, user, merchant, userPostalCode, merchantPostalCode, status, completedTimestamp);
        }

        return jobRequest;
    }
}
