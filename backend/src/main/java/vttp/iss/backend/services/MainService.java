package vttp.iss.backend.services;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vttp.iss.backend.models.ChatRecord;
import vttp.iss.backend.models.JobRequest;
import vttp.iss.backend.models.LoginDetails;
import vttp.iss.backend.models.Merchant;
import vttp.iss.backend.models.Message;
import vttp.iss.backend.models.PostReview;
import vttp.iss.backend.models.Review;
import vttp.iss.backend.models.User;
import vttp.iss.backend.repositories.JobRepository;
import vttp.iss.backend.repositories.MerchantRepository;
import vttp.iss.backend.repositories.MessageRepository;
import vttp.iss.backend.repositories.ReviewRepository;
import vttp.iss.backend.repositories.UserRepository;

@Service
public class MainService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private MerchantRepository merchantRepo;

    @Autowired
    private MessageRepository messageRepo;

    @Autowired
    private JobRepository jobRepo;

    @Autowired
    private ReviewRepository reviewRepo;

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

    public List<Merchant> findMerchantByNameE(String name) {
        return merchantRepo.findMerchantByNameE(name);
    }

    public List<Merchant> findMerchantByNameA(String name) {
        return merchantRepo.findMerchantByNameA(name);
    }

    public List<Merchant> findMerchantByNameP(String name) {
        return merchantRepo.findMerchantByNameP(name);
    }

    public List<Merchant> findMerchantByRatingE(int rating) {
        return merchantRepo.findMerchantByRatingE(rating);
    }

    public List<Merchant> findMerchantByRatingA(int rating) {
        return merchantRepo.findMerchantByRatingA(rating);
    }

    public List<Merchant> findMerchantByRatingP(int rating) {
        return merchantRepo.findMerchantByRatingP(rating);
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

    public void editLastMsg(String user, String merchant, String lastMessage, String timestamp) {

        messageRepo.editLastMsg(user, merchant, lastMessage, timestamp);
    }

    // Jobs
    public void postNewJobRequest(JobRequest jobRequest) {
        jobRepo.postNewJobRequest(jobRequest);
    }

    public List<JobRequest> getAllRequests(String merchant) {
        return jobRepo.getAllRequest(merchant);
    }

    public void editJobRequestStatus(String usernames, String timestamp, int status) {
        jobRepo.editJobRequestStatus(usernames, timestamp, status);
    }

    public List<JobRequest> getAcceptedJobs(String merchant) {
        return jobRepo.getAllAcceptedJobs(merchant);
    }

    public List<JobRequest> getUserServices(String user) {
        return jobRepo.getUserServices(user);
    }

    public JobRequest getOngoingJob(String filter) {
        return jobRepo.getOngoingJob(filter);
    }

    public void completeRequest(String usernames, int status, String completedTimestamp, String jobId) {
        jobRepo.completeRequest(usernames, status, completedTimestamp, jobId);
    }

    public List<JobRequest> getUserJobHistory(String user) {
        return jobRepo.getUserJobHistory(user);
    }

    public List<JobRequest> getUserCancelJobHistory(String user) {
        return jobRepo.getUserCancelJobHistory(user);
    }

    public List<JobRequest> getMerchantJobHistory(String merchant) {
        return jobRepo.getMerchantJobHistory(merchant);
    }

    public List<JobRequest> getMerchantCancelJobHistory(String merchant) {
        return jobRepo.getMerchantCancelJobHistory(merchant);
    }

    public void cancelJobRequest(String jobId, String timestamp, int status) {
        jobRepo.cancelJobRequest(jobId, timestamp, status);
    }

    // Review
    public void postReview(Review review, String merchant) {
        reviewRepo.postReview(review, merchant);
    }

    public List<PostReview> getReviewsByMerchant(String merchant) {
        return reviewRepo.getReviewByMerchant(merchant);
    }
}
