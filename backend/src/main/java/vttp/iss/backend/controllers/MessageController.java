package vttp.iss.backend.controllers;

import java.io.StringReader;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import jakarta.json.JsonReader;
import vttp.iss.backend.models.ChatRecord;
import vttp.iss.backend.models.JobRequest;
import vttp.iss.backend.models.Message;
import vttp.iss.backend.services.MainService;

@Controller
@CrossOrigin()
@RequestMapping(path = "/api")
public class MessageController {

    @Autowired
    private MainService mainSvc;

    @Autowired
    private SimpMessagingTemplate template;
    
    @GetMapping(path = "/chat/{filter}")
    @ResponseBody
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
                    .add("timestamp", message.getTimestamp().toString().substring(4, 16))
                    .add("role", message.getRole());
                arrBuilder.add(objBuilder);
            }
    
            JsonArray arr = arrBuilder.build();
    
            return ResponseEntity.ok().body(arr.toString());
        }
        
        return ResponseEntity.ok().body("");
    }

    @PostMapping(path = "/chat/post/{filter}")
    @ResponseBody
    public ResponseEntity<String> postMessage(@PathVariable String filter, @RequestBody String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject obj = reader.readObject();

        String username = obj.getString("username");
        String message = obj.getString("message");
        Date timestamp = new Date();
        String role = obj.getString("role");
        
        Message newMessage = new Message(username, message, timestamp, role);

        mainSvc.postMessage(filter, newMessage);

        return ResponseEntity.ok().body("{}");
    }

    @MessageMapping("/send/{usernames}")
    public void sendMessageUser(@DestinationVariable String usernames, String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject obj = reader.readObject();

        String username = obj.getString("username");
        String message = obj.getString("message");
        Date timestamp = new Date();
        String role = obj.getString("role");
        
        Message newMessage = new Message(username, message, timestamp, role);

        template.convertAndSend("/message/" + usernames, newMessage);
    }

    @MessageMapping("/request/{merchant}")
    public void sendRequest(@DestinationVariable String merchant, String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject obj = reader.readObject();

        String user = obj.getString("user");
        String timestamp = obj.getString("timestamp");

        JobRequest jobRequest = new JobRequest(user, timestamp);

        template.convertAndSend("/message/" + merchant, jobRequest);
    }

    @PostMapping(path = "/postchat")
    @ResponseBody
    public ResponseEntity<String> postChatRecord(@RequestBody String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject obj = reader.readObject();

        String user = obj.getString("user");
        String merchant = obj.getString("merchant");

        ChatRecord chatRecord = new ChatRecord(user, merchant);

        mainSvc.postChatRecord(chatRecord);

        return ResponseEntity.ok().body("{}");
    }

    @GetMapping(path = "/getconversationsmerchant/{filter}")
    @ResponseBody
    public ResponseEntity<String> getConversationsMerchant(@PathVariable String filter) {

        List<ChatRecord> chatList = mainSvc.getConversationsMerchant(filter);

        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();

        for (ChatRecord chat : chatList) {
            JsonObjectBuilder objBuilder = Json.createObjectBuilder();
            objBuilder = objBuilder
                .add("chatId", chat.getChatId())
                .add("user", chat.getUser())
                .add("merchant", chat.getMerchant())
                .add("lastMessage", chat.getLastMessage())
                .add("timestamp", chat.getTimestamp().toString());
            arrBuilder.add(objBuilder);
        }

        JsonArray arr = arrBuilder.build();

        return ResponseEntity.ok().body(arr.toString());
    }

    @GetMapping(path = "/getconversationsuser/{filter}")
    @ResponseBody
    public ResponseEntity<String> getConversationsUser(@PathVariable String filter) {

        List<ChatRecord> chatList = mainSvc.getConversationsUser(filter);

        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();

        for (ChatRecord chat : chatList) {
            JsonObjectBuilder objBuilder = Json.createObjectBuilder();
            objBuilder = objBuilder
                .add("chatId", chat.getChatId())
                .add("user", chat.getUser())
                .add("merchant", chat.getMerchant())
                .add("lastMessage", chat.getLastMessage())
                .add("timestamp", chat.getTimestamp().toString());
            arrBuilder.add(objBuilder);
        }

        JsonArray arr = arrBuilder.build();

        return ResponseEntity.ok().body(arr.toString());
    }

    @PatchMapping(path = "/editlastmessage")
    @ResponseBody
    public ResponseEntity<String> editLastMsg(@RequestBody String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject obj = reader.readObject();

        String user = obj.getString("user");
        String merchant = obj.getString("merchant");
        String lastMessage = obj.getString("lastMessage");
        Date timestamp = new Date();

        mainSvc.editLastMsg(user, merchant, lastMessage, timestamp);

        return ResponseEntity.ok().body("{}");
    }
}
