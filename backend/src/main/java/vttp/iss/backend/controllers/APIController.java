package vttp.iss.backend.controllers;

import java.io.StringReader;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import jakarta.json.JsonValue;

@RestController
@CrossOrigin()
@RequestMapping(path = "/api")
public class APIController {

    @Value("${api.key}")
    private String apiKey;
    
    @GetMapping(path = "/getdadjoke")
    public ResponseEntity<String> getDadJoke() {

        String url = UriComponentsBuilder
                .fromUriString("https://api.api-ninjas.com/v1/dadjokes")
                .queryParam("limit", 1)
                .toUriString();

        RequestEntity<Void> req = RequestEntity.get(url).header("X-Api-Key", apiKey).build();

        RestTemplate template = new RestTemplate();
        ResponseEntity<String> res;

        res = template.exchange(req, String.class);

        JsonReader reader = Json.createReader(new StringReader(res.getBody()));
        JsonArray arr = reader.readArray();
        JsonObject obj = null;
        for (JsonValue value : arr) {
            obj = value.asJsonObject();
        }
            
        return ResponseEntity.ok().body(obj.toString());
    }
}
