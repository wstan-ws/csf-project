package vttp.iss.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObjectBuilder;
import vttp.iss.backend.models.LoginDetails;
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
}
