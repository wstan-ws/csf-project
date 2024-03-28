package vttp.iss.backend.repositories;

import java.util.ArrayList;
import java.util.Date;
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
                jobRequest.getUser(),
                jobRequest.getMerchant(),
                jobRequest.getUserPostalCode(),
                jobRequest.getMerchantPostalCode(),
                jobRequest.getStatus() 
                );
        }
    }

    public List<JobRequest> getAllRequest(String filter) {

        SqlRowSet rs = template.queryForRowSet(Utils.SQL_GET_JOB_REQUEST,
            filter, 0);

        List<JobRequest> jobList = new ArrayList<>();
        if (rs.next()) {
            int jobId = rs.getInt("job_id");
            Date timestamp = rs.getDate("timestamp");
            String user = rs.getString("user_username");
            String merchant = rs.getString("merchant_username");
            String userPostalCode = rs.getString("user_postal_code");
            String merchantPostalCode = rs.getString("merchant_postal_code");
            int status = rs.getInt("status");
            JobRequest jobRequest = new JobRequest(jobId, timestamp, user, merchant, userPostalCode, merchantPostalCode, status);
            jobList.add(jobRequest);
        }

        return jobList;
    }
}
