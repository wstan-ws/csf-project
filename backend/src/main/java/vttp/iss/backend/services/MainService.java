package vttp.iss.backend.services;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vttp.iss.backend.models.ChatRecord;
import vttp.iss.backend.models.LoginDetails;
import vttp.iss.backend.models.Merchant;
import vttp.iss.backend.models.Message;
import vttp.iss.backend.models.User;
import vttp.iss.backend.repositories.MerchantRepository;
import vttp.iss.backend.repositories.MessageRepository;
import vttp.iss.backend.repositories.UserRepository;

@Service
public class MainService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private MerchantRepository merchantRepo;

    @Autowired
    private MessageRepository messageRepo;

    // User
    public void userSignup(User user) {
        userRepo.userSignup(user);
    }

    public List<LoginDetails> getUsersLoginDetails() {
        return userRepo.getUsersLoginDetails();
    }

    public User getUserDetails(String filter) {
        return userRepo.getUserDetails(filter);
    }

    public void editUserDetails(String filter, String payload) {
        userRepo.editUserDetails(filter, payload);
    }

    public void editUserPassword(String filter, String password) {
        userRepo.editUserPassword(filter, password);
    }

    // Merchant
    public void merchantSignup(Merchant merchant) {
        merchantRepo.merchantSignup(merchant);
    }

    public List<LoginDetails> getMerchantsLoginDetails() {
        return merchantRepo.getMerchantsLoginDetails();
    }

    public Merchant getMerchantDetails(String filter) {
        return merchantRepo.getMerchantDetails(filter);
    }

    public void editMerchantDetails(String filter, String payload) {
        merchantRepo.editMerchantDetails(filter, payload);
    }

    public void editMerchantPassword(String filter, String password) {
        merchantRepo.editMerchantPassword(filter, password);
    }

    public List<Merchant> getElectricians() {
        return merchantRepo.getElectricians();
    }

    public List<Merchant> getPlumbers() {
        return merchantRepo.getPlumbers();
    }

    public List<Merchant> getAircons() {
        return merchantRepo.getAircons();
    }

    public void setActive(String filter, Boolean active) {
        merchantRepo.setActive(filter, active);
    }

    // Messages
    public List<Message> getChat(String usernames, String user, String merchant) throws InterruptedException, ExecutionException {
        return messageRepo.getChat(usernames, user, merchant);
    }

    public void postMessage(String usernames, Message message) {
        messageRepo.postMessage(usernames, message);
    }

    public void postChatRecord(ChatRecord chatRecord) {
        messageRepo.postChatRecord(chatRecord);
    }

    public List<ChatRecord> getConversationsMerchant(String merchant) {
        return messageRepo.getConversationsMerchant(merchant);
    }

    public List<ChatRecord> getConversationsUser(String user) {
        return messageRepo.getConversationsUser(user);
    }
}
