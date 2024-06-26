package vttp.iss.backend.controllers;

import java.io.StringReader;
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
                    .add("timestamp", message.getTimestamp())
                    .add("role", message.getRole())
                    .add("receiver", message.getReceiver());
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
        String timestamp = obj.getString("timestamp");
        String role = obj.getString("role");
        String receiver = obj.getString("receiver");
        
        Message newMessage = new Message(username, message, timestamp, role, receiver);

        mainSvc.postMessage(filter, newMessage);

        return ResponseEntity.ok().body("{}");
    }

    @MessageMapping("/send/{usernames}")
    public void sendMessage(@DestinationVariable String usernames, String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject obj = reader.readObject();

        String username = obj.getString("username");
        String message = obj.getString("message");
        String timestamp = obj.getString("timestamp");
        String role = obj.getString("role");
        String receiver = obj.getString("receiver");
        
        Message newMessage = new Message(username, message, timestamp, role, receiver);

        template.convertAndSend("/message/" + usernames, newMessage);
    }

    @MessageMapping("/send")
    public void sendGlobalMessage(String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject obj = reader.readObject();

        String username = obj.getString("username");
        String message = obj.getString("message");
        String timestamp = obj.getString("timestamp");
        String role = obj.getString("role");
        String receiver = obj.getString("receiver");
        
        Message newMessage = new Message(username, message, timestamp, role, receiver);

        template.convertAndSend("/message", newMessage);
    }

    @MessageMapping("/request/{merchant}")
    public void sendRequest(@DestinationVariable String merchant, String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject obj = reader.readObject();

        String jobId = obj.getString("jobId");
        String user = obj.getString("user");
        String timestamp = obj.getString("timestamp");
        String type = obj.getString("type");
        JobRequest jobRequest = null;
        if (type.equals("Scheduled")) {
            String scheduledDate = obj.getString("scheduledDate");
            String scheduledTime = obj.getString("scheduledTime");
            jobRequest = new JobRequest(jobId, timestamp, user, type, scheduledDate, scheduledTime);
        } else {
            jobRequest = new JobRequest(jobId, timestamp, user, type);
        }

        template.convertAndSend("/message/" + merchant, jobRequest);
    }

    @MessageMapping("/request/accepted/{user}")
    public void sendAcceptedRequest(@DestinationVariable String user, String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject obj = reader.readObject();

        String jobId = obj.getString("jobId");
        String merchant = obj.getString("merchant");
        String timestamp = obj.getString("timestamp");
        int status = obj.getInt("status");
        String type = obj.getString("type");
        JobRequest jobRequest = null;
        if (type.equals("Scheduled")) {
            String scheduledDate = obj.getString("scheduledDate");
            String scheduledTime = obj.getString("scheduledTime");
            jobRequest = new JobRequest(jobId, timestamp, merchant, status, type, scheduledDate, scheduledTime);
        } else {
            jobRequest = new JobRequest(jobId, timestamp, merchant, status, type);
        }

        template.convertAndSend("/message/accepted/" + user, jobRequest);
    }

    @MessageMapping("/cancel")
    public void cancelRequest(String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject obj = reader.readObject();

        String jobId = obj.getString("jobId");

        template.convertAndSend("/message/cancel", jobId);
    }

    @PostMapping(path = "/postchat")
    @ResponseBody
    public ResponseEntity<String> postChatRecord(@RequestBody String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject obj = reader.readObject();

        String user = obj.getString("user");
        String merchant = obj.getString("merchant");
        String timestamp = obj.getString("timestamp");

        ChatRecord chatRecord = new ChatRecord(user, merchant, timestamp);

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
                .add("timestamp", chat.getTimestamp());
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
                .add("timestamp", chat.getTimestamp());
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
        String timestamp = obj.getString("timestamp");

        mainSvc.editLastMsg(user, merchant, lastMessage, timestamp);

        return ResponseEntity.ok().body("{}");
    }
}
