package vttp.iss.backend.controllers;

import java.io.StringReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp.iss.backend.models.Review;
import vttp.iss.backend.services.MainService;

@RestController
@CrossOrigin()
@RequestMapping(path = "/api")
public class ReviewController {
    
    @Autowired
    private MainService mainSvc;

    @PostMapping(path = "postreview/{filter}")
    public ResponseEntity<String> postReview(@PathVariable String filter, @RequestBody String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject obj = reader.readObject();

        Integer jobId = obj.getInt("jobId");
        Integer rating = obj.getInt("rating");
        String comments = obj.getString("comments");
        String date = obj.getString("date");
        String time = obj.getString("time");

        Review review = new Review(jobId, rating, comments, date, time);

        mainSvc.postReview(review, filter);

        return ResponseEntity.ok().body("{}");
    }
}
