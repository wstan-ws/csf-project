package vttp.iss.backend.controllers;

import java.io.StringReader;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import jakarta.json.JsonReader;
import vttp.iss.backend.models.JobRequest;
import vttp.iss.backend.models.Merchant;
import vttp.iss.backend.models.User;
import vttp.iss.backend.services.MainService;

@RestController
@CrossOrigin()
@RequestMapping(path = "/api")
public class JobController {
    
    @Autowired
    private MainService mainSvc;

    @PostMapping(path = "/postnewjobrequest")
    public ResponseEntity<String> postNewJobRequest(@RequestBody String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject obj = reader.readObject();

        String user = obj.getString("user");
        String merchant = obj.getString("merchant");
        String timestamp = obj.getString("timestamp");

        User userDetails = mainSvc.getUserDetails(user);
        Merchant merchantDetails = mainSvc.getMerchantDetails(merchant);

        String userPostalCode = userDetails.getPostalCode();
        String merchantPostalCode = merchantDetails.getPostalCode();
        int status = 0;

        JobRequest jobRequest = new JobRequest(timestamp, user, merchant, userPostalCode, merchantPostalCode, status);

        mainSvc.postNewJobRequest(jobRequest);

        return ResponseEntity.ok().body("{}");
    }

    @GetMapping(path = "/getalljobrequests/{filter}")
    public ResponseEntity<String> getAllJobRequests(@PathVariable String filter) {

        List<JobRequest> jobList = mainSvc.getAllRequests(filter);

        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        for (JobRequest job : jobList) {
            JsonObjectBuilder objBuilder = Json.createObjectBuilder();
            if (job.getCompletedTimestamp() != null) {
                objBuilder.add("jobId", job.getJobId())
                .add("timestamp", job.getTimestamp())
                .add("user", job.getUser())
                .add("merchant", job.getMerchant())
                .add("userPostalCode", job.getUserPostalCode())
                .add("merchantPostalCode", job.getMerchantPostalCode())
                .add("status", job.getStatus())
                .add("completedTimestamp", job.getCompletedTimestamp());
            } else {
                objBuilder.add("jobId", job.getJobId())
                .add("timestamp", job.getTimestamp())
                .add("user", job.getUser())
                .add("merchant", job.getMerchant())
                .add("userPostalCode", job.getUserPostalCode())
                .add("merchantPostalCode", job.getMerchantPostalCode())
                .add("status", job.getStatus())
                .add("completedTimestamp", "");
            }
            
            arrBuilder.add(objBuilder);
        }

        JsonArray arr = arrBuilder.build();

        return ResponseEntity.ok().body(arr.toString());
    }

    @PatchMapping(path = "/editjobrequeststatus/{filter}")
    public ResponseEntity<String> editJobRequestStatus(@PathVariable String filter, @RequestBody String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject obj = reader.readObject();

        String timestamp = obj.getString("timestamp");
        int status = obj.getInt("status");

        mainSvc.editJobRequestStatus(filter, timestamp, status);

        return ResponseEntity.ok().body("{}");
    }

    @GetMapping(path = "/getallacceptedjobs/{filter}")
    public ResponseEntity<String> getAllAcceptedJobs(@PathVariable String filter) {

        List<JobRequest> jobList = mainSvc.getAcceptedJobs(filter);

        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        for (JobRequest job : jobList) {
            JsonObjectBuilder objBuilder = Json.createObjectBuilder();
            if (job.getCompletedTimestamp() != null) {
                objBuilder.add("jobId", job.getJobId())
                .add("timestamp", job.getTimestamp())
                .add("user", job.getUser())
                .add("merchant", job.getMerchant())
                .add("userPostalCode", job.getUserPostalCode())
                .add("merchantPostalCode", job.getMerchantPostalCode())
                .add("status", job.getStatus())
                .add("completedTimestamp", job.getCompletedTimestamp());
            } else {
                objBuilder.add("jobId", job.getJobId())
                .add("timestamp", job.getTimestamp())
                .add("user", job.getUser())
                .add("merchant", job.getMerchant())
                .add("userPostalCode", job.getUserPostalCode())
                .add("merchantPostalCode", job.getMerchantPostalCode())
                .add("status", job.getStatus())
                .add("completedTimestamp", "");
            }

            arrBuilder.add(objBuilder);
        }

        JsonArray arr = arrBuilder.build();

        return ResponseEntity.ok().body(arr.toString());
    }

