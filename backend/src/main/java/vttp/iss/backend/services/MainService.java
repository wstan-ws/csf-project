package vttp.iss.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vttp.iss.backend.models.LoginDetails;
import vttp.iss.backend.models.Merchant;
import vttp.iss.backend.models.User;
import vttp.iss.backend.repositories.SignupRepository;

@Service
public class MainService {

    @Autowired
    private SignupRepository signupRepo;

    public void userSignup(User user) {
        signupRepo.userSignup(user);
    }

    public void merchantSignup(Merchant merchant) {
        signupRepo.merchantSignup(merchant);
    }
    
    public List<LoginDetails> getUsersLoginDetails() {
        return signupRepo.getUsersLoginDetails();
    }

    public List<LoginDetails> getMerchantsLoginDetails() {
        return signupRepo.getMerchantsLoginDetails();
    }

    public User getUserDetails(String filter) {
        return signupRepo.getUserDetails(filter);
    }

    public void editUserDetails(String filter, String payload) {
        signupRepo.editUserDetails(filter, payload);
    }

    public void editUserPassword(String filter, String password) {
        signupRepo.editUserPassword(filter, password);
    }

    public Merchant getMerchantDetails(String filter) {
        return signupRepo.getMerchantDetails(filter);
    }

    public void editMerchantPassword(String filter, String password) {
        signupRepo.editMerchantPassword(filter, password);
    }
}
