package vttp.iss.backend.repositories;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import vttp.iss.backend.Utils;
import vttp.iss.backend.models.Merchant;
import vttp.iss.backend.models.User;

@Repository
public class SignupRepository {
    
    @Autowired
    private JdbcTemplate template;

    public void userSignup(User user) {
        
        template.update(Utils.SQL_INSERT_USER, 
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getPhoneNumber(),
            user.getAddress(),
            user.getUsername(),
            user.getPassword());
        
    }

    public void merchantSignup(Merchant merchant) {
        
        template.update(Utils.SQL_INSERT_MERCHANT,
            merchant.getFirstName(),
            merchant.getLastName(),
            merchant.getEmail(),
            merchant.getPhoneNumber(),
            merchant.getCompanyName(),
            merchant.getUsername(),
            merchant.getPassword(),
            merchant.getElec(),
            merchant.getElecLicenseNo(),
            merchant.getPlum(),
            merchant.getPlumLicenseNo(),
            merchant.getAircon(),
            merchant.getAirconLicenseNo());
    }

    public List<String> getUsersUsername() {

        SqlRowSet rs = template.queryForRowSet(Utils.SQL_GET_USER_USERNAME);
        List<String> usernameList = new ArrayList<>();
        while (rs.next()) {
            String username = rs.getString("username");
            usernameList.add(username);
        }

        return usernameList;
    }
}