    @GetMapping(path = "/getalluserservices/{filter}")
    public ResponseEntity<String> getAllUserServices(@PathVariable String filter) {

        List<JobRequest> jobList = mainSvc.getUserServices(filter);

        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        for (JobRequest job : jobList) {
            JsonObjectBuilder objBuilder = Json.createObjectBuilder();
            if (job.getCompletedTimestamp() != null) {
                objBuilder.add("jobId", job.getJobId())
                .add("timestamp", job.getTimestamp())
                .add("user", job.getUser())
                .add("merchant", job.getMerchant())
                .add("userPostalCode", job.getUserPostalCode())
                .add("merchantPostalCode", job.getMerchantPostalCode())
                .add("status", job.getStatus())
                .add("completedTimestamp", job.getCompletedTimestamp());
            } else {
                objBuilder.add("jobId", job.getJobId())
                .add("timestamp", job.getTimestamp())
                .add("user", job.getUser())
                .add("merchant", job.getMerchant())
                .add("userPostalCode", job.getUserPostalCode())
                .add("merchantPostalCode", job.getMerchantPostalCode())
                .add("status", job.getStatus())
                .add("completedTimestamp", "");
            }

            arrBuilder.add(objBuilder);
        }

        JsonArray arr = arrBuilder.build();

        return ResponseEntity.ok().body(arr.toString());
    }

    @GetMapping(path = "/getongoingjob/{filter}")
    public ResponseEntity<String> getOngoingJob(@PathVariable String filter) {

        JobRequest jobRequest = mainSvc.getOngoingJob(filter);

        JsonObjectBuilder objBuilder = Json.createObjectBuilder();
        if (jobRequest.getCompletedTimestamp() != null) {
            objBuilder.add("jobId", jobRequest.getJobId())
            .add("timestamp", jobRequest.getTimestamp())
            .add("user", jobRequest.getUser())
            .add("merchant", jobRequest.getMerchant())
            .add("userPostalCode", jobRequest.getUserPostalCode())
            .add("merchantPostalCode", jobRequest.getMerchantPostalCode())
            .add("status", jobRequest.getStatus())
            .add("completedTimestamp", jobRequest.getCompletedTimestamp());
        } else {
            objBuilder.add("jobId", jobRequest.getJobId())
            .add("timestamp", jobRequest.getTimestamp())
            .add("user", jobRequest.getUser())
            .add("merchant", jobRequest.getMerchant())
            .add("userPostalCode", jobRequest.getUserPostalCode())
            .add("merchantPostalCode", jobRequest.getMerchantPostalCode())
            .add("status", jobRequest.getStatus())
            .add("completedTimestamp", "");
        }

        JsonObject obj = objBuilder.build();

        return ResponseEntity.ok().body(obj.toString());
    }

    @PatchMapping(path = "/completejobrequest/{filter}")
    public ResponseEntity<String> completeJobRequest(@PathVariable String filter, @RequestBody String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject obj = reader.readObject();

        int status = obj.getInt("status");
        String completedTimestamp = obj.getString("completedTimestamp");

        mainSvc.completeRequest(filter, status, completedTimestamp);

        return ResponseEntity.ok().body("{}");
    }

    @GetMapping(path = "/getuserjobhistory/{filter}")
    public ResponseEntity<String> getUserJobHistory(@PathVariable String filter) {

        List<JobRequest> jobList = mainSvc.getUserJobHistory(filter);

        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        for (JobRequest job : jobList) {
            JsonObjectBuilder objBuilder = Json.createObjectBuilder();
            objBuilder
                .add("jobId", job.getJobId())
                .add("timestamp", job.getTimestamp())
                .add("user", job.getUser())
                .add("merchant", job.getMerchant())
                .add("userPostalCode", job.getUserPostalCode())
                .add("merchantPostalCode", job.getMerchantPostalCode())
                .add("status", job.getStatus())
                .add("completedTimestamp", job.getCompletedTimestamp());
            arrBuilder.add(objBuilder);
        }

        JsonArray arr = arrBuilder.build();

        return ResponseEntity.ok().body(arr.toString());
    }
}
