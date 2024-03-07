package vttp.iss.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import vttp.iss.backend.models.LoginDetails;
import vttp.iss.backend.models.User;
import vttp.iss.backend.services.MainService;

@RestController
@CrossOrigin()
@RequestMapping(path = "/api")
public class CustomController {

    @Autowired
    private MainService mainSvc;

    @GetMapping(path = "/userlogindetails")
    public ResponseEntity<String> getUsersLoginDetails() {

        List<LoginDetails> loginDetailsList = mainSvc.getUsersLoginDetails();

        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();

        for (LoginDetails loginDetails : loginDetailsList) {
            JsonObjectBuilder objBuilder = Json.createObjectBuilder();
            JsonObjectBuilder o = objBuilder
                .add("username", loginDetails.getUsername())
                .add("password", loginDetails.getPassword());
            arrBuilder.add(o);
        }

        JsonArray arr = arrBuilder.build();

        return ResponseEntity.ok().body(arr.toString());
    }

    @GetMapping(path = "/merchantlogindetails")
    public ResponseEntity<String> getMerchantsLoginDetails() {

        List<LoginDetails> loginDetailsList = mainSvc.getMerchantsLoginDetails();

        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();

        for (LoginDetails loginDetails : loginDetailsList) {
            JsonObjectBuilder objBuilder = Json.createObjectBuilder();
            JsonObjectBuilder o = objBuilder
                .add("username", loginDetails.getUsername())
                .add("password", loginDetails.getPassword());
            arrBuilder.add(o);
        }

        JsonArray arr = arrBuilder.build();

        return ResponseEntity.ok().body(arr.toString());
    }

    @GetMapping(path = "/userdetails/{filter}")
    public ResponseEntity<String> getUserDetails(@PathVariable String filter) {

        User user = mainSvc.getUserDetails(filter);

        JsonObjectBuilder objBuilder = Json.createObjectBuilder();
        JsonObject o = objBuilder
            .add("firstName", user.getFirstName())
            .add("lastName", user.getLastName())
            .add("email", user.getEmail())
            .add("phoneNumber", user.getPhoneNumber())
            .add("address", user.getAddress())
            .add("username", user.getUsername())
            .add("password", user.getPassword())
            .build();

        return ResponseEntity.ok().body(o.toString());
    }

    @PatchMapping(path = "/edituserdetails/{filter}")
    public ResponseEntity<String> editUserDetails(@PathVariable String filter, @RequestBody String payload) {

        mainSvc.editUserDetails(filter, payload);

        return ResponseEntity.ok().body("{}");
    }

    @PatchMapping(path = "/edituserpassword/{filter}")
    public ResponseEntity<String> editUserPassword(@PathVariable String filter, @RequestBody String password) {

        mainSvc.editUserPassword(filter, password);

        return ResponseEntity.ok().body("{}");
    }
}
