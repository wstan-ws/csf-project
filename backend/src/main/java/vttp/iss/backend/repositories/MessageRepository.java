package vttp.iss.backend.repositories;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Filter;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;

import vttp.iss.backend.models.Message;

@Repository
public class MessageRepository {
    
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
}
