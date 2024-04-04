package vttp.iss.backend.controllers;

import java.io.StringReader;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
import vttp.iss.backend.models.PostReview;
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

    @GetMapping(path = "getreviews/{filter}")
    public ResponseEntity<String> getReviewsByMerchant(@PathVariable String filter) {

        List<PostReview> reviewList = mainSvc.getReviewsByMerchant(filter);

        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        for (PostReview review : reviewList) {
            JsonObjectBuilder objBuilder = Json.createObjectBuilder();
            objBuilder
                .add("user", review.getUser())
                .add("comments", review.getComments())
                .add("rating", review.getRating())
                .add("date", review.getDate());
                
            arrBuilder.add(objBuilder);
        }

        JsonArray arr = arrBuilder.build();

        return ResponseEntity.ok().body(arr.toString());
    }
}
