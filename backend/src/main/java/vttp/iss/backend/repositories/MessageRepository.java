package vttp.iss.backend.repositories;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Filter;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;

import vttp.iss.backend.Utils;
import vttp.iss.backend.models.ChatRecord;
import vttp.iss.backend.models.Message;

@Repository
public class MessageRepository {

    @Autowired
    private JdbcTemplate template;
    
    // Firebase
    public List<Message> getChat(String collectionId, String user, String merchant) throws InterruptedException, ExecutionException {
        Firestore db = FirestoreClient.getFirestore();

        CollectionReference collectionRef = db.collection(collectionId);
        Query query = collectionRef.where(Filter.or(Filter.equalTo("username", user), Filter.equalTo("username", merchant)));
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot documents = future.get();
        if (documents.size() != 0) {
            List<Message> list = documents.toObjects(Message.class);
            Collections.sort(list, new Comparator<Message>() {
                public int compare(Message m1, Message m2) {
                    return m1.getTimestamp().compareTo(m2.getTimestamp());
                }
            });
            return list;
        } else 
            return null;

    }

    public void postMessage(String collectionId, Message message) {
        Firestore db = FirestoreClient.getFirestore();

        CollectionReference collectionRef = db.collection(collectionId);
        collectionRef.add(message);
    }

    // MySQL
    public void postChatRecord(ChatRecord chatRecord) {

        String user = chatRecord.getUser();
        String merchant = chatRecord.getMerchant();

        template.update(Utils.SQL_POST_CHAT_RECORD, user, merchant);
    }

    public List<ChatRecord> getConversationsMerchant(String merchantUser) {

        SqlRowSet rs = template.queryForRowSet(Utils.SQL_GET_CONVERSATIONS_MERCHANT, merchantUser);

        List<ChatRecord> chatList = new ArrayList<>();

        while (rs.next()) {
            int chatId = rs.getInt("chat_id");
            String user = rs.getString("user");
            String merchant = rs.getString("merchant");
            ChatRecord chatRecord = new ChatRecord(chatId, user, merchant);
            chatList.add(chatRecord);
        }

        return chatList;
    }

    public List<ChatRecord> getConversationsUser(String userUser) {

        SqlRowSet rs = template.queryForRowSet(Utils.SQL_GET_CONVERSATIONS_USER, userUser);

        List<ChatRecord> chatList = new ArrayList<>();

        while (rs.next()) {
            int chatId = rs.getInt("chat_id");
            String user = rs.getString("user");
            String merchant = rs.getString("merchant");
            ChatRecord chatRecord = new ChatRecord(chatId, user, merchant);
            chatList.add(chatRecord);
        }

        return chatList;
    }
}
