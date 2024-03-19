package vttp.iss.backend.controllers;

import java.io.StringReader;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

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
import vttp.iss.backend.models.Message;
import vttp.iss.backend.services.MainService;

@RestController
@CrossOrigin()
@RequestMapping(path = "/api")
public class MessageController {

    @Autowired
    private MainService mainSvc;
    
    @GetMapping(path = "/chat/{filter}")
    public ResponseEntity<String> getChat(@PathVariable String filter) throws InterruptedException, ExecutionException {

        String user = filter.split("-")[0];
        String merchant = filter.split("-")[1];

        List<Message> chat = mainSvc.getChat(filter, user, merchant);

        if (chat != null) {
            JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
            for (Message message : chat) {
                JsonObjectBuilder objBuilder = Json.createObjectBuilder();
                objBuilder
                    .add("username", message.getUsername())
                    .add("message", message.getMessage())
                    .add("timestamp", message.getTimestamp().toString());
                arrBuilder.add(objBuilder);
            }
    
            JsonArray arr = arrBuilder.build();
    
            return ResponseEntity.ok().body(arr.toString());
        }
        
        return ResponseEntity.ok().body("");
    }

    @PostMapping(path = "/chat/post/{filter}")
    public ResponseEntity<String> postMessage(@PathVariable String filter, @RequestBody String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject obj = reader.readObject();

        String username = obj.getString("username");
        String message = obj.getString("message");
        Date timestamp = new Date();
        
        Message newMessage = new Message(username, message, timestamp);

        mainSvc.postMessage(filter, newMessage);

        return ResponseEntity.ok().body("{}");
    }
}
