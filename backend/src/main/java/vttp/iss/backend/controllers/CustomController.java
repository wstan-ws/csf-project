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
import vttp.iss.backend.services.MainService;

@RestController
@CrossOrigin()
@RequestMapping(path = "/api")
public class CustomController {

    @Autowired
    private MainService mainSvc;

    @GetMapping(path = "/usernamelist")
    public ResponseEntity<String> getUsersUsername() {

        List<String> usernameList = mainSvc.getUsersUsername();

        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();

        for (String username : usernameList) {
            JsonObjectBuilder objBuilder = Json.createObjectBuilder();
            JsonObjectBuilder o = objBuilder.add("username", username);
            arrBuilder.add(o);
        }

        JsonArray arr = arrBuilder.build();
        System.out.println(arr);

        return ResponseEntity.ok().body(arr.toString());
    }

    
}
