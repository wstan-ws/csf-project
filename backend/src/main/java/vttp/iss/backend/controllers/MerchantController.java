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
import vttp.iss.backend.models.LoginDetails;
import vttp.iss.backend.models.Merchant;
import vttp.iss.backend.services.MainService;

@RestController
@CrossOrigin()
@RequestMapping(path = "/api")
public class MerchantController {
    
    @Autowired
    private MainService mainSvc;

    @PostMapping(path = "/merchantsignup")
    public ResponseEntity<String> merchantSignup(@RequestBody String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject obj = reader.readObject();
        
        Merchant merchant = Merchant.toMerchant(obj);

        mainSvc.merchantSignup(merchant);

        return ResponseEntity.ok().body("{}");
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

    @GetMapping(path = "/merchantdetails/{filter}")
    public ResponseEntity<String> getMerchantDetails(@PathVariable String filter) {

        Merchant merchant = mainSvc.getMerchantDetails(filter);

        JsonObjectBuilder objBuilder = Json.createObjectBuilder();
        JsonObject o = objBuilder
            .add("firstName", merchant.getFirstName())
            .add("lastName", merchant.getLastName())
            .add("email", merchant.getEmail())
            .add("phoneNumber", merchant.getPhoneNumber())
            .add("companyName", merchant.getCompanyName())
            .add("username", merchant.getUsername())
            .add("password", merchant.getPassword())
            .add("elec", merchant.getElec())
            .add("elecLicenseNo", merchant.getElecLicenseNo())
            .add("plum", merchant.getPlum())
            .add("plumLicenseNo", merchant.getPlumLicenseNo())
            .add("aircon", merchant.getAircon())
            .add("airconLicenseNo", merchant.getAirconLicenseNo())
            .build();

        return ResponseEntity.ok().body(o.toString());
    }

    @PatchMapping(path = "/editmerchantdetails/{filter}")
    public ResponseEntity<String> editMerchantDetails(@PathVariable String filter, @RequestBody String payload) {

        mainSvc.editMerchantDetails(filter, payload);

        return ResponseEntity.ok().body("{}");
    }

    @PatchMapping(path = "/editmerchantpassword/{filter}")
    public ResponseEntity<String> editMerchantPassword(@PathVariable String filter, @RequestBody String password) {

        mainSvc.editMerchantPassword(filter, password);

        return ResponseEntity.ok().body("{}");
    }
}