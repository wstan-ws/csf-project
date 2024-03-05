package vttp.iss.backend.controllers;

import java.io.StringReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp.iss.backend.models.Merchant;
import vttp.iss.backend.models.User;
import vttp.iss.backend.services.MainService;

@RestController
@CrossOrigin()
@RequestMapping(path = "/api")
public class SignupController {

    @Autowired
    private MainService mainSvc;

    @PostMapping(path = "/usersignup")
    public ResponseEntity<String> userSignup(@RequestBody String payload) {
        
        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject obj = reader.readObject();
       
        User user = User.toUser(obj);
        
        mainSvc.userSignup(user);
        
        return ResponseEntity.status(HttpStatusCode.valueOf(200)).body("{}");
    }
    
    @PostMapping(path = "/merchantsignup")
    public ResponseEntity<String> merchantSignup(@RequestBody String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject obj = reader.readObject();
        
        Merchant merchant = Merchant.toMerchant(obj);

        mainSvc.merchantSignup(merchant);

        return ResponseEntity.ok().body("{}");
    }
}
