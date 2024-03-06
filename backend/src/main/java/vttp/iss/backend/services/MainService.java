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
}
